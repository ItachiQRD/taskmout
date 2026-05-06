'use client';

import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ProductCard';

function productToCardProduct(p: { id: string; name: string; price: string; categoryId: string }, categoryName: string) {
  return {
    id: p.id,
    name: p.name,
    price: p.price + ' €',
    category: categoryName,
    image: null,
  };
}

export function HomeProducts() {
  const { getActiveProducts, getCategoryById } = useStore();
  const products = getActiveProducts().slice(0, 6);

  if (products.length === 0) {
    return (
      <p className="text-ink/60 py-8">Aucun produit pour le moment. Ajoutez-en depuis l’admin.</p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={productToCardProduct(p, getCategoryById(p.categoryId)?.name ?? '')}
        />
      ))}
    </div>
  );
}
