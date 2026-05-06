'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string | null;
  stock?: number;
};

function StockBadge({ stock }: { stock?: number }) {
  if (stock === undefined) return null;
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-400/30">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        Épuisé
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-argan-500/15 text-argan-200 border border-argan-400/30">
        <span className="w-1.5 h-1.5 rounded-full bg-argan-400" />
        Dernières pièces
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      En stock
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <article className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-argan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(214,139,42,0.35)]">
      {/* Glow décoratif au survol */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(214,139,42,0.18),transparent_70%)]"
      />

      <Link href={`/produit/${product.id}`} className="block relative">
        {/* Image / placeholder */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-argan-900/40 to-olive-900/40">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-7xl opacity-40 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                aria-hidden
              >
                🫒
              </span>
            </div>
          )}

          {/* Voile bas pour lisibilité */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Badges en haut */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#0d0d0d]/70 text-argan-200 border border-argan-400/25 backdrop-blur">
              {product.category}
            </span>
            <StockBadge stock={product.stock} />
          </div>

          {/* Indicateur "voir" en hover */}
          <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-argan-500/95 text-white flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-warm">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Infos */}
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-cream group-hover:text-argan-300 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-xl font-semibold text-cream">{product.price}</p>
            <span className="text-xs text-cream/50">TTC</span>
          </div>
        </div>
      </Link>

      {/* CTA bas */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <Link
          href={`/produit/${product.id}`}
          aria-disabled={outOfStock}
          className={`w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-2xl font-medium transition-all ${
            outOfStock
              ? 'bg-white/5 text-cream/50 border border-white/10 cursor-not-allowed pointer-events-none'
              : 'bg-argan-500 text-white border border-argan-500 hover:bg-argan-600 shadow-warm'
          }`}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden />
          {outOfStock ? 'Indisponible' : 'Voir le produit'}
        </Link>
      </div>
    </article>
  );
}
