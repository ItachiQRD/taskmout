import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { getCatalogForCheckout } from '@/lib/catalog';
import { computeOrderFromCartItems } from '@/lib/order-settlement';
import { upsertOrder } from '@/lib/order-store';
import { sumupCreateHostedCheckout } from '@/lib/sumup';
import { sendCustomerPaymentLinkEmail, isMailConfigured } from '@/lib/mail';
import { getSiteBaseUrl } from '@/lib/site-url';
import type { Order } from '@/types/store';

export const runtime = 'nodejs';

type Body = {
  items?: { productId: string; quantity: number }[];
  customer?: { name: string; email: string; address: string };
  note?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const items = body.items;
  const customer = body.customer;
  if (!items || !customer?.email?.trim() || !customer.name?.trim() || !customer.address?.trim()) {
    return NextResponse.json({ error: 'Données client ou panier manquantes.' }, { status: 400 });
  }

  const merchantCode = process.env.SUMUP_MERCHANT_CODE?.trim();
  if (!merchantCode) {
    return NextResponse.json(
      { error: 'Configuration SumUp incomplète (SUMUP_MERCHANT_CODE).' },
      { status: 503 }
    );
  }

  const catalog = await getCatalogForCheckout();
  const built = computeOrderFromCartItems(items, catalog);
  if ('error' in built) {
    return NextResponse.json({ error: built.error }, { status: 400 });
  }

  const orderId = randomUUID();
  const now = new Date().toISOString();
  const pending: Order = {
    id: orderId,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
    email: customer.email.trim(),
    name: customer.name.trim(),
    address: customer.address.trim(),
    items: built.items,
    total: built.total,
    note: body.note?.trim() || undefined,
    paymentMethod: 'sumup',
  };

  await upsertOrder(pending);

  const base = getSiteBaseUrl();
  const amount = Number.parseFloat(built.total.replace(',', '.'));
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Montant invalide.' }, { status: 400 });
  }

  try {
    const checkout = await sumupCreateHostedCheckout({
      amount,
      checkout_reference: orderId,
      currency: 'EUR',
      description: `Taskmout — commande ${orderId.slice(0, 8)}`,
      merchant_code: merchantCode,
      redirect_url: `${base}/commande/merci?ref=${encodeURIComponent(orderId)}`,
      return_url: `${base}/api/webhooks/sumup`,
      hosted_checkout: { enabled: true },
    });

    const hostedUrl = checkout.hosted_checkout_url;
    const checkoutPk = checkout.id;
    if (!hostedUrl || !checkoutPk) {
      return NextResponse.json(
        { error: 'Réponse SumUp inattendue (URL de paiement manquante).' },
        { status: 502 }
      );
    }

    const withCheckout: Order = {
      ...pending,
      sumupCheckoutId: checkoutPk,
      updatedAt: new Date().toISOString(),
    };

    let emailPaymentLinkSentAt: string | undefined;
    if (isMailConfigured()) {
      try {
        await sendCustomerPaymentLinkEmail(withCheckout, hostedUrl);
        emailPaymentLinkSentAt = new Date().toISOString();
      } catch (e) {
        console.error('sendCustomerPaymentLinkEmail', e);
      }
    }

    await upsertOrder({
      ...withCheckout,
      ...(emailPaymentLinkSentAt ? { emailPaymentLinkSentAt } : {}),
    });

    return NextResponse.json({
      orderId,
      checkoutId: checkoutPk,
      hostedCheckoutUrl: hostedUrl,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur SumUp';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
