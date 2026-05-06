export function formatDistanceToNow(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const s = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  if (s < 2592000) return `il y a ${Math.floor(s / 86400)} j`;
  return date.toLocaleDateString('fr-FR');
}
