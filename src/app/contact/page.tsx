'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimateSection } from '@/components/AnimateSection';
import {
  MapPin,
  Mail,
  Send,
  Truck,
  Clock,
  Check,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type ContactStatus = 'idle' | 'loading' | 'sent';
type Subject = 'commande' | 'conseil' | 'partenariat' | 'autre';

const SUBJECTS: { id: Subject; label: string }[] = [
  { id: 'commande', label: 'Commande' },
  { id: 'conseil', label: 'Conseil produit' },
  { id: 'partenariat', label: 'Partenariat' },
  { id: 'autre', label: 'Autre' },
];

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<ContactStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'commande' as Subject,
    message: '',
    consent: false,
  });

  const canSubmit = useMemo(() => {
    if (status !== 'idle') return false;
    return (
      form.name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.message.trim().length >= 10 &&
      form.consent
    );
  }, [form, status]);

  const onJumpToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => nameRef.current?.focus(), 350);
  };

  useEffect(() => {
    if (status !== 'sent') return;
    const t = window.setTimeout(() => setStatus('idle'), 6000);
    return () => window.clearTimeout(t);
  }, [status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!canSubmit) {
      setError("Vérifiez votre nom, votre email, un message d'au moins 10 caractères et votre consentement.");
      return;
    }

    try {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 900));
      setSuccessMessage('Message envoyé ! Nous vous répondons sous 24–48h ouvrées.');
      setStatus('sent');
      setForm({ name: '', email: '', subject: 'commande', message: '', consent: false });
    } catch {
      setError('Une erreur est survenue. Réessayez dans quelques instants.');
      setStatus('idle');
    }
  };

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent('43 rue Clovis Chezel, 51100 Reims');
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(214,139,42,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(140,160,60,0.10),_transparent_55%)]"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <AnimateSection>
            <div className="section-animate inline-flex items-center gap-2 px-4 py-2 rounded-full border border-argan-400/25 bg-white/5 text-cream/90 text-sm">
              <Sparkles className="w-4 h-4 text-argan-300" />
              On vous répond rapidement
            </div>
            <h1 className="section-animate mt-6 font-oriental text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="section-animate mt-6 text-cream/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Une question sur nos huiles, une commande, un coffret sur-mesure ou un partenariat&nbsp;?
              Écrivez-nous, nous prenons le temps de répondre à chacun.
            </p>
            <div className="section-animate-item mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onJumpToForm}
                className="btn-primary btn-cta-discover inline-flex items-center gap-2"
              >
                <Send className="w-5 h-5" /> Écrire un message
              </button>
              <a
                href="mailto:contact@taskmout.fr"
                className="btn-outline inline-flex items-center gap-2 border-argan-400/70 text-cream/90 hover:bg-white/10"
              >
                <Mail className="w-5 h-5" /> contact@taskmout.fr
              </a>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Bandeau infos rapides */}
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <AnimateSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="section-animate-item flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Truck className="w-5 h-5 text-argan-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-cream">Livraison France</p>
                  <p className="text-cream/70 text-sm">Expédition soignée dans toute la France.</p>
                </div>
              </div>
              <div className="section-animate-item flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-argan-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-cream">Sans engagement</p>
                  <p className="text-cream/70 text-sm">Réponse personnelle, sans démarchage.</p>
                </div>
              </div>
              <div className="section-animate-item flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <MessageCircle className="w-5 h-5 text-argan-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-cream">Réponse 24–48h</p>
                  <p className="text-cream/70 text-sm">Du lundi au dimanche, jours ouvrés.</p>
                </div>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Form + infos */}
      <section className="py-16 sm:py-24 border-b border-white/10 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Colonne infos */}
              <div className="lg:col-span-2 space-y-6">
                <div className="section-animate-item rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-argan-400/30">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-argan-300 mt-1" />
                    <div>
                      <h3 className="font-display text-xl text-cream">Adresse</h3>
                      <p className="mt-2 text-cream/80 leading-relaxed">
                        43 rue Clovis Chezel<br />
                        51100 Reims, France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="section-animate-item rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-argan-400/30">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-argan-300 mt-1" />
                    <div className="w-full">
                      <h3 className="font-display text-xl text-cream">Horaires</h3>
                      <ul className="mt-3 space-y-2 text-cream/80 text-sm">
                        <li className="flex justify-between gap-4">
                          <span>Lundi – Vendredi</span>
                          <span className="text-cream/95 font-medium">9h – 18h</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span>Samedi</span>
                          <span className="text-cream/95 font-medium">10h – 16h</span>
                        </li>
                        <li className="flex justify-between gap-4">
                          <span>Dimanche</span>
                          <span className="text-cream/95 font-medium">10h – 14h</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="section-animate-item rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-argan-400/30">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-argan-300 mt-1" />
                    <div>
                      <h3 className="font-display text-xl text-cream">Email</h3>
                      <a
                        href="mailto:contact@taskmout.fr"
                        className="mt-2 inline-block text-cream/90 hover:text-argan-300 transition-colors"
                      >
                        contact@taskmout.fr
                      </a>
                      <p className="mt-2 text-cream/70 text-sm">
                        Pour toute question, devis ou commande spéciale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="lg:col-span-3">
                <div ref={formRef} />
                <div className="section-animate-item rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(214,139,42,0.18)]">
                  <h2 className="font-display text-2xl text-cream">Écrivez-nous</h2>
                  <p className="mt-2 text-cream/70 text-sm">
                    Nous traitons chaque message à la main — merci de nous donner un peu de contexte.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="text-cream/90 font-medium text-sm">
                          Nom
                        </label>
                        <input
                          ref={nameRef}
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Votre nom"
                          className="mt-2 w-full min-h-[48px] px-4 rounded-2xl border border-white/15 bg-black/20 text-cream placeholder-cream/40 focus:outline-none focus:border-argan-500 focus:ring-2 focus:ring-argan-500/25 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-cream/90 font-medium text-sm">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="vous@exemple.com"
                          className="mt-2 w-full min-h-[48px] px-4 rounded-2xl border border-white/15 bg-black/20 text-cream placeholder-cream/40 focus:outline-none focus:border-argan-500 focus:ring-2 focus:ring-argan-500/25 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-cream/90 font-medium text-sm">Sujet</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {SUBJECTS.map((s) => {
                          const active = form.subject === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, subject: s.id }))}
                              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                                active
                                  ? 'bg-argan-500 text-white border-argan-500 shadow-warm'
                                  : 'bg-white/5 text-cream/90 border-white/15 hover:border-argan-400/40 hover:bg-white/10'
                              }`}
                              aria-pressed={active}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="text-cream/90 font-medium text-sm">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Dites-nous ce dont vous avez besoin… (10 caractères minimum)"
                        rows={6}
                        className="mt-2 w-full px-4 py-3 rounded-2xl border border-white/15 bg-black/20 text-cream placeholder-cream/40 focus:outline-none focus:border-argan-500 focus:ring-2 focus:ring-argan-500/25 transition-colors resize-y"
                      />
                      <div className="mt-1 text-xs text-cream/50 flex justify-end">
                        {form.message.trim().length} caractères
                      </div>
                    </div>

                    {/* Consentement RGPD */}
                    <label htmlFor="consent" className="flex items-start gap-3 text-sm text-cream/75 cursor-pointer select-none">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                        className="mt-0.5 accent-argan-500 w-4 h-4 shrink-0"
                      />
                      <span>
                        J&apos;accepte que mes informations soient utilisées pour me recontacter.
                        Aucune donnée n&apos;est cédée à des tiers.{' '}
                        <Link href="/mentions#donnees" className="text-argan-300 hover:text-argan-200 underline decoration-dotted underline-offset-2">
                          Politique de confidentialité
                        </Link>
                        .
                      </span>
                    </label>

                    {error && (
                      <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm">
                        {error}
                      </div>
                    )}
                    {successMessage && (
                      <div className="rounded-xl border border-argan-400/30 bg-argan-500/10 px-4 py-3 text-cream text-sm flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-argan-300 shrink-0" />
                        <span>{successMessage}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                      <p className="text-xs text-cream/55">
                        Vos informations restent confidentielles et ne sont utilisées que pour vous répondre.
                      </p>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`btn-primary inline-flex items-center justify-center gap-2 ${
                          canSubmit ? '' : 'opacity-70 cursor-not-allowed'
                        }`}
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Envoi…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Map pleine largeur */}
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
                Nous trouver à Reims
              </h2>
              <p className="section-animate mt-4 text-cream/75 leading-relaxed">
                Atelier &amp; bureaux Taskmout — 43 rue Clovis Chezel, 51100 Reims.
                Retrait sur rendez-vous possible.
              </p>
            </div>

            <div className="section-animate-item mt-10 rounded-3xl overflow-hidden border border-white/10 bg-black/20 transition-transform duration-300 hover:-translate-y-1">
              <div className="relative">
                <iframe
                  title="Carte Taskmout — Reims"
                  className="w-full h-[400px] sm:h-[480px]"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute top-4 left-4 rounded-2xl border border-argan-400/25 bg-[#0d0d0d]/75 backdrop-blur px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-argan-400 shadow-[0_0_18px_rgba(214,139,42,0.6)] animate-pulse" />
                    <span className="text-cream/95 font-semibold">Atelier Taskmout</span>
                  </div>
                  <div className="mt-1 text-cream/70 text-sm">43 rue Clovis Chezel — 51100 Reims</div>
                </div>
                <a
                  href="https://www.google.com/maps?q=43+rue+Clovis+Chezel,+51100+Reims"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-argan-500 text-white border border-argan-500 shadow-warm hover:bg-argan-600 transition-colors"
                >
                  Itinéraire
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* CTA — FAQ rapide */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateSection>
            <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
              Avant d&apos;écrire&nbsp;?
            </h2>
            <p className="section-animate mt-4 text-cream/80 max-w-2xl mx-auto">
              Vous trouverez peut-être votre réponse dans notre histoire ou notre page produits.
            </p>
            <div className="section-animate-item mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/savoir-plus"
                className="btn-outline inline-flex items-center gap-2 border-argan-400/70 text-cream/90 hover:bg-white/10"
              >
                Voir les bienfaits & recettes
              </Link>
              <Link
                href="/articles"
                className="btn-primary inline-flex items-center gap-2"
              >
                Voir la gamme
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  );
}
