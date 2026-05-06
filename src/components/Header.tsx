'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Savoir plus', href: '/savoir-plus' },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin', href: '/admin' },
];

const SCROLL_THRESHOLD = 60;

export function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        visible
          ? 'bg-[#1a1a1a]/85 backdrop-blur-md border-b border-white/10 translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 sm:h-24">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl sm:text-2xl font-medium text-cream/90 transition-colors duration-200 hover:text-argan-300"
          aria-label="Taskmout — Retour à l'accueil"
        >
          <Image
            src="/logo.png"
            alt="Taskmout"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
            priority
          />
          <span className="relative after:absolute after:left-0 after:bottom-[-3px] after:block after:h-[1px] after:w-0 after:bg-argan-400 after:transition-all after:duration-300 after:content-[''] hover:after:w-full">
            Taskmout
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-3 text-lg text-cream/70 font-medium transition-colors duration-200 hover:text-argan-300"
            >
              <span className="relative after:absolute after:left-1/2 after:bottom-[-4px] after:block after:h-[1px] after:w-0 after:-translate-x-1/2 after:bg-argan-400 after:transition-all after:duration-300 after:content-[''] hover:after:w-3/4">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/panier"
            className="flex items-center justify-center w-11 h-11 rounded-lg text-cream/70 transition-colors duration-200 hover:text-argan-300"
            aria-label="Voir le panier"
          >
            <ShoppingBag className="w-7 h-7" />
          </Link>

          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-cream/80"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-white/5 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 py-4"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 px-4 rounded-lg text-lg text-cream/90 font-medium hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
