import type { NextRequest } from 'next/server';

/** Aligné sur la session admin (mot de passe côté client). Prévoir un secret dédié côté serveur en prod. */
export function isAdminAuthorized(request: NextRequest): boolean {
  const token = request.headers.get('x-admin-token')?.trim();
  const expected =
    process.env.ADMIN_SERVER_TOKEN?.trim() ||
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() ||
    'taskmout';
  return !!token && token === expected;
}
