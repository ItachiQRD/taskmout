'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { parsePriceFr } from '@/lib/price';

export default function CommandePaiementPage() {
  const router = useRouter();
  const { lines, hydrated, clear } = useCart();
  const { products } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const total = lines.reduce((s, line) => {
    const p = products.find((x) => x.id === line.productId);
    if (!p) return s;
    return s + parsePriceFr(p.price) * line.quantity;
  }, 0);

  useEffect(() => {
    if (!hydrated) return;
    if (!lines.length) router.replace('/panier');
  }, [hydrated, lines.length, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const ok =
      name.trim().length >= 2 &&
      email.includes('@') &&
      address.trim().length >= 8;

    if (!ok || !lines.length) {
      setError('Merci de remplir nom, une adresse e-mail valide et une adresse de livraison complète.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/checkout/sumup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines,
          customer: { name: name.trim(), email: email.trim(), address: address.trim() },
          note: note.trim() || undefined,
        }),
      });

      const data = (await res.json()) as {
        hostedCheckoutUrl?: string;
        error?: string;
      };

      if (!res.ok || !data.hostedCheckoutUrl) {
        setError(data.error ?? 'Impossible de démarrer le paiement. Réessayez plus tard.');
        setBusy(false);
        return;
      }

      clear();
      window.location.href = data.hostedCheckoutUrl;
    } catch {
      setError('Erreur réseau.');
      setBusy(false);
    }
  }

  if (!hydrated) {
    return <div className="max-w-xl mx-auto px-4 py-16 text-center text-ink/60">Chargement…</div>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/panier" className="inline-flex items-center gap-2 text-argan-600 hover:text-argan-700 font-medium mb-8">
        <ArrowLeft className="w-5 h-5" aria-hidden />
        Retour au panier
      </Link>

      <h1 className="font-display text-2xl font-semibold text-ink">Livraison & paiement SumUp</h1>
      <p className="mt-2 text-ink/75 text-sm">
        Après validation, vous serez redirigé vers la page de paiement SumUp. Le montant vérifié côté serveur :{' '}
        <strong>{total.toFixed(2).replace('.', ',')} €</strong> TTC.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
            Nom complet
          </label>
          <input
            id="name"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-argan-500 outline-none bg-white text-ink"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-argan-500 outline-none bg-white text-ink"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-ink mb-1.5">
            Adresse de livraison
          </label>
          <textarea
            id="address"
            required
            rows={4}
            className="w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-argan-500 outline-none resize-y bg-white text-ink"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rue, code postal, ville"
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-ink mb-1.5">
            Note pour la préparation (optionnel)
          </label>
          <textarea
            id="note"
            rows={3}
            className="w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-argan-500 outline-none resize-y bg-white text-ink"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {error ? (
          <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="btn-primary w-full min-h-[52px] justify-center disabled:opacity-60"
        >
          {busy ? 'Redirection…' : 'Aller au paiement SumUp'}
        </button>
      </form>
    </div>
  );
}
