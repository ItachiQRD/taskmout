'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Droplets,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/', icon: Home, hint: "Présentation Taskmout" },
  { label: 'Articles', href: '/articles', icon: ShoppingBag, hint: 'Notre catalogue' },
  { label: 'Savoir plus', href: '/savoir-plus', icon: Sparkles, hint: 'Bienfaits & recettes' },
  { label: 'Notre histoire', href: '/histoire', icon: Heart, hint: 'Du Maroc à Reims' },
  { label: 'Contact', href: '/contact', icon: BookOpen, hint: 'Écrivez-nous' },
] as const;

function isActiveRoute(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  const isHome = pathname === '/';

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

  const shellStyle =
    elevated || !isHome
      ? 'bg-[#101010]/92 backdrop-blur-xl border-white/12 shadow-[0_16px_50px_-16px_rgba(0,0,0,0.8)]'
      : 'bg-gradient-to-b from-black/78 via-black/48 to-transparent border-white/[0.08]';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,backdrop-filter] duration-300 ${shellStyle}`}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-2 rounded-xl px-1 py-1 text-cream outline-none transition-colors hover:text-argan-200 focus-visible:ring-2 focus-visible:ring-argan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-2.5 sm:py-2"
            aria-label="Taskmout — Accueil"
          >
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-argan-400/35 bg-argan-500/[0.12] text-argan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:size-10"
              aria-hidden
            >
              <Droplets className="size-4 sm:size-[1.125rem]" />
            </span>
            <span className="truncate font-display text-[1rem] font-semibold tracking-tight sm:text-[1.2rem]">
              Taskmout
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 justify-center px-2 lg:flex" aria-label="Navigation principale">
            <ul className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {NAV_ITEMS.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        active
                          ? 'block rounded-xl bg-argan-500/18 px-3 py-2 text-sm font-medium text-cream ring-1 ring-argan-400/35'
                          : 'block rounded-xl px-3 py-2 text-sm font-medium text-cream/75 transition-colors hover:bg-white/[0.08] hover:text-cream'
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/panier"
              className="flex size-10 items-center justify-center rounded-xl text-cream/82 transition-colors hover:bg-white/[0.07] hover:text-argan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-argan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] sm:size-11"
              aria-label="Panier"
            >
              <ShoppingBag className="size-[1.25rem] sm:size-[1.35rem]" />
            </Link>

            <Link
              href="/contact"
              className="hidden lg:inline-flex min-h-[40px] items-center rounded-xl border border-argan-400/45 px-4 text-sm font-medium text-cream/95 transition-colors hover:bg-white/[0.08] hover:border-argan-400/65"
            >
              Nous écrire
            </Link>

            {/* Bouton menu mobile — pastille ronde animée */}
            <button
              type="button"
              className={`relative flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cream transition-all duration-300 hover:bg-white/[0.1] hover:border-argan-400/40 lg:hidden ${
                drawerOpen ? 'bg-argan-500/18 border-argan-400/40' : ''
              }`}
              aria-expanded={drawerOpen}
              aria-controls="navigation-mobile"
              aria-label={drawerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setDrawerOpen((x) => !x)}
            >
              <span className="relative block w-5 h-3.5" aria-hidden>
                <span
                  className={`absolute left-0 right-0 top-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                    drawerOpen ? 'top-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 top-1.5 h-[2px] rounded-full bg-current transition-all duration-200 ${
                    drawerOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                    drawerOpen ? 'bottom-1.5 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <button
            type="button"
            className="nav-mobile-backdrop fixed inset-0 z-[109] lg:hidden"
            aria-label="Fermer le menu"
            onClick={closeDrawer}
          />

          <div
            id="navigation-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="nav-mobile-drawer fixed inset-y-0 right-0 z-[110] flex w-full max-w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden border-l border-white/10 bg-gradient-to-b from-[#161616] via-[#111111] to-[#0c0c0c] shadow-[-32px_0_70px_-18px_rgba(0,0,0,0.95)] sm:max-w-[22rem] lg:hidden"
          >
            {/* Lueur décorative */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(214,139,42,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(140,160,60,0.12),_transparent_55%)]"
            />

            {/* En-tête du drawer */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 pt-[max(1.1rem,env(safe-area-inset-top,0px))] pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-argan-400/35 bg-argan-500/[0.14] text-argan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                  aria-hidden
                >
                  <Droplets className="size-[1.125rem]" />
                </span>
                <div>
                  <p className="font-display text-[1.05rem] font-semibold tracking-tight text-cream leading-tight">
                    Taskmout
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-argan-300/85 mt-0.5">
                    Du Maroc à Reims
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-cream/85 transition-colors hover:bg-white/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-argan-500"
                onClick={closeDrawer}
                aria-label="Fermer le menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Liste des liens */}
            <nav
              className="relative flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4"
              aria-label="Pages du site"
            >
              <p className="px-3 pt-1 pb-2 text-[11px] uppercase tracking-[0.18em] text-cream/45 font-semibold">
                Navigation
              </p>

              {NAV_ITEMS.map((item, idx) => {
                const active = isActiveRoute(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    style={{ animationDelay: `${60 + idx * 45}ms` }}
                    className={`nav-mobile-link group relative flex min-h-[3.5rem] items-center gap-3 rounded-2xl px-3 py-3 text-base font-medium transition-all ${
                      active
                        ? 'bg-argan-500/15 text-cream ring-1 ring-argan-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'text-cream/85 hover:bg-white/[0.06] hover:text-cream active:bg-white/[0.09]'
                    }`}
                  >
                    {/* Indicateur d'état actif (barre verticale) */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded-r-full bg-argan-400 transition-opacity ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        active
                          ? 'border-argan-400/45 bg-argan-500/20 text-argan-200'
                          : 'border-white/10 bg-white/[0.04] text-cream/75 group-hover:text-argan-200 group-hover:border-argan-400/35'
                      }`}
                      aria-hidden
                    >
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="leading-tight">{item.label}</span>
                      <span className="text-[12px] font-normal text-cream/55 leading-tight mt-0.5 truncate">
                        {item.hint}
                      </span>
                    </span>
                    <ChevronRight
                      className="ml-auto size-4 shrink-0 text-cream/35 transition-transform group-hover:translate-x-0.5 group-hover:text-cream/65"
                      aria-hidden
                    />
                  </Link>
                );
              })}

              <div className="mx-3 mt-5 mb-1 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <p className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-[0.18em] text-cream/45 font-semibold">
                Nous joindre
              </p>

              <a
                href="mailto:contact@taskmout.fr"
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-cream/85 transition-colors hover:bg-white/[0.05] hover:text-cream"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-argan-300">
                  <Mail className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex flex-col">
                  <span className="leading-tight">Email</span>
                  <span className="text-[12px] text-cream/55 truncate">contact@taskmout.fr</span>
                </span>
              </a>
              <a
                href="tel:+33000000000"
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-cream/85 transition-colors hover:bg-white/[0.05] hover:text-cream"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-argan-300">
                  <Phone className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex flex-col">
                  <span className="leading-tight">Téléphone</span>
                  <span className="text-[12px] text-cream/55 truncate">À venir</span>
                </span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-cream/80">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-argan-300">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex flex-col">
                  <span className="leading-tight text-cream/85">Atelier</span>
                  <span className="text-[12px] text-cream/55 truncate">Reims, France</span>
                </span>
              </div>
            </nav>

            {/* CTA bas du drawer */}
            <div className="relative mt-auto border-t border-white/10 bg-[#0d0d0d]/60 px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-4 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/panier"
                  onClick={closeDrawer}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-argan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(214,139,42,0.6)] transition-all hover:bg-argan-600 active:scale-[0.98]"
                >
                  <ShoppingBag className="size-4 shrink-0" aria-hidden />
                  Mon panier
                </Link>
                <Link
                  href="/articles"
                  onClick={closeDrawer}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-argan-400/45 bg-white/[0.03] px-4 py-3 text-sm font-medium text-cream transition-colors hover:bg-white/[0.08] hover:border-argan-400/65"
                >
                  Voir la gamme
                </Link>
              </div>
              <p className="mt-3 text-center text-[11px] text-cream/45">
                Livraison soignée · Petits lots artisanaux
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
