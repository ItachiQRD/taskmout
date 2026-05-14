import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-api';

export const runtime = 'nodejs';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non supportée. Utilisez POST avec un fichier.' },
    { status: 405 },
  );
}

/**
 * Tente d'écrire sur le disque (fonctionne sur OVH / VPS / local).
 * Renvoie l'URL publique si ça marche, null sinon (Vercel / serverless).
 */
async function tryFilesystemSave(buf: Buffer, safeName: string): Promise<string | null> {
  try {
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, safeName), buf);
    // Vérifier que le fichier a bien été écrit
    await fs.access(path.join(uploadDir, safeName));
    return `/uploads/${safeName}`;
  } catch {
    return null;
  }
}

/**
 * Convertit le buffer en data URL base64 (fonctionne partout, y compris Vercel).
 */
function toDataUrl(buf: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdminAuthorized(req)) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: 'Corps de requête invalide. Envoyez un FormData avec un champ "file".' },
        { status: 400 },
      );
    }

    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Type non supporté (${file.type}). Acceptés : JPEG, PNG, WebP, AVIF.` },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 5 Mo).' }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // 1) Essai filesystem (OVH, VPS, local)
    const fsUrl = await tryFilesystemSave(buf, safeName);
    if (fsUrl) {
      return NextResponse.json({ url: fsUrl, storage: 'filesystem' });
    }

    // 2) Fallback base64 data URL (Vercel, serverless)
    const dataUrl = toDataUrl(buf, file.type);
    return NextResponse.json({ url: dataUrl, storage: 'base64' });
  } catch (err) {
    console.error('[upload] Erreur inattendue :', err);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
