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
      <div className="mx-auto max-w-4xl rounded-sm border border-maison-brun/15 bg-maison-creme shadow-[0_30px_80px_-20px_rgba(27,23,20,0.35)]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-maison-brun/20 bg-maison-sable/40 text-maison-brun">
              <Cookie className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg text-maison-cacao sm:text-xl">
                Vos cookies, vos choix
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-maison-cacao/75">
                Nous utilisons uniquement des cookies strictement nécessaires au bon fonctionnement
                du site (panier, session admin). Aucun cookie publicitaire, aucun traceur tiers.
                Nous proposons en option des statistiques anonymes pour améliorer l&apos;expérience.{' '}
                <Link
                  href="/mentions#cookies"
                  className="font-medium text-maison-brun underline decoration-dotted underline-offset-2 hover:text-maison-cacao"
                >
                  En savoir plus
                </Link>
                .
              </p>

              {showDetails && (
                <div className="mt-4 space-y-2">
                  <label className="flex items-start gap-3 rounded-sm border border-maison-brun/15 bg-maison-sable/30 p-3">
                    <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-maison-brun" />
                    <div>
                      <p className="text-sm font-medium text-maison-cacao">Cookies essentiels</p>
                      <p className="text-xs text-maison-cacao/65">
                        Nécessaires au fonctionnement du site (panier, préférences, session admin).
                        Toujours actifs.
                      </p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-maison-brun/15 bg-maison-sable/30 p-3">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-maison-brun"
                    />
                    <div>
                      <p className="text-sm font-medium text-maison-cacao">Mesure d&apos;audience anonyme</p>
                      <p className="text-xs text-maison-cacao/65">
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
                      className="btn-maison-primary !w-auto min-h-[40px] px-4 text-sm"
                    >
                      <Check className="h-3.5 w-3.5" /> Tout accepter
                    </button>
                    <button
                      type="button"
                      onClick={refuseAll}
                      className="btn-maison-outline !w-auto min-h-[40px] px-4 text-sm"
                    >
                      <X className="h-3.5 w-3.5" /> Tout refuser
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(true)}
                      className="ml-auto text-sm font-medium text-maison-cacao/70 underline-offset-4 hover:text-maison-brun"
                    >
                      Personnaliser
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={saveChoice}
                      className="btn-maison-primary !w-auto min-h-[40px] px-4 text-sm"
                    >
                      <Check className="h-3.5 w-3.5" /> Enregistrer mes choix
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(false)}
                      className="ml-auto text-sm font-medium text-maison-cacao/70 underline-offset-4 hover:text-maison-brun"
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
