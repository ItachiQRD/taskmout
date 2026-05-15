export const ADMIN_SESSION_KEY = 'taskmout_admin';

const COOKIE_NAME = 'taskmout_admin_token';
const COOKIE_MAX_AGE_DAYS = 30;

export function getAdminPassword(): string {
  if (typeof window === 'undefined') return '';
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'taskmout';
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

/** Sauvegarde le token admin dans un cookie persistant (30 jours) + sessionStorage pour compatibilité. */
export function saveAdminSession(token: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ADMIN_SESSION_KEY, token);
  setCookie(COOKIE_NAME, token, COOKIE_MAX_AGE_DAYS);
}

/** Lit le token admin depuis le cookie ou sessionStorage. */
export function readAdminSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  const fromCookie = getCookie(COOKIE_NAME);
  if (fromCookie) return fromCookie;
  return sessionStorage.getItem(ADMIN_SESSION_KEY);
}

/** Vérifie si une session admin valide existe. */
export function isAdminSessionValid(): boolean {
  const token = readAdminSessionToken();
  return !!token && token === getAdminPassword();
}

/** Supprime la session admin (cookie + sessionStorage). */
export function clearAdminSession() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  deleteCookie(COOKIE_NAME);
}
