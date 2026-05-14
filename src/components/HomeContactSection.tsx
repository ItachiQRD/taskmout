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
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type ContactStatus = 'idle' | 'loading' | 'sent';

export function HomeContactSection() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<ContactStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
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
      setError(
        "Vérifiez votre nom, votre email, un message d'au moins 10 caractères et votre consentement.",
      );
      return;
    }

    try {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 900));
      setSuccessMessage('Message envoyé ! Nous vous répondons très vite.');
      setStatus('sent');
      setForm({ name: '', email: '', message: '', consent: false });
    } catch {
      setError('Une erreur est survenue. Réessayez dans quelques instants.');
      setStatus('idle');
    }
  };

  return (
    <section className="relative flex flex-1 flex-col overflow-hidden border-t border-maison-brun/10 bg-maison-creme">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(90,56,37,0.06),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(90,102,80,0.06),_transparent_55%)]"
      />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <AnimateSection>
          <div className="section-animate text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-maison-brun/15 bg-maison-sable/35 px-4 py-2">
              <Sparkles className="w-4 h-4 text-maison-brun" />
              <span className="text-maison-cacao/90 font-medium">Une envie, une question ?</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-maison-cacao tracking-tight">
              Faisons connaissance
            </h2>
            <p className="mt-4 text-maison-cacao/75 text-lg max-w-2xl mx-auto leading-relaxed">
              Livraisons dans toute la France. Écrivez-nous pour une demande, un conseil ou un coffret sur-mesure —
              chaque message reçoit une réponse personnelle.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Colonne info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="section-animate-item rounded-2xl border border-maison-brun/10 bg-white p-6 transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-maison-brun mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-display text-lg text-maison-cacao">Livraisons</h3>
                    <p className="mt-1 text-maison-cacao/75 leading-relaxed text-sm">
                      Expédition dans toute la France. Emballages soignés pour préserver la qualité de nos produits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="section-animate-item rounded-2xl border border-maison-brun/10 bg-white p-6 transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-maison-brun mt-0.5 shrink-0" />
                  <div className="w-full">
                    <h3 className="font-display text-lg text-maison-cacao">Horaires</h3>
                    <ul className="mt-2 space-y-1 text-maison-cacao/80 text-sm">
                      <li className="flex justify-between gap-3">
                        <span>Lun – Ven</span>
                        <span className="text-maison-cacao/95 font-medium">9h – 18h</span>
                      </li>
                      <li className="flex justify-between gap-3">
                        <span>Samedi</span>
                        <span className="text-maison-cacao/95 font-medium">10h – 16h</span>
                      </li>
                      <li className="flex justify-between gap-3">
                        <span>Dimanche</span>
                        <span className="text-maison-cacao/95 font-medium">10h – 14h</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="section-animate-item rounded-2xl border border-maison-brun/10 bg-white p-6 transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-maison-brun mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-display text-lg text-maison-cacao">Atelier</h3>
                    <p className="mt-1 text-maison-cacao/80 leading-relaxed text-sm">
                      43 rue Clovis Chezel<br />
                      51100 Reims, France
                    </p>
                    <Link
                      href="/contact"
                      className="mt-3 inline-flex items-center gap-1.5 text-maison-brun hover:text-maison-cacao text-sm font-medium"
                    >
                      Voir l&apos;itinéraire & la carte
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="section-animate-item flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={onJumpToForm}
                  className="btn-maison-primary !w-full sm:!w-auto inline-flex items-center justify-center gap-2 px-8"
                  aria-label="Aller au formulaire de contact"
                >
                  <Send className="w-5 h-5" />
                  Faire le pas vers nous
                </button>
                <Link
                  href="/contact"
                  className="btn-maison-outline !w-full sm:!w-auto inline-flex items-center justify-center gap-2 px-8"
                >
                  Page contact
                </Link>
              </div>
            </div>

            {/* Colonne formulaire */}
            <div className="lg:col-span-3">
              <div ref={formRef} />
              <div className="section-animate-item rounded-2xl border border-maison-brun/10 bg-white p-6 shadow-maison sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-maison-brun/20 bg-maison-sable/40 text-maison-brun">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-maison-cacao">Écrivez-nous</h3>
                    <p className="text-maison-cacao/65 text-sm">Réponse personnelle sous 24–48h.</p>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="hc-name" className="text-maison-cacao/90 font-medium text-sm">
                        Nom
                      </label>
                      <input
                        ref={nameRef}
                        id="hc-name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Votre nom"
                        autoComplete="name"
                        className="mt-2 w-full min-h-[48px] px-4 rounded-2xl border border-maison-brun/15 bg-maison-creme text-maison-cacao placeholder-maison-cacao/40 focus:outline-none focus:border-maison-brun focus:ring-2 focus:ring-maison-brun/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="hc-email" className="text-maison-cacao/90 font-medium text-sm">
                        Email
                      </label>
                      <input
                        id="hc-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="vous@exemple.com"
                        autoComplete="email"
                        className="mt-2 w-full min-h-[48px] px-4 rounded-2xl border border-maison-brun/15 bg-maison-creme text-maison-cacao placeholder-maison-cacao/40 focus:outline-none focus:border-maison-brun focus:ring-2 focus:ring-maison-brun/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hc-message" className="text-maison-cacao/90 font-medium text-sm">
                      Message
                    </label>
                    <textarea
                      id="hc-message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Dites-nous ce dont vous avez besoin…"
                      rows={5}
                      className="mt-2 w-full px-4 py-3 rounded-2xl border border-maison-brun/15 bg-maison-creme text-maison-cacao placeholder-maison-cacao/40 focus:outline-none focus:border-maison-brun focus:ring-2 focus:ring-maison-brun/20 transition-colors resize-y"
                    />
                  </div>

                  {/* Consentement RGPD */}
                  <label htmlFor="hc-consent" className="flex items-start gap-3 text-sm text-maison-cacao/75 cursor-pointer select-none">
                    <input
                      id="hc-consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-maison-brun"
                    />
                    <span>
                      J&apos;accepte que mes informations soient utilisées pour me recontacter.
                      Aucune donnée n&apos;est cédée à des tiers.{' '}
                      <Link href="/mentions" className="text-maison-brun hover:text-maison-cacao underline decoration-dotted underline-offset-2">
                        En savoir plus
                      </Link>
                      .
                    </span>
                  </label>

                  {error && (
                    <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm">
                      {error}
                    </div>
                  )}
                  {successMessage && (
                    <div role="status" className="flex items-start gap-2 rounded-xl border border-maison-olive/30 bg-maison-olive/10 px-4 py-3 text-sm text-maison-cacao">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-maison-olive" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
                    <p className="inline-flex items-center gap-1.5 text-xs text-maison-cacao/55">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Données traitées en France, jamais revendues.
                    </p>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`btn-maison-primary !w-full sm:!w-auto inline-flex items-center justify-center gap-2 px-10 transition-all ${
                        canSubmit ? '' : 'opacity-70 cursor-not-allowed'
                      }`}
                    >
                      {status === 'loading' ? 'Envoi…' : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer
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
  );
}
