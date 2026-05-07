'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#contenu-principal" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Header />
      <main
        id="contenu-principal"
        className="flex min-h-0 w-full flex-1 flex-col min-w-0"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
