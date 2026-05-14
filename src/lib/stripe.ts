import Stripe from 'stripe';

let cached: Stripe | null = null;

/** Récupère un client Stripe initialisé avec la clé secrète. Lève une erreur si la clé est manquante. */
export function getStripeClient(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY manquant.');
  }
  cached = new Stripe(key, {
    apiVersion: '2026-04-22.dahlia',
    typescript: true,
    appInfo: { name: 'Taskmout', version: '0.1.0' },
  });
  return cached;
}

/** Devise utilisée pour les paiements Stripe (par défaut EUR). */
export function getStripeCurrency(): string {
  return (process.env.STRIPE_CURRENCY?.trim() || 'eur').toLowerCase();
}

/**
 * Convertit un montant décimal (ex. 24.9 €) en plus petite unité monétaire Stripe
 * (centimes pour l'EUR). Toutes les devises supportées par Taskmout sont à 2 décimales.
 */
export function toStripeMinorUnits(amountDecimal: number): number {
  return Math.round(amountDecimal * 100);
}
