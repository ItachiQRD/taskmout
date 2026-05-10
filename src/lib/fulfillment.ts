import type { Order, OrderItem } from '@/types/store';
import { formatPriceFrEUR, parsePriceFr } from '@/lib/price';

function refSuffix(orderId: string): string {
  const clean = orderId.replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase();
  return clean || orderId.slice(0, 8).toUpperCase();
}

export function generatePurchaseOrderNumber(order: Order): string {
  const y = new Date(order.createdAt).getFullYear();
  return `BC-${y}-${refSuffix(order.id)}`;
}

export function generateDeliveryNoteNumber(order: Order): string {
  const y = new Date(order.createdAt).getFullYear();
  return `BL-${y}-${refSuffix(order.id)}`;
}

export type FulfillmentPayload = {
  event: 'order.fulfillment_ready';
  occurredAt: string;
  order: {
    id: string;
    createdAt: string;
    status: Order['status'];
    customer: { name: string; email: string; address: string };
    items: OrderItem[];
    totalEUR: string;
    note?: string;
    paymentMethod: string;
    sumupCheckoutId?: string;
  };
  purchaseOrder: {
    number: string;
    title: string;
    lines: { label: string; quantity: number; unitPriceEUR: string; lineTotalEUR: string }[];
    totalEUR: string;
  };
  deliveryNote: {
    number: string;
    title: string;
    shipTo: { name: string; address: string; email: string };
    lines: { label: string; quantity: number }[];
  };
};

export function buildFulfillmentPayload(order: Order, po: string, bl: string): FulfillmentPayload {
  const lines = order.items.map((i) => {
    const unit = parsePriceFr(i.price);
    const lineTotal = unit * i.quantity;
    return {
      label: i.productName,
      quantity: i.quantity,
      unitPriceEUR: formatPriceFrEUR(unit),
      lineTotalEUR: formatPriceFrEUR(lineTotal),
    };
  });

  const totalNum = lines.reduce((s, l) => s + parsePriceFr(l.lineTotalEUR), 0);

  return {
    event: 'order.fulfillment_ready',
    occurredAt: new Date().toISOString(),
    order: {
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
      customer: { name: order.name, email: order.email, address: order.address },
      items: order.items,
      totalEUR: order.total,
      note: order.note,
      paymentMethod: order.paymentMethod ?? 'sumup',
      sumupCheckoutId: order.sumupCheckoutId,
    },
    purchaseOrder: {
      number: po,
      title: `Bon de commande ${po}`,
      lines,
      totalEUR: formatPriceFrEUR(totalNum),
    },
    deliveryNote: {
      number: bl,
      title: `Bon de livraison ${bl}`,
      shipTo: { name: order.name, address: order.address, email: order.email },
      lines: order.items.map((i) => ({ label: i.productName, quantity: i.quantity })),
    },
  };
}

async function postWebhook(url: string, secret: string | undefined, body: unknown): Promise<number> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (secret) headers['X-Webhook-Secret'] = secret;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  return res.status;
}

/**
 * Envoie le payload (BC + BL) vers l’URL configurée. Vous pouvez brancher n8n,
 * Zapier, ou un ERP qui relaie vers les organismes comptables / logistiques.
 */
export async function dispatchFulfillmentWebhooks(order: Order, payload: FulfillmentPayload): Promise<void> {
  const url = process.env.ORDER_WEBHOOK_URL?.trim();
  const secret = process.env.ORDER_WEBHOOK_SECRET?.trim();
  const extra = process.env.ORDER_WEBHOOK_URL_SECONDARY?.trim();

  const tasks: Promise<void>[] = [];
  if (url) {
    tasks.push(
      postWebhook(url, secret, payload).then((status) => {
        if (status < 200 || status >= 300) {
          console.warn(`ORDER_WEBHOOK_URL réponse HTTP ${status}`);
        }
      })
    );
  }
  if (extra) {
    tasks.push(
      postWebhook(extra, secret, payload).catch(() => undefined).then(() => undefined)
    );
  }

  await Promise.all(tasks);
}
