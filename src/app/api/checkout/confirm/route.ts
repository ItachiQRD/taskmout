import { NextResponse } from 'next/server';
import { getOrderById } from '@/lib/order-store';
import { settleOrderIfPaidByCheckoutId } from '@/lib/order-settlement';

export const runtime = 'nodejs';

type Body = { orderId?: string };

/** Appelé depuis la page de retour pour confirmer le paiement après SumUp Hosted Checkout. */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const orderId = body.orderId?.trim();
  if (!orderId) {
    return NextResponse.json({ error: 'orderId requis.' }, { status: 400 });
  }

  const order = await getOrderById(orderId);
  if (!order?.sumupCheckoutId) {
    return NextResponse.json({ error: 'Commande ou session de paiement introuvable.', order: null }, { status: 404 });
  }

  try {
    const result = await settleOrderIfPaidByCheckoutId(order.sumupCheckoutId);
    return NextResponse.json({
      /** Commande mise à jour si paiement SumUp PAID ; sinon la commande enregistrée telle quelle. */
      order: result.order ?? order,
      paid: result.order?.status === 'paid',
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur de confirmation.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
