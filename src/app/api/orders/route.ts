import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-api';
import { listOrdersDescending } from '@/lib/order-store';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const orders = await listOrdersDescending();
  return NextResponse.json({ orders });
}
