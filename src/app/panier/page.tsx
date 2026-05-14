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
      <div className="min-h-screen bg-maison-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center text-maison-cacao/60">
          Chargement du panier…
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-screen bg-maison-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-maison-brun hover:text-maison-cacao font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden />
            Continuer mes achats
          </Link>
          <div className="rounded-sm border border-maison-brun/10 bg-white p-8 text-center shadow-card">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-maison-sable/40 text-maison-brun mb-6">
              <ShoppingBag className="w-10 h-10" aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-semibold text-maison-cacao">Votre panier est vide</h1>
            <p className="mt-2 text-maison-cacao/75">Ajoutez des huiles ou de l&apos;amlou depuis le catalogue.</p>
            <Link href="/articles" className="btn-maison-primary !w-auto mt-8 inline-flex px-8">
              Voir le catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maison-creme">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-maison-brun hover:text-maison-cacao font-medium mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Continuer mes achats
        </Link>

        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-maison-cacao">Panier</h1>

        {hasUnknown && (
          <p className="mt-3 rounded-sm border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Certains articles ne sont plus au catalogue ou ont été désactivés. Retirez-les avant de payer.
          </p>
        )}

        <ul className="mt-8 space-y-4">
          {resolved.map(({ line, label, unit, image, lineTotal }) => (
            <li key={line.productId} className="flex flex-col gap-4 rounded-sm border border-maison-brun/10 bg-white p-4 shadow-card sm:flex-row sm:items-center">
              <div className="relative aspect-square w-full max-w-[5.5rem] shrink-0 overflow-hidden rounded-sm bg-maison-sable/30">
                {image ? (
                  <Image src={image} alt="" fill className="object-cover" sizes="96px" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-3xl opacity-30" aria-hidden>
                    🫒
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-maison-cacao truncate">{label}</p>
                <p className="text-sm text-maison-cacao/60 mt-1">
                  {unit.toFixed(2).replace('.', ',')} € × {line.quantity}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div className="flex items-center gap-1 rounded-sm border border-maison-brun/10 p-1">
                  <button
                    type="button"
                    aria-label="Diminuer"
                    className="flex size-9 items-center justify-center rounded-sm hover:bg-maison-sable/30"
                    onClick={() => setQuantity(line.productId, line.quantity - 1)}
                  >
                    <Minus className="size-4" aria-hidden />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-medium text-maison-cacao">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="Augmenter"
                    className="flex size-9 items-center justify-center rounded-sm hover:bg-maison-sable/30"
                    onClick={() => setQuantity(line.productId, line.quantity + 1)}
                  >
                    <Plus className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-maison-cacao">{lineTotal.toFixed(2).replace('.', ',')} €</p>
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

        <div className="mt-10 rounded-sm border border-maison-brun/10 bg-white px-6 py-5 shadow-card">
          <div className="flex items-center justify-between text-lg font-semibold text-maison-cacao">
            <span>Total TTC</span>
            <span>{grandTotal.toFixed(2).replace('.', ',')} €</span>
          </div>
          <Link
            href={hasUnknown ? '#' : '/commande/paiement'}
            aria-disabled={hasUnknown}
            className={`btn-maison-primary mt-6 flex w-full items-center justify-center min-h-[52px] ${
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
    </div>
  );
}
