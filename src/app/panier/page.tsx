'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { parsePriceFr } from '@/lib/price';

export default function PanierPage() {
  const { lines, hydrated, setQuantity, removeProduct } = useCart();
  const { products } = useStore();

  const resolved = useMemo(() => {
    return lines.map((line) => {
      const p = products.find((x) => x.id === line.productId);
      const unit = p ? parsePriceFr(p.price) : 0;
      return {
        line,
        product: p,
        label: p?.name ?? 'Produit',
        unit,
        image: p?.image ?? null,
        lineTotal: unit * line.quantity,
      };
    });
  }, [lines, products]);

  const grandTotal = useMemo(
    () => resolved.reduce((s, row) => s + row.lineTotal, 0),
    [resolved]
  );

  const hasUnknown = resolved.some((r) => !r.product?.active || !r.product);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-maison-cacao/60 sm:px-6">
        Chargement du panier…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/articles"
          className="mb-8 inline-flex items-center gap-2 font-medium uppercase tracking-wider text-maison-brun hover:text-maison-cacao"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden />
          Continuer mes achats
        </Link>
        <div className="card-maison p-8 text-center">
          <div className="mx-auto mb-6 inline-flex size-20 items-center justify-center rounded-full border border-maison-brun/15 bg-maison-sable text-maison-brun">
            <ShoppingBag className="size-10" aria-hidden />
          </div>
          <h1 className="font-display text-2xl font-semibold text-maison-cacao">Votre panier est vide</h1>
          <p className="mt-2 text-maison-cacao/75">Ajoutez des huiles ou de l&apos;amlou depuis la boutique.</p>
          <Link href="/articles" className="btn-maison-primary mx-auto mt-8 !inline-flex max-w-xs">
            Voir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/articles"
        className="mb-8 inline-flex items-center gap-2 font-medium uppercase tracking-wider text-maison-brun hover:text-maison-cacao"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden />
        Continuer mes achats
      </Link>

      <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.06em] text-maison-cacao sm:text-3xl">
        Panier
      </h1>

      {hasUnknown && (
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Certains articles ne sont plus au catalogue ou ont été désactivés. Retirez-les ou mettez à jour la page
          avant de payer.
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {resolved.map(({ line, label, unit, image, lineTotal }) => (
          <li key={line.productId} className="card-maison flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="relative aspect-square w-full max-w-[5.5rem] shrink-0 overflow-hidden rounded-sm border border-maison-brun/10 bg-maison-sable/30">
              {image ? (
                <Image src={image} alt="" fill className="object-cover" sizes="96px" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-3xl opacity-40" aria-hidden>
                  🫒
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-maison-cacao">{label}</p>
              <p className="mt-1 text-sm text-maison-cacao/65">
                {unit.toFixed(2).replace('.', ',')} € × {line.quantity}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
              <div className="flex items-center rounded-sm border border-maison-brun/20 bg-white">
                <button
                  type="button"
                  aria-label="Diminuer"
                  className="flex size-11 items-center justify-center text-maison-cacao hover:bg-maison-sable/40"
                  onClick={() => setQuantity(line.productId, line.quantity - 1)}
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-medium">{line.quantity}</span>
                <button
                  type="button"
                  aria-label="Augmenter"
                  className="flex size-11 items-center justify-center text-maison-cacao hover:bg-maison-sable/40"
                  onClick={() => setQuantity(line.productId, line.quantity + 1)}
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold tabular-nums text-maison-cacao">{lineTotal.toFixed(2).replace('.', ',')} €</p>
                <button
                  type="button"
                  aria-label="Retirer"
                  className="text-maison-cacao/40 hover:text-rose-600"
                  onClick={() => removeProduct(line.productId)}
                >
                  <Trash2 className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-sm border border-maison-brun/15 bg-maison-sable/40 px-6 py-5">
        <div className="flex items-center justify-between text-lg font-semibold text-maison-cacao">
          <span>Total TTC</span>
          <span>{grandTotal.toFixed(2).replace('.', ',')} €</span>
        </div>
        <Link
          href={hasUnknown ? '#' : '/commande/paiement'}
          aria-disabled={hasUnknown}
          className={`btn-maison-primary mt-6 ${
            hasUnknown ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Payer avec SumUp
        </Link>
        <p className="mt-3 text-center text-xs text-maison-cacao/55">
          Paiement sécurisé par SumUp (carte, Apple Pay, Google Pay selon disponibilité).
        </p>
      </div>
    </div>
  );
}
