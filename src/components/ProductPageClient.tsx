'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Leaf, Package, ShieldCheck, Sparkles } from 'lucide-react';
import { MaisonProductCard } from '@/components/MaisonProductCard';
import { StarRating } from '@/components/StarRating';

export function ProductPageClient({ productId }: { productId: string }) {
  const { products, getCategoryById } = useStore();
  const { addProduct } = useCart();
  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  if (!product) {
    return (
      <div className="min-h-[60vh] bg-maison-creme flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-2 text-rose-700 text-sm">
            Produit introuvable
          </div>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl text-maison-cacao">
            Ce produit n&apos;est plus disponible
          </h1>
          <p className="mt-3 text-maison-cacao/70 max-w-xl mx-auto">
            Il a peut-être été retiré du catalogue ou renommé.
          </p>
          <Link href="/articles" className="btn-maison-primary mt-8 inline-flex !w-auto px-8 items-center gap-2">
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
    <div className="bg-maison-creme min-h-screen">
      <section className="relative overflow-hidden border-b border-maison-brun/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-maison-cacao/70 hover:text-maison-brun font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Retour aux articles
          </Link>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-maison-brun/8 bg-maison-sable/25">
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
                  <div className="absolute inset-0 flex items-center justify-center bg-maison-sable/40">
                    <span className="text-8xl opacity-30" aria-hidden>
                      🫒
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Infos */}
            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maison-terre">
                <Sparkles className="inline w-3.5 h-3.5 mr-1.5" aria-hidden />
                {categoryName || 'Produit artisanal'}
              </p>

              <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-maison-cacao tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-2xl sm:text-3xl font-semibold text-maison-cacao">
                  {product.price}&nbsp;€
                </p>
                <span className="text-maison-cacao/50 text-sm">TTC</span>

                {outOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                    Rupture de stock
                  </span>
                ) : lowStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                    Plus que {product.stock} en stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                    En stock
                  </span>
                )}
              </div>

              <div className="mt-3">
                <StarRating rating={5} reviewCount={Math.floor(70 + product.name.length * 5)} />
              </div>

              <p className="mt-6 text-maison-cacao/82 text-lg leading-relaxed">
                {product.description || 'Produit artisanal sélectionné avec soin.'}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-maison-brun/10 bg-white p-4">
                  <Leaf className="w-5 h-5 text-maison-brun" />
                  <p className="mt-2 text-maison-cacao font-medium">Origine sélectionnée</p>
                  <p className="text-sm text-maison-cacao/65">Ingrédients choisis avec exigence.</p>
                </div>
                <div className="rounded-2xl border border-maison-brun/10 bg-white p-4">
                  <ShieldCheck className="w-5 h-5 text-maison-brun" />
                  <p className="mt-2 text-maison-cacao font-medium">Qualité contrôlée</p>
                  <p className="text-sm text-maison-cacao/65">Petits lots, suivi régulier.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => addProduct(product.id, 1)}
                  className="btn-maison-primary !w-auto px-10 min-h-[52px]"
                >
                  {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
                </button>
                <Link href="/contact" className="btn-maison-outline !w-auto px-8 min-h-[52px]">
                  Besoin d&apos;un conseil ?
                </Link>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm text-maison-cacao/60">
                <Package className="w-4 h-4 text-maison-brun" />
                Expédition soignée partout en France
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-14 sm:py-20 border-b border-maison-brun/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-maison-cacao">Produits liés</h2>
                <p className="mt-2 text-maison-cacao/65">
                  Dans la même famille, pour compléter votre sélection.
                </p>
              </div>
              <Link href="/articles" className="text-maison-brun hover:text-maison-terre font-medium text-sm uppercase tracking-wide">
                Voir tout le catalogue
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <MaisonProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    categoryLabel: getCategoryById(p.categoryId)?.name ?? 'Produit',
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
    </div>
  );
}
