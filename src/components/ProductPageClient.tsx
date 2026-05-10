'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import {
  ArrowLeft,
  CheckCircle2,
  Leaf,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { MaisonProductCard } from '@/components/MaisonProductCard';
import { StarRating } from '@/components/StarRating';

function stableReviewCount(productId: string): number {
  let h = 0;
  for (let i = 0; i < productId.length; i++) {
    h = (h + productId.charCodeAt(i) * (i + 3)) % 220;
  }
  return 90 + h;
}

export function ProductPageClient({ productId }: { productId: string }) {
  const { products, getCategoryById } = useStore();
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center bg-maison-creme">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">
            Produit introuvable
          </div>
          <h1 className="mt-5 font-display text-3xl text-maison-cacao sm:text-4xl">
            Ce produit n&apos;est plus disponible
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-maison-cacao/75">
            Il a peut-être été retiré du catalogue ou renommé.
          </p>
          <Link href="/articles" className="btn-maison-primary mx-auto mt-8 !inline-flex items-center gap-2 px-10">
            <ArrowLeft className="size-4" aria-hidden />
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryById(product.categoryId)?.name ?? '';
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const maxQty = outOfStock ? 0 : Math.max(1, product.stock);

  const bumpQty = (delta: number) => {
    setQty((q) => {
      const next = q + delta;
      if (next < 1) return 1;
      if (next > maxQty) return maxQty;
      return next;
    });
  };

  const relatedProducts = products
    .filter((p) => p.active && p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  const reviews = stableReviewCount(product.id);
  const priceLabel = product.price.includes('€') ? product.price : `${product.price} €`;

  return (
    <div className="min-h-screen bg-maison-creme">
      <section className="relative overflow-hidden border-b border-maison-brun/10 bg-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(90,56,37,0.04),_transparent_55%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-maison-brun/80 hover:text-maison-brun"
          >
            <ArrowLeft className="size-5" aria-hidden />
            Retour à la boutique
          </Link>

          <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-maison-brun/10 bg-maison-sable/25 shadow-maison sm:aspect-[4/5]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={95}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-40" aria-hidden>
                    🫒
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-maison-brun/15 bg-maison-sable/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-maison-brun">
                <Sparkles className="size-3.5" />
                {categoryName || 'Maison Taskmout'}
              </div>

              <h1 className="mt-5 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-maison-cacao sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <StarRating reviewCount={reviews} />
                <span className="text-sm text-maison-cacao/60">Notation clients (indicatif)</span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="font-display text-4xl font-semibold tabular-nums text-maison-cacao">{priceLabel}</p>
                <span className="pb-1 text-sm text-maison-cacao/55">TTC</span>
                {outOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-800">
                    Rupture de stock
                  </span>
                ) : lowStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
                    Plus que {product.stock} en stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
                    En stock
                  </span>
                )}
              </div>

              <p className="mt-6 text-lg leading-relaxed text-maison-cacao/80">
                {product.description || 'Produit artisanal sélectionné avec soin.'}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-sm border border-maison-brun/10 bg-maison-creme p-4">
                  <Leaf className="size-5 text-maison-brun" />
                  <p className="mt-2 font-medium text-maison-cacao">Origine sélectionnée</p>
                  <p className="text-sm text-maison-cacao/65">Ingrédients choisis avec exigence.</p>
                </div>
                <div className="rounded-sm border border-maison-brun/10 bg-maison-creme p-4">
                  <ShieldCheck className="size-5 text-maison-brun" />
                  <p className="mt-2 font-medium text-maison-cacao">Qualité contrôlée</p>
                  <p className="text-sm text-maison-cacao/65">Petits lots suivis régulièrement.</p>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-maison-cacao/70">Quantité</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-maison-brun/20 bg-white">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      disabled={outOfStock || qty <= 1}
                      onClick={() => bumpQty(-1)}
                      className="flex size-12 items-center justify-center text-maison-cacao transition-colors hover:bg-maison-sable/40 disabled:opacity-35"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-[3rem] text-center text-sm font-semibold tabular-nums">{qty}</span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      disabled={outOfStock || qty >= maxQty}
                      onClick={() => bumpQty(1)}
                      className="flex size-12 items-center justify-center text-maison-cacao transition-colors hover:bg-maison-sable/40 disabled:opacity-35"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    addProduct(product.id, qty);
                    setQty(1);
                  }}
                  className="btn-maison-primary !w-full sm:!w-auto sm:min-w-[260px] px-10"
                >
                  {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
                </button>
                <Link
                  href="/contact"
                  className="btn-maison-outline !inline-flex !w-full items-center justify-center sm:!w-auto px-10"
                >
                  Besoin d&apos;un conseil ?
                </Link>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm text-maison-cacao/60">
                <Package className="size-4 text-maison-brun" />
                Expédition soignée · Paiement sécurisé via SumUp au checkout
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-b border-maison-brun/10 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.04em] text-maison-cacao sm:text-3xl">
                  Produits liés
                </h2>
                <p className="mt-2 text-maison-cacao/65">Dans la même famille.</p>
              </div>
              <Link
                href="/articles"
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-maison-brun hover:text-maison-cacao"
              >
                Voir tout le catalogue
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <MaisonProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    categoryLabel: getCategoryById(p.categoryId)?.name ?? 'Maison Taskmout',
                    image: p.image,
                    stock: p.stock,
                    description: p.description,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 text-sm text-maison-cacao/65">
            <CheckCircle2 className="size-4 text-maison-olive" aria-hidden />
            Fabrication artisanale et expédition soignée
          </div>
        </div>
      </section>
    </div>
  );
}
