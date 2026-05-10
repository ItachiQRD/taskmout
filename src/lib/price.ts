/** Parse un prix affiché en français (ex. « 24,90 ») en nombre décimal. */
export function parsePriceFr(value: string): number {
  const n = parseFloat(value.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

/** Formate un montant EUR pour affichage type catalogue (virgule décimale). */
export function formatPriceFrEUR(amount: number): string {
  return amount.toFixed(2).replace('.', ',');
}
