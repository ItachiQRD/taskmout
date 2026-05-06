'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { ArrowLeft } from 'lucide-react';

export function ProductPageClient({ productId }: { productId: string }) {
  const { products, getCategoryById } = useStore();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-ink/70">Produit introuvable.</p>
        <Link href="/articles" className="btn-primary mt-4 inline-flex">
          Retour aux articles
        </Link>
      </div>
    );
  }

  const categoryName = getCategoryById(product.categoryId)?.name ?? '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/articles" className="inline-flex items-center gap-2 text-argan-600 hover:text-argan-700 font-medium mb-8">
        <ArrowLeft className="w-5 h-5" aria-hidden />
        Retour aux articles
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-argan-100 to-olive-100 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl opacity-50" aria-hidden>🫒</span>
          )}
        </div>
        <div>
          <p className="text-argan-600 font-medium">{categoryName}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-2">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-ink mt-4">{product.price} €</p>
          <p className="mt-6 text-ink/80 leading-relaxed">{product.description || 'Produit artisanal.'}</p>
          {product.stock <= 0 && (
            <p className="mt-4 text-amber-600 font-medium">Rupture de stock.</p>
          )}
          <button
            type="button"
            disabled={product.stock <= 0}
            className="btn-primary mt-8 w-full sm:w-auto min-h-[52px] px-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
