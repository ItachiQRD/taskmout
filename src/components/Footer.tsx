import Link from 'next/link';
import { Droplets, Mail, MapPin, Phone } from 'lucide-react';

const links = [
  { label: 'Articles', href: '/articles' },
  { label: 'Savoir plus', href: '/savoir-plus' },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Mentions légales', href: '/mentions' },
  { label: 'Confidentialité (RGPD)', href: '/mentions#donnees' },
  { label: 'Cookies', href: '/mentions#cookies' },
];

export function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/10 text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold text-cream">
              <Droplets className="w-7 h-7 text-argan-300" aria-hidden />
              Taskmout
            </Link>
            <p className="mt-4 text-cream/80 text-sm leading-relaxed max-w-xs">
              Huiles précieuses et saveurs artisanales du Maroc, préparées avec soin.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 hover:text-argan-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-cream/80 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-argan-300 shrink-0" />
                <a href="mailto:contact@taskmout.fr" className="hover:text-argan-300 transition-colors">
                  contact@taskmout.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-argan-300 shrink-0" />
                <a href="tel:+33000000000" className="hover:text-argan-300 transition-colors">
                  À venir
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-argan-300 shrink-0 mt-0.5" />
                <span>France — envois partout</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 hover:text-argan-300 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-cream/55 text-xs leading-relaxed">
              Paiement sécurisé. Livraison soignée partout en France.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-cream/60 text-sm">
          <p>© {new Date().getFullYear()} Taskmout. Tous droits réservés.</p>
          <p className="text-cream/45 text-xs">
            Site fabriqué avec soin à Reims — données traitées en France.
          </p>
        </div>
      </div>
    </footer>
  );
}
