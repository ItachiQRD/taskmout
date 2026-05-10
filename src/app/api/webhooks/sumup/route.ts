import { NextResponse } from 'next/server';
import { settleOrderIfPaidByCheckoutId } from '@/lib/order-settlement';
import type { SumupWebhookPayload } from '@/types/sumup';

export const runtime = 'nodejs';

/**
 * SumUp envoie un POST lors d’un changement de statut checkout (return_url).
 * On vérifie toujours le statut via l’API SumUp dans le processeur de règlement.
 */
export async function POST(req: Request) {
  let payload: SumupWebhookPayload;
  try {
    payload = (await req.json()) as SumupWebhookPayload;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  if (payload.event_type === 'CHECKOUT_STATUS_CHANGED' && payload.id) {
    try {
      await settleOrderIfPaidByCheckoutId(payload.id);
    } catch (e) {
      console.error('sumup webhook settlement', e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  return new NextResponse(null, { status: 204 });
}
