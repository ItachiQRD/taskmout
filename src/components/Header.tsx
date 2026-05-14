'use client';

import Link from 'next/link';
import { cartItemCount, useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  Truck,
  Leaf,
  ShieldCheck,
} from 'lucide-react';

const NAV_LINKS: readonly { label: string; href: string; hasDropdown?: boolean }[] = [
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Boutique', href: '/articles', hasDropdown: true },
  { label: 'Coffrets', href: '/articles' },
  { label: 'Recettes', href: '/savoir-plus' },
  { label: 'Engagements', href: '/contact' },
];

function isActiveRoute(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const BANNER_ITEMS = [
  { icon: Truck, text: 'Livraison offerte dès 80€ d\u2019achat' },
  { icon: Leaf, text: 'Petits lots artisanaux' },
  { icon: ShieldCheck, text: 'Paiement sécurisé' },
];

export function Header() {
  const { lines, hydrated } = useCart();
  const cartCount = hydrated ? cartItemCount(lines) : 0;
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      {/* Top banner */}
      <div className="bg-maison-cacao text-maison-creme">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] tracking-wide sm:justify-between sm:px-6">
          {BANNER_ITEMS.map((b) => {
            const Icon = b.icon;
            return (
              <span key={b.text} className="hidden items-center gap-1.5 sm:inline-flex">
                <Icon className="size-3.5" aria-hidden />
                {b.text}
              </span>
            );
          })}
          <span className="inline-flex items-center gap-1.5 sm:hidden">
            <Truck className="size-3.5" aria-hidden />
            Livraison offerte dès 80€
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-[100] border-b transition-shadow duration-300 ${
          elevated
            ? 'border-maison-brun/10 bg-maison-creme/98 shadow-[0_4px_24px_-6px_rgba(90,56,37,0.08)] backdrop-blur-md'
            : 'border-maison-brun/8 bg-maison-creme'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 flex-col leading-none"
            aria-label="Taskmout — Accueil"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-maison-cacao/60">
              Maison
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-[0.06em] text-maison-cacao sm:text-2xl">
              Taskmout
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 justify-center lg:flex" aria-label="Navigation principale">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors ${
                        active
                          ? 'text-maison-brun'
                          : 'text-maison-cacao/80 hover:text-maison-brun'
                      }`}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown className="size-3.5 opacity-50" aria-hidden />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-0.5">
            <Link
              href="/articles"
              className="flex size-10 items-center justify-center rounded-full text-maison-cacao/75 transition-colors hover:text-maison-brun"
              aria-label="Rechercher"
            >
              <Search className="size-5" />
            </Link>

            <Link
              href="/admin/login"
              className="hidden sm:flex size-10 items-center justify-center rounded-full text-maison-cacao/75 transition-colors hover:text-maison-brun"
              aria-label="Mon compte"
            >
              <User className="size-5" />
            </Link>

            <Link
              href="/panier"
              className="relative flex size-10 items-center justify-center rounded-full text-maison-cacao/75 transition-colors hover:text-maison-brun"
              aria-label="Panier"
            >
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-maison-brun px-1 text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-maison-cacao/75 transition-colors hover:text-maison-brun lg:hidden"
              aria-expanded={drawerOpen}
              aria-controls="navigation-mobile"
              aria-label={drawerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setDrawerOpen((x) => !x)}
            >
              {drawerOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <button
            type="button"
            className="nav-mobile-backdrop fixed inset-0 z-[109] lg:hidden"
            aria-label="Fermer"
            onClick={closeDrawer}
          />
          <div
            id="navigation-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="nav-mobile-drawer fixed inset-y-0 right-0 z-[110] flex w-full max-w-[22rem] flex-col overflow-hidden border-l border-maison-brun/10 bg-maison-creme shadow-[-16px_0_48px_-12px_rgba(90,56,37,0.12)] lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-maison-brun/10 px-5 py-4">
              <p className="font-display text-lg font-bold uppercase tracking-[0.06em] text-maison-cacao">
                Menu
              </p>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full text-maison-cacao/70 hover:text-maison-brun"
                onClick={closeDrawer}
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Pages">
              {NAV_LINKS.map((item, idx) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeDrawer}
                    style={{ animationDelay: `${60 + idx * 45}ms` }}
                    className={`nav-mobile-link flex min-h-[52px] items-center border-b border-maison-brun/6 px-2 text-sm font-medium uppercase tracking-[0.08em] transition-colors ${
                      active ? 'text-maison-brun' : 'text-maison-cacao/85 hover:text-maison-brun'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-maison-brun/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4">
              <Link
                href="/panier"
                onClick={closeDrawer}
                className="btn-maison-primary w-full"
              >
                <ShoppingBag className="size-4 shrink-0" aria-hidden />
                Mon panier {cartCount > 0 ? `(${cartCount})` : ''}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
