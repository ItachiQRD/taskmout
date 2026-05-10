import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-api';
import { sendCustomerShippedEmail, isMailConfigured } from '@/lib/mail';
import { getOrderById, updateOrderPartial } from '@/lib/order-store';
import type { Order } from '@/types/store';

export const runtime = 'nodejs';

type Body = { status?: Order['status'] };

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const orderId = decodeURIComponent(params.id);
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  if (!body.status) {
    return NextResponse.json({ error: 'status requis.' }, { status: 400 });
  }

  const valid: Order['status'][] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
  if (!valid.includes(body.status)) {
    return NextResponse.json({ error: 'statut invalide.' }, { status: 400 });
  }

  const before = await getOrderById(orderId);
  let updated = await updateOrderPartial(orderId, { status: body.status });
  if (!updated) {
    return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 });
  }

  if (
    before &&
    body.status === 'shipped' &&
    before.status !== 'shipped' &&
    isMailConfigured() &&
    !before.emailShippedNoticeSentAt
  ) {
    try {
      await sendCustomerShippedEmail(updated);
      const again = await updateOrderPartial(orderId, {
        emailShippedNoticeSentAt: new Date().toISOString(),
      });
      if (again) updated = again;
    } catch (e) {
      console.error('sendCustomerShippedEmail', e);
    }
  }

  return NextResponse.json({ order: updated });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  const order = await getOrderById(decodeURIComponent(params.id));
  if (!order) return NextResponse.json({ error: 'Introuvable.' }, { status: 404 });
  return NextResponse.json({ order });
}
