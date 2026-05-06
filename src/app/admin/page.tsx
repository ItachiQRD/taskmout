'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Package, ShoppingCart, Layers, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders, products, categories } = useStore();
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'paid');
  const lowStock = products.filter((p) => p.stock < 10 && p.active);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Tableau de bord</h1>
      <p className="text-ink/70 mt-1">Vue d'ensemble de votre boutique.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/70">Commandes</p>
              <p className="text-2xl font-semibold text-ink mt-1">{orders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-argan-100 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-argan-600" />
            </div>
          </div>
          <Link href="/admin/commandes" className="mt-4 flex items-center gap-1 text-argan-600 font-medium text-sm hover:underline">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/70">À traiter</p>
              <p className="text-2xl font-semibold text-ink mt-1">{pendingOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/70">Produits</p>
              <p className="text-2xl font-semibold text-ink mt-1">{products.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-olive-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-olive-600" />
            </div>
          </div>
          <Link href="/admin/produits" className="mt-4 flex items-center gap-1 text-argan-600 font-medium text-sm hover:underline">
            Gérer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/70">Catégories</p>
              <p className="text-2xl font-semibold text-ink mt-1">{categories.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-dune-200 flex items-center justify-center">
              <Layers className="w-6 h-6 text-dune-500" />
            </div>
          </div>
          <Link href="/admin/categories" className="mt-4 flex items-center gap-1 text-argan-600 font-medium text-sm hover:underline">
            Gérer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="mt-8 card p-6 border-l-4 border-amber-500">
          <h2 className="font-display text-lg font-semibold text-ink">Stock faible</h2>
          <p className="text-sm text-ink/70 mt-1">{lowStock.length} produit(s) avec moins de 10 unités.</p>
          <Link href="/admin/stocks" className="btn-outline mt-4 inline-flex">
            Voir les stocks
          </Link>
        </div>
      )}
    </div>
  );
}
