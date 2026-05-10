import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Amiri } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { CartProvider } from '@/context/CartContext';
import { ConditionalLayout } from '@/components/ConditionalLayout';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://taskmout.fr'),
  title: {
    default: 'Maison Taskmout — L’or liquide du Maroc',
    template: '%s | Maison Taskmout',
  },
  description:
    "Huile d'argan, d'olive et huiles précieuses, amlou, miel et produits artisanaux du Maroc. Pression à froid, recettes familiales, livraison France.",
  keywords: [
    'huile d\'argan',
    'huile d\'olive',
    'amlou',
    'miel',
    'Maroc',
    'artisanal',
    'Taskmout',
    'Reims',
  ],
  authors: [{ name: 'Maison Taskmout' }],
  creator: 'Maison Taskmout',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'Maison Taskmout — Huiles & saveurs du Maroc',
    description:
      "Huile d'argan, d'olive et huiles précieuses, amlou, miel et produits artisanaux du Maroc. Pression à froid, recettes familiales.",
    siteName: 'Maison Taskmout',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Taskmout — Huiles & saveurs du Maroc',
    description:
      "Huiles, amlou et miel du Maroc. Pression à froid, recettes familiales.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${amiri.variable}`}>
      <body className="relative min-h-screen flex flex-col bg-maison-creme text-maison-cacao font-body antialiased">
        <StoreProvider>
          <CartProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
