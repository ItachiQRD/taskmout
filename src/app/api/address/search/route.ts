import { NextResponse, type NextRequest } from 'next/server';
import { searchFrenchAddresses } from '@/lib/french-address';

export const runtime = 'nodejs';

/** Proxy vers la Base Adresse Nationale (évite les soucis CORS en prod). */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (q.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await searchFrenchAddresses(q, 8);
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ error: 'Recherche indisponible.' }, { status: 502 });
  }
}
