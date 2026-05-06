'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X, Check } from 'lucide-react';

const STORAGE_KEY = 'taskmout_cookie_consent_v1';

type Consent = {
  essential: true;
  analytics: boolean;
  date: string;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setVisible(true);
    }
  }, []);

  const persist = (consent: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // localStorage indisponible — on ignore silencieusement
    }
    setVisible(false);
  };

  const acceptAll = () => {
    persist({ essential: true, analytics: true, date: new Date().toISOString() });
  };
  const refuseAll = () => {
    persist({ essential: true, analytics: false, date: new Date().toISOString() });
  };
  const saveChoice = () => {
    persist({ essential: true, analytics, date: new Date().toISOString() });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Bandeau de gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-[#111111]/95 backdrop-blur shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-argan-500/15 border border-argan-400/25 flex items-center justify-center text-argan-300 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg sm:text-xl text-cream">
                Vos cookies, vos choix
              </h2>
              <p className="mt-1 text-cream/75 text-sm leading-relaxed">
                Nous utilisons uniquement des cookies strictement nécessaires au bon fonctionnement
                du site (panier, session admin). Aucun cookie publicitaire, aucun traceur tiers.
                Nous proposons en option des statistiques anonymes pour améliorer l&apos;expérience.{' '}
                <Link href="/mentions#cookies" className="text-argan-300 hover:text-argan-200 underline decoration-dotted underline-offset-2">
                  En savoir plus
                </Link>
                .
              </p>

              {showDetails && (
                <div className="mt-4 space-y-2">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="mt-1 accent-argan-500 w-4 h-4"
                    />
                    <div>
                      <p className="text-cream font-medium text-sm">Cookies essentiels</p>
                      <p className="text-cream/65 text-xs">
                        Nécessaires au fonctionnement du site (panier, préférences, session admin).
                        Toujours actifs.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="mt-1 accent-argan-500 w-4 h-4"
                    />
                    <div>
                      <p className="text-cream font-medium text-sm">Mesure d&apos;audience anonyme</p>
                      <p className="text-cream/65 text-xs">
                        Statistiques agrégées pour comprendre l&apos;usage du site (sans identification
                        personnelle). Désactivé par défaut.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {!showDetails ? (
                  <>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-argan-500 text-white text-sm font-medium hover:bg-argan-600 shadow-warm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Tout accepter
                    </button>
                    <button
                      type="button"
                      onClick={refuseAll}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full border border-white/15 bg-white/5 text-cream/90 text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Tout refuser
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(true)}
                      className="text-cream/70 hover:text-argan-300 text-sm font-medium transition-colors ml-auto"
                    >
                      Personnaliser
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={saveChoice}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-argan-500 text-white text-sm font-medium hover:bg-argan-600 shadow-warm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Enregistrer mes choix
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(false)}
                      className="text-cream/70 hover:text-argan-300 text-sm font-medium transition-colors ml-auto"
                    >
                      Retour
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
