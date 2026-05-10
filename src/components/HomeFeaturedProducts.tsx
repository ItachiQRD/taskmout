'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { MaisonProductCard } from '@/components/MaisonProductCard';
import { ArrowRight } from 'lucide-react';

const MAX = 6;

export function HomeFeaturedProducts() {
  const { products, getCategoryById } = useStore();

  const featured = useMemo(() => {
    return [...products.filter((p) => p.active)]
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
      .slice(0, MAX);
  }, [products]);

  if (featured.length === 0) return null;

  return (
    <section className="border-y border-maison-brun/10 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">
              Boutique
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-maison-cacao sm:text-4xl">
              Nos incontournables
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-maison-brun hover:text-maison-cacao transition-colors"
          >
            Voir toute la boutique
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-10">
          {featured.map((p) => (
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
  );
}
