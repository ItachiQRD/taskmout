import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Amiri } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { ConditionalLayout } from '@/components/ConditionalLayout';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
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
    default: 'Taskmout — Huiles & saveurs du Maroc',
    template: '%s | Taskmout',
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
  authors: [{ name: 'Taskmout' }],
  creator: 'Taskmout',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'Taskmout — Huiles & saveurs du Maroc',
    description:
      "Huile d'argan, d'olive et huiles précieuses, amlou, miel et produits artisanaux du Maroc. Pression à froid, recettes familiales.",
    siteName: 'Taskmout',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taskmout — Huiles & saveurs du Maroc',
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
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} ${amiri.variable}`}>
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
