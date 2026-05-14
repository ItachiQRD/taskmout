'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { MaisonProductCard } from '@/components/MaisonProductCard';
import { AnimateSection } from '@/components/AnimateSection';
import { Search, SlidersHorizontal, X, Sparkles, ArrowRight } from 'lucide-react';

type SortKey = 'recent' | 'price-asc' | 'price-desc' | 'name';

const SORT_LABELS: Record<SortKey, string> = {
  recent: 'Récents',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  name: 'Nom (A→Z)',
};

function priceToNumber(price: string): number {
  const cleaned = price.replace(/[^\d.,-]/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function ArticlesPage() {
  const { categories, products, getCategoryById } = useStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.active);
    if (selectedCategoryId) list = list.filter((p) => p.categoryId === selectedCategoryId);
    if (hideOutOfStock) list = list.filter((p) => p.stock > 0);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        break;
      case 'recent':
      default:
        list = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    }
    return list;
  }, [products, selectedCategoryId, search, sort, hideOutOfStock]);

  const totalActive = useMemo(() => products.filter((p) => p.active).length, [products]);
  const hasActiveFilter = selectedCategoryId !== null || search.trim() !== '' || hideOutOfStock;
  const resetFilters = () => {
    setSelectedCategoryId(null);
    setSearch('');
    setHideOutOfStock(false);
    setSort('recent');
  };

  return (
    <div className="min-h-screen bg-maison-creme pt-6">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-maison-brun/10 bg-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(90,56,37,0.05),_transparent_55%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <AnimateSection>
            <div className="flex flex-col items-start gap-4">
              <div className="section-animate inline-flex items-center gap-2 rounded-full border border-maison-brun/15 bg-maison-sable/35 px-4 py-2 text-sm text-maison-cacao/90">
                <Sparkles className="size-4 text-maison-brun" />
                Notre gamme {totalActive > 0 && <span className="text-maison-cacao/60">— {totalActive} articles</span>}
              </div>
              <h1 className="section-animate font-display text-4xl font-semibold uppercase tracking-[0.06em] text-maison-cacao sm:text-5xl md:text-6xl">
                La boutique
              </h1>
              <p className="section-animate max-w-2xl text-lg leading-relaxed text-maison-cacao/78">
                Huiles d&apos;argan et d&apos;olive, miel, amlou et coffrets&nbsp;: filtrez par catégorie,
                recherchez ou triez selon vos envies.
              </p>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Barre de filtres sticky */}
      <div className="sticky top-[3.5rem] sm:top-[4rem] z-30 border-b border-maison-brun/10 bg-maison-creme/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-3">
            {/* Recherche + tri */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maison-cacao/50"
                  aria-hidden
                />
                <input
                  id="search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un produit, un ingrédient…"
                  className="w-full min-h-[48px] pl-11 pr-10 rounded-2xl border border-maison-brun/15 bg-white text-maison-cacao placeholder-maison-cacao/50 focus:border-maison-brun focus:ring-2 focus:ring-maison-brun/20 focus:outline-none transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-maison-cacao/80 flex items-center justify-center"
                    aria-label="Effacer la recherche"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="sr-only">
                  Trier
                </label>
                <div className="relative">
                  <SlidersHorizontal
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-maison-cacao/60"
                    aria-hidden
                  />
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="min-h-[48px] pl-11 pr-8 rounded-2xl border border-maison-brun/15 bg-white text-maison-cacao font-medium focus:border-maison-brun focus:ring-2 focus:ring-maison-brun/20 focus:outline-none transition-colors cursor-pointer"
                  >
                    {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                      <option key={k} value={k} className="bg-white text-maison-cacao">
                        {SORT_LABELS[k]}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="hidden md:inline-flex items-center gap-2 px-4 min-h-[48px] rounded-2xl border border-white/15 bg-white/5 text-maison-cacao/90 text-sm cursor-pointer select-none hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={hideOutOfStock}
                    onChange={(e) => setHideOutOfStock(e.target.checked)}
                    className="accent-maison-brun w-4 h-4"
                  />
                  En stock seulement
                </label>
              </div>
            </div>

            {/* Chips de catégories */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className={`min-h-[40px] px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategoryId === null
                    ? 'bg-maison-brun text-white shadow-warm'
                    : 'bg-white/5 text-maison-cacao/90 border border-maison-brun/15 hover:border-maison-brun/35 hover:bg-maison-sable/30'
                }`}
              >
                Tous
              </button>
              {sortedCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(c.id)}
                  className={`min-h-[40px] px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategoryId === c.id
                      ? 'bg-maison-brun text-white shadow-warm'
                      : 'bg-white/5 text-maison-cacao/90 border border-maison-brun/15 hover:border-maison-brun/35 hover:bg-maison-sable/30'
                  }`}
                >
                  {c.name}
                </button>
              ))}

              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-maison-cacao/70 hover:text-maison-brun transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <p className="text-maison-cacao/70 text-sm">
              <span className="font-semibold text-maison-cacao">{filtered.length}</span> résultat
              {filtered.length > 1 ? 's' : ''}
            </p>
            <p className="text-maison-cacao/50 text-xs hidden sm:block">
              Trié par <span className="text-maison-cacao/80">{SORT_LABELS[sort]}</span>
            </p>
          </div>

          {filtered.length > 0 ? (
            <AnimateSection>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-10">
                {filtered.map((p) => (
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
            </AnimateSection>
          ) : (
            <div className="rounded-2xl border border-dashed border-maison-brun/20 bg-white p-10 text-center shadow-card sm:p-14">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-maison-brun/15 bg-maison-sable/40 text-maison-brun">
                <Search className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl text-maison-cacao sm:text-2xl">Aucun produit ne correspond</h2>
              <p className="mx-auto mt-2 max-w-md text-maison-cacao/70">
                {hasActiveFilter
                  ? 'Essayez de retirer un filtre ou de modifier votre recherche.'
                  : 'La gamme est en cours de mise à jour. Revenez bientôt !'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {hasActiveFilter && (
                  <button type="button" onClick={resetFilters} className="btn-maison-outline px-8 !w-auto">
                    Réinitialiser les filtres
                  </button>
                )}
                <Link href="/contact" className="btn-maison-primary !inline-flex !w-auto items-center gap-2 px-8">
                  Nous contacter
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA bas — savoir-plus / contact */}
      <section className="border-t border-maison-brun/10 bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateSection>
            <h2 className="section-animate font-display text-2xl font-semibold tracking-tight text-maison-cacao sm:text-3xl md:text-4xl">
              Besoin d&apos;un coffret sur-mesure&nbsp;?
            </h2>
            <p className="section-animate mx-auto mt-4 max-w-2xl text-maison-cacao/80">
              Nous composons aussi des coffrets personnalisés selon vos goûts et le nombre de personnes.
            </p>
            <div className="section-animate-item mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-maison-primary !w-auto inline-flex items-center gap-2 px-8">
                Demander un coffret
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/savoir-plus" className="btn-maison-outline inline-flex !w-auto items-center gap-2 px-8">
                Voir bienfaits & recettes
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  );
}
