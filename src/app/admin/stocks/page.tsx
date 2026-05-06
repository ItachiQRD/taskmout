'use client';

import { useStore } from '@/context/StoreContext';
import { Package } from 'lucide-react';

export default function AdminStocksPage() {
  const { products, getCategoryById, updateProduct } = useStore();

  const setStock = (productId: string, delta: number) => {
    const p = products.find((x) => x.id === productId);
    if (!p) return;
    const next = Math.max(0, p.stock + delta);
    updateProduct(productId, { stock: next });
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Stocks</h1>
      <p className="text-ink/70 mt-1">Ajuster les quantités en stock par produit.</p>

      <div className="mt-8 space-y-4">
        {products.map((p) => (
          <div key={p.id} className="card p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-argan-100 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-argan-600" />
              </div>
              <div>
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-sm text-ink/60">{getCategoryById(p.categoryId)?.name ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStock(p.id, -1)}
                className="w-10 h-10 rounded-xl border border-ink/20 flex items-center justify-center text-lg font-medium hover:bg-ink/5"
                aria-label="Diminuer"
              >
                −
              </button>
              <span className={`min-w-[3rem] text-center font-semibold ${p.stock < 10 ? 'text-amber-600' : 'text-ink'}`}>
                {p.stock}
              </span>
              <button
                type="button"
                onClick={() => setStock(p.id, 1)}
                className="w-10 h-10 rounded-xl border border-ink/20 flex items-center justify-center text-lg font-medium hover:bg-ink/5"
                aria-label="Augmenter"
              >
                +
              </button>
              <input
                type="number"
                min={0}
                value={p.stock}
                onChange={(e) => updateProduct(p.id, { stock: Math.max(0, Number(e.target.value)) })}
                className="w-20 min-h-[44px] px-2 rounded-xl border border-ink/20 text-center focus:border-argan-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
