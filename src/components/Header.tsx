'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, Droplets, Menu, ShoppingBag, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Savoir plus', href: '/savoir-plus' },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Contact', href: '/contact' },
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

  const barSurface =
    elevated || !isHome
      ? 'bg-[#121212]/94 backdrop-blur-xl border-white/12 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.75)]'
      : 'bg-gradient-to-b from-black/78 via-black/48 to-transparent border-white/[0.08]';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,backdrop-filter] duration-300 ${barSurface}`}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl flex-nowrap items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-2 rounded-xl py-1 text-cream outline-none transition-colors hover:text-argan-200 focus-visible:ring-2 focus-visible:ring-argan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-2.5 sm:py-2"
            aria-label="Taskmout — Accueil"
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-argan-400/35 bg-argan-500/[0.12] text-argan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:size-[2.875rem]"
              aria-hidden
            >
              <Droplets className="size-[1.125rem] sm:size-5" />
            </span>
            <span className="truncate font-display text-[1.05rem] font-semibold tracking-tight sm:text-xl">
              Taskmout
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 justify-center px-2 xl:flex" aria-label="Navigation principale">
            <ul className="flex max-w-[52rem] flex-wrap items-center justify-center gap-x-0.5 gap-y-1 2xl:gap-x-1">
              {NAV_ITEMS.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        active
                          ? 'block rounded-xl bg-white/[0.1] px-2.5 py-2 text-[0.875rem] font-medium leading-tight text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/10 2xl:px-3 2xl:text-[0.94rem]'
                          : 'block rounded-xl px-2.5 py-2 text-[0.875rem] font-medium leading-tight text-cream/75 transition-colors hover:bg-white/[0.06] hover:text-cream 2xl:px-3 2xl:text-[0.94rem]'
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Link
              href="/panier"
              className="flex size-11 items-center justify-center rounded-xl text-cream/82 transition-colors hover:bg-white/[0.07] hover:text-argan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-argan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
              aria-label="Panier"
            >
              <ShoppingBag className="size-[1.25rem] sm:size-[1.35rem]" />
            </Link>

            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-xl text-cream transition-colors hover:bg-white/[0.07] xl:hidden"
              aria-expanded={drawerOpen}
              aria-controls="navigation-mobile"
              aria-label={drawerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setDrawerOpen((x) => !x)}
            >
              {drawerOpen ? (
                <X className="size-6 shrink-0" aria-hidden />
              ) : (
                <Menu className="size-6 shrink-0" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <button
            type="button"
            className="nav-mobile-backdrop fixed inset-0 z-[109] xl:hidden"
            aria-label="Fermer le menu"
            onClick={closeDrawer}
          />

          <div
            id="navigation-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="nav-mobile-drawer fixed inset-y-0 right-0 z-[110] flex w-full max-w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden border-l border-white/10 bg-[#0f0f0f]/97 shadow-[-28px_0_64px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:max-w-[20.5rem] xl:hidden"
          >
            <div className="flex items-start justify-between border-b border-white/10 px-5 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-4">
              <div>
                <p className="font-display text-[1.15rem] font-semibold tracking-tight text-cream">
                  Navigation
                </p>
                <p className="mt-1 text-sm text-cream/55">
                  Choisissez une page ci-dessous.
                </p>
              </div>
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl text-cream transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-argan-500"
                onClick={closeDrawer}
                aria-label="Fermer le menu"
              >
                <X className="size-6" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Pages du site">
              {NAV_ITEMS.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    className={
                      active
                        ? 'flex min-h-[3.25rem] items-center justify-between gap-2 rounded-2xl bg-argan-500/18 px-4 py-3.5 text-base font-medium text-cream ring-1 ring-argan-400/35'
                        : 'flex min-h-[3.25rem] items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-base font-medium text-cream/88 transition-colors hover:bg-white/[0.06] active:bg-white/[0.08]'
                    }
                  >
                    {item.label}
                    <ChevronRight className="size-4 shrink-0 opacity-35" aria-hidden />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto grid gap-2.5 border-t border-white/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-5">
              <Link
                href="/panier"
                onClick={closeDrawer}
                className="btn-primary inline-flex w-full justify-center gap-2 text-[0.95rem]"
              >
                <ShoppingBag className="size-4 shrink-0" aria-hidden />
                Mon panier
              </Link>
              <Link
                href="/contact"
                onClick={closeDrawer}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-argan-400/45 bg-transparent px-5 py-3 text-[0.95rem] font-medium text-cream/95 transition-colors hover:bg-white/[0.08] hover:border-argan-400/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-argan-500"
              >
                Nous écrire
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
