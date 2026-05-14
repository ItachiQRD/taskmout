'use client';

import Link from 'next/link';
import { cartItemCount, useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  ChevronDown,
  Menu,
  ShoppingBag,
  User,
  X,
  Truck,
  Leaf,
  ShieldCheck,
} from 'lucide-react';

const NAV_LINKS: readonly { label: string; href: string; children?: readonly { label: string; href: string }[] }[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Boutique',
    href: '/articles',
    children: [
      { label: 'Tous les produits', href: '/articles' },
      { label: 'Huiles', href: '/huiles' },
      { label: 'Amlou', href: '/amlou' },
    ],
  },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Bienfaits & recettes', href: '/savoir-plus' },
  { label: 'Contact', href: '/contact' },
];

function isActiveRoute(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const BANNER_ITEMS = [
  { icon: Truck, text: 'Livraison offerte dès 80\u20AC d\u2019achat' },
  { icon: Leaf, text: 'Produits artisanaux du Maroc' },
  { icon: ShieldCheck, text: 'Paiement 100% sécurisé' },
];

export function Header() {
  const { lines, hydrated } = useCart();
  const cartCount = hydrated ? cartItemCount(lines) : 0;
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
    setDropdownOpen(null);
  }, [pathname]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const transparent = isHome && !scrolled;

  const headerBg = transparent
    ? 'bg-transparent border-transparent'
    : 'bg-maison-creme/98 border-maison-brun/10 shadow-[0_4px_24px_-6px_rgba(90,56,37,0.08)] backdrop-blur-md';

  const textColor = transparent ? 'text-white' : 'text-maison-cacao';
  const textColorMuted = transparent ? 'text-white/70' : 'text-maison-cacao/70';
  const iconColor = transparent ? 'text-white/80 hover:text-white' : 'text-maison-cacao/75 hover:text-maison-brun';
  const badgeBg = transparent ? 'bg-white text-maison-cacao' : 'bg-maison-brun text-white';

  return (
    <>
      {/* Top banner */}
      {!isHome && (
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
      )}

      <header
        className={`${isHome ? 'fixed inset-x-0 top-0' : 'sticky top-0'} z-[100] border-b transition-all duration-300 ${headerBg}`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 flex-col leading-none" aria-label="Taskmout — Accueil">
            <span className={`text-[10px] font-medium uppercase tracking-[0.28em] ${textColorMuted}`}>
              Maison
            </span>
            <span className={`font-display text-xl font-bold uppercase tracking-[0.06em] sm:text-2xl ${textColor}`}>
              Taskmout
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 justify-center lg:flex" aria-label="Navigation principale">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = dropdownOpen === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && setDropdownOpen(item.label)}
                    onMouseLeave={() => hasChildren && setDropdownOpen(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors ${
                        active
                          ? transparent ? 'text-white' : 'text-maison-brun'
                          : transparent ? 'text-white/80 hover:text-white' : 'text-maison-cacao/75 hover:text-maison-brun'
                      }`}
                    >
                      {item.label}
                      {hasChildren && <ChevronDown className={`size-3.5 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />}
                    </Link>

                    {/* Dropdown */}
                    {hasChildren && isOpen && (
                      <div className="absolute left-0 top-full pt-1">
                        <ul className="min-w-[200px] rounded-sm border border-maison-brun/10 bg-white py-2 shadow-maison">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2.5 text-sm text-maison-cacao/80 transition-colors hover:bg-maison-sable/30 hover:text-maison-brun"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-1">
            <Link href="/admin/login" className={`hidden sm:flex size-10 items-center justify-center rounded-full transition-colors ${iconColor}`} aria-label="Mon compte">
              <User className="size-[18px]" />
            </Link>

            <Link href="/panier" className={`relative flex size-10 items-center justify-center rounded-full transition-colors ${iconColor}`} aria-label="Panier">
              <ShoppingBag className="size-[18px]" />
              {cartCount > 0 && (
                <span className={`absolute right-0.5 top-0.5 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none ${badgeBg}`}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className={`flex size-10 items-center justify-center rounded-full transition-colors lg:hidden ${iconColor}`}
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
              <Link href="/" onClick={closeDrawer} className="flex flex-col leading-none">
                <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-maison-cacao/60">Maison</span>
                <span className="font-display text-lg font-bold uppercase tracking-[0.06em] text-maison-cacao">Taskmout</span>
              </Link>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full text-maison-cacao/70 hover:text-maison-brun"
                onClick={closeDrawer}
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Pages">
              {NAV_LINKS.map((item, idx) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeDrawer}
                      style={{ animationDelay: `${60 + idx * 45}ms` }}
                      className={`nav-mobile-link flex min-h-[48px] items-center border-b border-maison-brun/6 text-[15px] font-medium transition-colors ${
                        active ? 'text-maison-brun' : 'text-maison-cacao/85 hover:text-maison-brun'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 border-l border-maison-brun/8">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeDrawer}
                            className="flex min-h-[40px] items-center pl-4 text-sm text-maison-cacao/70 hover:text-maison-brun transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-maison-brun/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4">
              <Link href="/panier" onClick={closeDrawer} className="btn-maison-primary w-full">
                <ShoppingBag className="size-4 shrink-0" aria-hidden />
                Mon panier {cartCount > 0 ? `(${cartCount})` : ''}
              </Link>
              <Link href="/admin/login" onClick={closeDrawer} className="btn-maison-outline w-full">
                <User className="size-4 shrink-0" aria-hidden />
                Espace admin
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
