'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { StarRating } from '@/components/StarRating';

export type MaisonProductCardData = {
  id: string;
  name: string;
  /** Prix affiché type « 24,90 » (sans € dans la chaîne pour cohérence avec le catalogue). */
  price: string;
  categoryLabel: string;
  image: string | null;
  stock?: number;
  description?: string | null;
};

function stableReviewCount(productId: string): number {
  let h = 0;
  for (let i = 0; i < productId.length; i++) {
    h = (h + productId.charCodeAt(i) * (i + 3)) % 220;
  }
  return 90 + h;
}

function teaserDescription(text: string | null | undefined, maxLen: number): string {
  if (!text?.trim()) return 'Petit lot artisanal, pressé ou préparé avec soin.';
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen).trim()}…`;
}

/** Carte catalogue type maquette : photo à gauche, détail à droite, CTA pleine largeur. */
export function MaisonProductCard({ product }: { product: MaisonProductCardData }) {
  const { addProduct } = useCart();
  const out = product.stock !== undefined && product.stock <= 0;
  const reviews = useMemo(() => stableReviewCount(product.id), [product.id]);
  const blurb = useMemo(() => teaserDescription(product.description, 110), [product.description]);

  return (
    <article className="card-maison group flex flex-col overflow-hidden rounded-sm md:flex-row md:min-h-[280px]">
      <Link
        href={`/produit/${product.id}`}
        className="relative aspect-square w-full shrink-0 bg-maison-creme md:aspect-auto md:h-auto md:w-[46%]"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 36vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-maison-sable/35 text-7xl opacity-55" aria-hidden>
            🫒
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 md:py-7 md:pl-8 md:pr-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maison-terre">
            {product.categoryLabel}
          </p>
          <Link href={`/produit/${product.id}`}>
            <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.04em] text-maison-cacao sm:text-[1.35rem] leading-snug hover:text-maison-brun transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-3 font-body text-sm leading-relaxed text-maison-cacao/75">{blurb}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <p className="font-display text-2xl font-semibold tabular-nums text-maison-cacao">
              {product.price.includes('€') ? product.price : `${product.price} €`}
            </p>
            <StarRating reviewCount={reviews} />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button
            type="button"
            disabled={out}
            onClick={(e) => {
              e.preventDefault();
              if (!out) addProduct(product.id, 1);
            }}
            className="btn-maison-primary"
          >
            {out ? 'Indisponible' : 'Ajouter au panier'}
          </button>
          <Link
            href={`/produit/${product.id}`}
            className="block text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-maison-brun hover:text-maison-cacao transition-colors"
          >
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  );
}
