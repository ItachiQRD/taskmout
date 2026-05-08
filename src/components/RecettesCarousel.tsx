'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type RecetteSlide = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  /** Contenu détaillé pour le voile au survol (desktop uniquement) */
  detailsDesktop?: string;
};

type RecettesCarouselProps = {
  recettes: RecetteSlide[];
};

export function RecettesCarousel({ recettes }: RecettesCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const goPrev = () => {
    setCurrent((i) => (i === 0 ? recettes.length - 1 : i - 1));
    setShowMobileDetails(false);
  };
  const goNext = () => {
    setCurrent((i) => (i === recettes.length - 1 ? 0 : i + 1));
    setShowMobileDetails(false);
  };

  return (
    <div className="w-full">
      {/* Diaporama horizontal : une slide à la fois */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] touch-pan-y">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[320px] sm:max-h-[420px] md:max-h-[520px]">
          {recettes.map((r, i) => (
            <div
              key={i}
              className={`group absolute inset-0 transition-opacity duration-300 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <Image
                src={r.image}
                alt={r.imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, min(1200px, 90vw)"
              />
              {/* Rideau au survol : desktop uniquement */}
              <div
                className="absolute inset-x-0 top-0 hidden h-0 bg-[#1a1a1a]/95 backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden group-hover:h-full md:flex flex-col"
                aria-hidden
              >
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0 overflow-y-auto">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-cream shrink-0">
                    {r.title}
                  </h3>
                  <p className="mt-2 md:mt-3 text-cream/85 text-sm leading-relaxed hidden md:block whitespace-pre-line">
                    {r.detailsDesktop ?? r.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boutons prev/next */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/55 hover:bg-black/75 text-cream flex items-center justify-center transition-colors md:w-10 md:h-10"
          aria-label="Recette précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/55 hover:bg-black/75 text-cream flex items-center justify-center transition-colors md:w-10 md:h-10"
          aria-label="Recette suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bandeau texte en bas (toujours visible, complément au rideau au survol) */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-4 px-4 sm:px-6 pointer-events-none">
          <h3 className="font-display text-base sm:text-lg font-semibold text-cream">
            {recettes[current].title}
          </h3>
          <p className="mt-1 text-cream/80 text-sm line-clamp-2">
            {recettes[current].description}
          </p>
        </div>
      </div>

      {/* Points de navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {recettes.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrent(i);
              setShowMobileDetails(false);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? 'bg-argan-400' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Voir recette ${i + 1}`}
          />
        ))}
      </div>

      {/* Détails mobile au tap (remplace l'effet hover desktop) */}
      <div className="mt-3 md:hidden">
        <button
          type="button"
          onClick={() => setShowMobileDetails((v) => !v)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-cream/90 hover:bg-white/[0.08] transition-colors"
          aria-expanded={showMobileDetails}
        >
          {showMobileDetails ? 'Masquer les détails' : 'Voir les détails de la recette'}
        </button>
        {showMobileDetails && (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <h4 className="font-display text-base text-cream">{recettes[current].title}</h4>
            <p className="mt-2 text-sm text-cream/80 leading-relaxed whitespace-pre-line">
              {recettes[current].detailsDesktop ?? recettes[current].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
