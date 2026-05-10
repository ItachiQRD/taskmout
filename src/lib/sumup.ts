import type { SumupCheckoutCreateBody, SumupCheckoutResponse } from '@/types/sumup';

function getSumupApiKey(): string {
  const k = process.env.SUMUP_API_KEY;
  if (!k?.trim()) throw new Error('SUMUP_API_KEY manquant.');
  return k.trim();
}

export async function sumupCreateHostedCheckout(body: SumupCheckoutCreateBody): Promise<SumupCheckoutResponse> {
  const res = await fetch('https://api.sumup.com/v0.1/checkouts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSumupApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as SumupCheckoutResponse & { message?: string; error_message?: string };

  if (!res.ok) {
    const msg = data.message ?? data.error_message ?? res.statusText;
    throw new Error(`SumUp create checkout ${res.status}: ${msg}`);
  }

  return data;
}

export async function sumupGetCheckout(checkoutId: string): Promise<SumupCheckoutResponse> {
  const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${encodeURIComponent(checkoutId)}`, {
    headers: { Authorization: `Bearer ${getSumupApiKey()}` },
  });

  const data = (await res.json().catch(() => ({}))) as SumupCheckoutResponse & { message?: string };

  if (!res.ok) {
    throw new Error(`SumUp get checkout ${res.status}: ${data.message ?? res.statusText}`);
  }

  return data;
}
