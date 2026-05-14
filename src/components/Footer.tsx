import Link from 'next/link';
import { Mail, MapPin, Phone, Truck, CreditCard, Undo2, Headphones } from 'lucide-react';

const links = [
  { label: 'Boutique', href: '/articles' },
  { label: 'Savoir plus', href: '/savoir-plus' },
  { label: 'Notre histoire', href: '/histoire' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Mentions légales', href: '/mentions' },
  { label: 'Confidentialité (RGPD)', href: '/mentions#donnees' },
  { label: 'Cookies', href: '/mentions#cookies' },
];

const trust = [
  { icon: Truck, title: 'Livraison offerte', text: "Dès 60€ d'achat." },
  { icon: CreditCard, title: 'Paiement sécurisé', text: 'CB, Apple Pay, PayPal.' },
  { icon: Undo2, title: 'Retours faciles', text: '14 jours pour changer d\u2019avis.' },
  { icon: Headphones, title: 'Service client', text: 'Réponse sous 24h.' },
];

export function Footer() {
  return (
    <footer className="border-t border-maison-brun/10 bg-maison-cacao text-maison-creme">
      <div className="border-b border-white/10 bg-maison-olive/95">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <Icon className="size-5 text-maison-dore" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]">{item.title}</p>
                  <p className="mt-1 text-sm text-maison-creme/85">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.12em]">Maison Taskmout</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-maison-creme/80">
              Huiles précieuses et saveurs artisanales du Maroc — de la sélection au flacon avec exigence.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-maison-dore">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-maison-creme/85 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-maison-dore">Contact</h3>
            <ul className="space-y-3 text-sm text-maison-creme/85">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-maison-dore" />
                <a href="mailto:contact@taskmout.fr" className="transition-colors hover:text-white">
                  contact@taskmout.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-maison-dore" />
                <a href="tel:+33000000000" className="transition-colors hover:text-white">
                  À venir
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-maison-dore" />
                <span>France — envois partout</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-maison-dore">Légal</h3>
            <ul className="space-y-2 text-sm">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-maison-creme/85 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-maison-creme/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Taskmout. Tous droits réservés.</p>
          <p className="text-xs text-maison-creme/45">Fabriqué avec soin — données traitées en France.</p>
        </div>
      </div>
    </footer>
  );
}
