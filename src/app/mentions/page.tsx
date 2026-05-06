import Link from 'next/link';
import { AnimateSection } from '@/components/AnimateSection';
import { ShieldCheck, FileText, Cookie, ScrollText, Mail } from 'lucide-react';

export const metadata = {
  title: 'Mentions légales & confidentialité — Taskmout',
  description:
    "Mentions légales, politique de confidentialité, gestion des cookies et conditions générales du site Taskmout.",
};

const SECTIONS = [
  { id: 'editeur', label: 'Éditeur', icon: FileText },
  { id: 'hebergement', label: 'Hébergement', icon: ScrollText },
  { id: 'donnees', label: 'Données personnelles (RGPD)', icon: ShieldCheck },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'pi', label: 'Propriété intellectuelle', icon: FileText },
  { id: 'cgv', label: 'Conditions de vente', icon: ScrollText },
  { id: 'contact', label: 'Contact & réclamations', icon: Mail },
];

export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <section className="border-b border-white/10 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="section-animate inline-flex items-center gap-2 px-4 py-2 rounded-full border border-argan-400/25 bg-white/5 text-cream/90 text-sm">
              <ShieldCheck className="w-4 h-4 text-argan-300" />
              Informations légales
            </div>
            <h1 className="section-animate mt-6 font-oriental text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent">
              Mentions légales & confidentialité
            </h1>
            <p className="section-animate mt-4 text-cream/75 max-w-2xl">
              Cette page regroupe l&apos;ensemble des informations légales relatives au site Taskmout,
              ainsi que notre politique de protection des données personnelles (RGPD) et la gestion
              des cookies.
            </p>
          </AnimateSection>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sommaire */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-argan-300 uppercase text-xs tracking-widest font-semibold">Sommaire</p>
              <ul className="mt-3 space-y-2">
                {SECTIONS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex items-center gap-2 text-cream/80 hover:text-argan-300 text-sm transition-colors"
                      >
                        <Icon className="w-4 h-4 text-argan-300/70 shrink-0" />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Contenu */}
          <div className="lg:col-span-3 space-y-12 text-cream/85 leading-relaxed">
            <article id="editeur">
              <h2 className="font-display text-2xl text-cream">1. Éditeur du site</h2>
              <div className="mt-4 space-y-2">
                <p>
                  <strong className="text-cream">Taskmout</strong> — entreprise artisanale spécialisée
                  dans les huiles, l&apos;amlou et le miel.
                </p>
                <ul className="text-cream/80 list-disc pl-5 space-y-1">
                  <li>Adresse : 43 rue Clovis Chezel, 51100 Reims, France</li>
                  <li>
                    Email :{' '}
                    <a href="mailto:contact@taskmout.fr" className="text-argan-300 hover:text-argan-200">
                      contact@taskmout.fr
                    </a>
                  </li>
                  <li>Directeur de la publication : à compléter</li>
                  <li>SIRET / forme juridique : à compléter avant mise en production</li>
                </ul>
              </div>
            </article>

            <article id="hebergement">
              <h2 className="font-display text-2xl text-cream">2. Hébergement</h2>
              <p className="mt-4">
                Le site est hébergé par <strong className="text-cream">Vercel Inc.</strong> — 340 S Lemon
                Ave #4133, Walnut, CA 91789, USA — <a href="https://vercel.com" className="text-argan-300 hover:text-argan-200">vercel.com</a>.
                Les données affichées sur le site sont stockées localement dans le navigateur du visiteur
                (panier, session admin) et ne sont pas transmises à un serveur tiers tant qu&apos;une
                commande ou un message n&apos;est pas explicitement envoyé.
              </p>
            </article>

            <article id="donnees">
              <h2 className="font-display text-2xl text-cream">3. Données personnelles (RGPD)</h2>
              <div className="mt-4 space-y-3">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (UE 2016/679) et à la
                  loi Informatique et Libertés modifiée, vous disposez de droits sur les données vous
                  concernant.
                </p>
                <p className="text-cream font-medium mt-4">Données collectées</p>
                <ul className="list-disc pl-5 space-y-1 text-cream/80">
                  <li>Formulaire de contact : nom, adresse email, message — uniquement pour vous répondre.</li>
                  <li>Commande : nom, adresse de livraison, email — pour traiter et expédier votre commande.</li>
                  <li>Aucune donnée bancaire n&apos;est stockée par Taskmout (paiement via prestataire sécurisé).</li>
                </ul>

                <p className="text-cream font-medium mt-4">Finalité &amp; base légale</p>
                <ul className="list-disc pl-5 space-y-1 text-cream/80">
                  <li>Répondre à vos demandes (consentement explicite via le formulaire).</li>
                  <li>Traiter et expédier vos commandes (exécution du contrat).</li>
                  <li>Respecter les obligations légales (facturation, comptabilité).</li>
                </ul>

                <p className="text-cream font-medium mt-4">Durée de conservation</p>
                <ul className="list-disc pl-5 space-y-1 text-cream/80">
                  <li>Messages : 12 mois après le dernier échange.</li>
                  <li>Commandes : 5 ans (obligation comptable).</li>
                  <li>Cookies : 6 mois maximum (consentement renouvelable).</li>
                </ul>

                <p className="text-cream font-medium mt-4">Vos droits</p>
                <p className="text-cream/80">
                  Vous pouvez à tout moment exercer vos droits d&apos;accès, de rectification,
                  d&apos;effacement, de limitation, de portabilité et d&apos;opposition concernant vos
                  données. Pour cela, écrivez-nous à{' '}
                  <a href="mailto:contact@taskmout.fr" className="text-argan-300 hover:text-argan-200">
                    contact@taskmout.fr
                  </a>
                  . En cas de difficulté, vous pouvez introduire une réclamation auprès de la{' '}
                  <a href="https://www.cnil.fr" className="text-argan-300 hover:text-argan-200">
                    CNIL
                  </a>
                  .
                </p>

                <p className="text-cream/80 mt-4">
                  Aucune donnée personnelle n&apos;est cédée, vendue ou transmise à des tiers à des
                  fins commerciales.
                </p>
              </div>
            </article>

            <article id="cookies">
              <h2 className="font-display text-2xl text-cream">4. Cookies</h2>
              <div className="mt-4 space-y-3">
                <p>
                  Le site Taskmout utilise un nombre minimal de cookies, exclusivement à des fins
                  techniques ou — sur consentement explicite — de mesure d&apos;audience anonyme.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-cream/80">
                  <li>
                    <strong className="text-cream">Cookies essentiels</strong> — fonctionnement du
                    panier, préférences d&apos;affichage, session administrateur. Toujours actifs car
                    nécessaires.
                  </li>
                  <li>
                    <strong className="text-cream">Mesure d&apos;audience anonyme</strong> — statistiques
                    agrégées sans identification personnelle. <em>Désactivé par défaut</em>, soumis à
                    consentement.
                  </li>
                  <li>
                    <strong className="text-cream">Aucune publicité, aucun traceur tiers.</strong>
                  </li>
                </ul>
                <p className="text-cream/80">
                  Vous pouvez à tout moment modifier vos préférences en effaçant les cookies de votre
                  navigateur — le bandeau de consentement s&apos;affichera à nouveau.
                </p>
              </div>
            </article>

            <article id="pi">
              <h2 className="font-display text-2xl text-cream">5. Propriété intellectuelle</h2>
              <p className="mt-4">
                L&apos;ensemble des éléments présents sur ce site (textes, photographies, illustrations,
                logos, marques, mise en page) est la propriété exclusive de Taskmout ou de ses
                partenaires, et est protégé par les lois relatives à la propriété intellectuelle.
                Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
                écrite préalable est interdite.
              </p>
            </article>

            <article id="cgv">
              <h2 className="font-display text-2xl text-cream">6. Conditions générales de vente</h2>
              <div className="mt-4 space-y-3">
                <p>
                  Les présentes conditions s&apos;appliquent à toute commande passée sur le site
                  Taskmout. Les prix sont indiqués en euros, toutes taxes comprises (TTC).
                </p>
                <ul className="list-disc pl-5 space-y-1 text-cream/80">
                  <li>Livraison&nbsp;: France métropolitaine, par transporteur partenaire.</li>
                  <li>Délais&nbsp;: généralement 3 à 7 jours ouvrés selon la zone.</li>
                  <li>
                    Droit de rétractation&nbsp;: 14 jours à compter de la réception, pour les produits
                    non périssables et non décachetés (article L.221-18 du Code de la consommation).
                  </li>
                  <li>Paiement&nbsp;: sécurisé via prestataire bancaire agréé.</li>
                </ul>
                <p className="text-cream/65 text-sm italic">
                  Conditions complètes en cours de finalisation. Pour toute question, écrivez-nous à
                  contact@taskmout.fr.
                </p>
              </div>
            </article>

            <article id="contact">
              <h2 className="font-display text-2xl text-cream">7. Contact & réclamations</h2>
              <p className="mt-4">
                Pour toute question relative à ces mentions, à la protection de vos données, ou pour
                exercer vos droits, vous pouvez nous écrire à{' '}
                <a href="mailto:contact@taskmout.fr" className="text-argan-300 hover:text-argan-200">
                  contact@taskmout.fr
                </a>{' '}
                ou via la page{' '}
                <Link href="/contact" className="text-argan-300 hover:text-argan-200">
                  Contact
                </Link>
                . Nous nous engageons à vous répondre sous 30 jours.
              </p>
              <p className="mt-3 text-cream/55 text-sm">
                Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
