/** Clé session admin (inchangée pour compatibilité avec les pages admin existantes). */
export const ADMIN_SESSION_KEY = 'taskmout_admin';

export function getAdminPassword(): string {
  if (typeof window === 'undefined') return '';
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'taskmout';
}

export function readAdminSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(ADMIN_SESSION_KEY);
}
