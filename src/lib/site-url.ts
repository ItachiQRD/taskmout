export function getSiteBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (u) return u.replace(/\/+$/, '');
  return 'http://localhost:3000';
}
