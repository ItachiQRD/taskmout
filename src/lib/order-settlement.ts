import {
  buildFulfillmentPayload,
  dispatchFulfillmentWebhooks,
  generateDeliveryNoteNumber,
  generatePurchaseOrderNumber,
} from '@/lib/fulfillment';
import { sendCustomerPaidConfirmationEmail, isMailConfigured } from '@/lib/mail';
import { getOrderById, upsertOrder } from '@/lib/order-store';
import { sumupGetCheckout } from '@/lib/sumup';
import { parsePriceFr } from '@/lib/price';
import type { Order, OrderItem, Product } from '@/types/store';

export async function settleOrderIfPaidByCheckoutId(sumupCheckoutId: string): Promise<{
  order: Order | null;
  skipped: boolean;
}> {
  const remote = await sumupGetCheckout(sumupCheckoutId);
  const status = String(remote.status ?? '').toUpperCase();
  if (status !== 'PAID') {
    return { order: null, skipped: false };
  }

  const orderId = remote.checkout_reference?.trim();
  if (!orderId) return { order: null, skipped: false };

  const existing = await getOrderById(orderId);
  if (!existing) return { order: null, skipped: false };

  const emailOk = !isMailConfigured() || Boolean(existing.emailPaidConfirmationSentAt);
  const fullyDone =
    existing.status === 'paid' && Boolean(existing.fulfillmentDispatchedAt) && emailOk;

  if (fullyDone) {
    return { order: existing, skipped: true };
  }

  const purchaseOrderNumber =
    existing.purchaseOrderNumber ?? generatePurchaseOrderNumber(existing);
  const deliveryNoteNumber =
    existing.deliveryNoteNumber ?? generateDeliveryNoteNumber(existing);

  let next: Order = {
    ...existing,
    status: 'paid',
    paymentMethod: 'sumup',
    sumupCheckoutId,
    purchaseOrderNumber,
    deliveryNoteNumber,
    updatedAt: new Date().toISOString(),
  };

  if (!existing.fulfillmentDispatchedAt) {
    const payload = buildFulfillmentPayload(next, purchaseOrderNumber, deliveryNoteNumber);
    try {
      await dispatchFulfillmentWebhooks(next, payload);
    } catch (e) {
      console.error('dispatchFulfillmentWebhooks', e);
    }
    next = {
      ...next,
      fulfillmentDispatchedAt: new Date().toISOString(),
    };
  }

  if (isMailConfigured() && !next.emailPaidConfirmationSentAt) {
    try {
      await sendCustomerPaidConfirmationEmail(next);
      next = {
        ...next,
        emailPaidConfirmationSentAt: new Date().toISOString(),
      };
    } catch (e) {
      console.error('sendCustomerPaidConfirmationEmail', e);
    }
  }

  await upsertOrder(next);

  return { order: next, skipped: false };
}

export function computeOrderFromCartItems(
  items: { productId: string; quantity: number }[],
  catalog: Product[]
): { items: OrderItem[]; total: string } | { error: string } {
  const orderItems: OrderItem[] = [];
  let totalAmount = 0;

  for (const line of items) {
    if (line.quantity < 1) return { error: 'Quantité invalide.' };
    const p = catalog.find((x) => x.id === line.productId);
    if (!p || !p.active) return { error: `Produit indisponible : ${line.productId}` };
    if (p.stock < line.quantity) return { error: `Stock insuffisant pour « ${p.name} ».` };
    const unit = parsePriceFr(p.price);
    totalAmount += unit * line.quantity;
    orderItems.push({
      productId: p.id,
      productName: p.name,
      price: p.price,
      quantity: line.quantity,
    });
  }

  if (!orderItems.length) return { error: 'Panier vide.' };

  return {
    items: orderItems,
    total: totalAmount.toFixed(2).replace('.', ','),
  };
}
