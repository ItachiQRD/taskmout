'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowLeft, CheckCircle2, Leaf, Package, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function ProductPageClient({ productId }: { productId: string }) {
  const { products, getCategoryById } = useStore();
  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  if (!product) {
    return (
      <div className="min-h-[60vh] bg-[#1a1a1a] flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-rose-200 text-sm">
            Produit introuvable
          </div>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl text-cream">
            Ce produit n&apos;est plus disponible
          </h1>
          <p className="mt-3 text-cream/70 max-w-xl mx-auto">
            Il a peut-être été retiré du catalogue ou renommé. Vous pouvez consulter la sélection
            complète depuis la page articles.
          </p>
          <Link href="/articles" className="btn-primary mt-8 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryById(product.categoryId)?.name ?? '';
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const relatedProducts = products
    .filter((p) => p.active && p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(214,139,42,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(140,160,60,0.10),_transparent_55%)]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-cream/75 hover:text-argan-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden />
            Retour aux articles
          </Link>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-neutral-950">
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
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-argan-900/40 to-olive-900/40">
                    <span className="text-8xl opacity-55" aria-hidden>
                      🫒
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-argan-400/25 bg-white/5 px-3 py-1.5 text-xs tracking-wide uppercase text-argan-300">
                <Sparkles className="w-3.5 h-3.5" />
                {categoryName || 'Produit artisanal'}
              </div>

              <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-cream tracking-tight">
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-3xl sm:text-4xl font-semibold text-cream">{product.price}</p>
                <span className="text-cream/55 text-sm">TTC</span>

                {outOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                    Rupture de stock
                  </span>
                ) : lowStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-argan-400/35 bg-argan-500/15 px-3 py-1 text-xs font-medium text-argan-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-argan-300" />
                    Plus que {product.stock} en stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    En stock
                  </span>
                )}
              </div>

              <p className="mt-6 text-cream/80 text-lg leading-relaxed">
                {product.description || 'Produit artisanal sélectionné avec soin.'}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Leaf className="w-5 h-5 text-argan-300" />
                  <p className="mt-2 text-cream font-medium">Origine sélectionnée</p>
                  <p className="text-sm text-cream/65">Ingrédients choisis avec exigence.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="w-5 h-5 text-argan-300" />
                  <p className="mt-2 text-cream font-medium">Qualité contrôlée</p>
                  <p className="text-sm text-cream/65">Petits lots, suivi régulier.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={outOfStock}
                  className="btn-primary min-h-[52px] px-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
                </button>
                <Link href="/contact" className="btn-outline-dark min-h-[52px] px-7">
                  Besoin d&apos;un conseil ?
                </Link>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm text-cream/60">
                <Package className="w-4 h-4 text-argan-300" />
                Expédition soignée partout en France
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-14 sm:py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-cream">Produits liés</h2>
                <p className="mt-2 text-cream/65">
                  Dans la même famille, pour compléter votre sélection.
                </p>
              </div>
              <Link href="/articles" className="text-argan-300 hover:text-argan-200 font-medium">
                Voir tout le catalogue
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    category: getCategoryById(p.categoryId)?.name ?? 'Produit',
                    image: p.image,
                    stock: p.stock,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-cream/65 text-sm">
            <CheckCircle2 className="w-4 h-4 text-argan-300" />
            Fabrication artisanale et expédition soignée
          </div>
        </div>
      </section>
    </div>
  );
}
