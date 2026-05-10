'use client';

import Link from 'next/link';
import { cartItemCount, useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  Shield,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';

const ANNOUNCE = [
  "Livraison offerte dès 60€ d'achat",
  'Petits lots artisanaux',
  'Paiement sécurisé (SumUp)',
];

const NAV = [
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Boutique', href: '/articles' },
  { label: 'Coffrets', href: '/articles' },
  { label: 'Recettes', href: '/savoir-plus' },
  { label: 'Engagements', href: '/savoir-plus' },
];

function isActiveRoute(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { lines, hydrated } = useCart();
  const cartCount = hydrated ? cartItemCount(lines) : 0;
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  useEffect(() => setDrawerOpen(false), [pathname]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="sticky top-0 z-[100]">
      <div className="border-b border-maison-brun/10 bg-maison-sable/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-3 py-2 text-center sm:justify-between sm:px-6">
          {ANNOUNCE.map((t) => (
            <span key={t} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-maison-cacao/80">
              {t}
            </span>
          ))}
        </div>
      </div>

      <header className="border-b border-maison-brun/10 bg-maison-creme/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 flex-col leading-tight">
            <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-maison-cacao sm:text-[1.05rem]">
              Maison Taskmout
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-maison-brun/75 sm:text-[10px]">
              L&apos;or liquide du Maroc
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-0.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active ? 'text-maison-brun' : 'text-maison-cacao/75 hover:text-maison-brun'
                  }`}
                >
                  {item.label}
                  {item.label === 'Boutique' ? <ChevronDown className="size-3 opacity-60" aria-hidden /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Link
              href="/articles"
              className="flex size-10 items-center justify-center rounded-sm text-maison-cacao/80 transition-colors hover:bg-maison-brun/5 hover:text-maison-brun sm:size-11"
              aria-label="Rechercher dans la boutique"
            >
              <Search className="size-[1.15rem]" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="hidden sm:flex size-10 items-center justify-center rounded-sm text-maison-cacao/80 transition-colors hover:bg-maison-brun/5 hover:text-maison-brun sm:size-11"
              aria-label="Contact"
            >
              <User className="size-[1.1rem]" aria-hidden />
            </Link>
            <Link
              href="/panier"
              className="relative flex size-10 items-center justify-center rounded-sm text-maison-cacao/80 transition-colors hover:bg-maison-brun/5 hover:text-maison-brun sm:size-11"
              aria-label="Panier"
            >
              <ShoppingBag className="size-[1.15rem]" aria-hidden />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-maison-brun px-1 text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              ) : null}
            </Link>

            <Link
              href="/admin/login"
              className="hidden lg:flex size-10 items-center justify-center rounded-sm border border-maison-brun/15 bg-white text-maison-cacao/70 transition-colors hover:border-maison-brun/30 hover:text-maison-brun"
              aria-label="Administration"
            >
              <Shield className="size-[1rem]" aria-hidden />
            </Link>

            <button
              type="button"
              className={`flex size-10 items-center justify-center rounded-sm border border-maison-brun/15 lg:hidden sm:size-11 ${
                drawerOpen ? 'border-maison-brun bg-maison-brun/5' : 'bg-white'
              }`}
              aria-expanded={drawerOpen}
              aria-controls="nav-mobile-maison"
              aria-label={drawerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setDrawerOpen((o) => !o)}
            >
              {drawerOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[109] bg-maison-cacao/40 lg:hidden backdrop-blur-[2px]"
            aria-label="Fermer"
            onClick={closeDrawer}
          />
          <div
            id="nav-mobile-maison"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-sm flex-col border-l border-maison-brun/10 bg-maison-creme shadow-maison lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-maison-brun/10 px-5 py-4">
              <span className="font-display text-lg font-semibold uppercase tracking-[0.1em] text-maison-cacao">
                Menu
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex size-10 items-center justify-center rounded-sm text-maison-cacao hover:bg-maison-sable/50"
                aria-label="Fermer"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {NAV.map((item, idx) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`nav-mobile-link flex min-h-[3rem] items-center justify-between rounded-sm px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] ${
                      active ? 'bg-maison-brun/10 text-maison-brun' : 'text-maison-cacao hover:bg-maison-sable/40'
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="size-4 opacity-40" aria-hidden />
                  </Link>
                );
              })}
              <div className="my-2 border-t border-maison-brun/10 pt-3">
                <Link
                  href="/contact"
                  onClick={closeDrawer}
                  className="flex min-h-[3rem] items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium text-maison-cacao/80 hover:bg-maison-sable/40"
                >
                  <BookOpen className="size-4" aria-hidden />
                  Contact &amp; conseils
                </Link>
                <Link
                  href="/panier"
                  onClick={closeDrawer}
                  className="mt-1 flex min-h-[3rem] items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold text-maison-brun hover:bg-maison-sable/40"
                >
                  <ShoppingBag className="size-4" aria-hidden />
                  Mon panier
                  {cartCount > 0 ? ` (${cartCount})` : ''}
                </Link>
                <Link
                  href="/histoire"
                  onClick={closeDrawer}
                  className="flex min-h-[3rem] items-center gap-2 rounded-sm px-4 py-2 text-sm text-maison-cacao/80 hover:bg-maison-sable/40"
                >
                  <Heart className="size-4" aria-hidden />
                  Notre histoire
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
