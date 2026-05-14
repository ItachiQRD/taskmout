'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MaisonProductCard } from '@/components/MaisonProductCard';
import { AnimateSection } from '@/components/AnimateSection';

export function HomeFeaturedProducts() {
  const { products, getCategoryById } = useStore();

  const featured = useMemo(
    () =>
      products
        .filter((p) => p.active && p.stock > 0)
        .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
        .slice(0, 3),
    [products]
  );

  if (!featured.length) return null;

  return (
    <section className="border-t border-maison-brun/10 bg-maison-creme py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimateSection>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">
                Nos incontournables
              </p>
            </div>
            <Link
              href="/articles"
              className="section-animate hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-maison-cacao hover:text-maison-brun transition-colors"
            >
              Voir toute la boutique <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {featured.map((p) => (
              <div key={p.id} className="section-animate-item">
                <MaisonProductCard
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
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/articles"
              className="btn-maison-outline inline-flex !w-auto items-center gap-2 px-8"
            >
              Voir toute la boutique <ArrowRight className="size-4" />
            </Link>
          </div>
        </AnimateSection>
      </div>
    </section>
  );
}
