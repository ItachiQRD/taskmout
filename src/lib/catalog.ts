import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/types/store';
import { SEED_PRODUCTS } from '@/lib/store';

const CATALOG_PATH = path.join(process.cwd(), 'data', 'catalog.json');

/**
 * Catalogue utilisé pour recalculer les montants au paiement (côté serveur).
 * Placez une copie JSON du catalogue dans `data/catalog.json` pour suivre les
 * produits modifiés dans l’admin ; sinon le seed embarqué est utilisé.
 */
export async function getCatalogForCheckout(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(CATALOG_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return SEED_PRODUCTS;
    return parsed as Product[];
  } catch {
    return SEED_PRODUCTS;
  }
}
