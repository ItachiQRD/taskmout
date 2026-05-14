'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type RecetteSlide = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
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
      <div className="relative rounded-sm overflow-hidden border border-maison-brun/10 bg-maison-sable/20 touch-pan-y shadow-soft">
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
              <div
                className="absolute inset-x-0 top-0 hidden h-0 bg-maison-cacao/92 backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden group-hover:h-full md:flex flex-col"
                aria-hidden
              >
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0 overflow-y-auto">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-maison-creme shrink-0">
                    {r.title}
                  </h3>
                  <p className="mt-2 md:mt-3 text-maison-creme/85 text-sm leading-relaxed hidden md:block whitespace-pre-line">
                    {r.detailsDesktop ?? r.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 hover:bg-white/90 text-maison-cacao flex items-center justify-center transition-colors shadow-sm md:w-10 md:h-10"
          aria-label="Recette précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 hover:bg-white/90 text-maison-cacao flex items-center justify-center transition-colors shadow-sm md:w-10 md:h-10"
          aria-label="Recette suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-4 px-4 sm:px-6 pointer-events-none">
          <h3 className="font-display text-base sm:text-lg font-semibold text-white">
            {recettes[current].title}
          </h3>
          <p className="mt-1 text-white/80 text-sm line-clamp-2">
            {recettes[current].description}
          </p>
        </div>
      </div>

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
              i === current ? 'bg-maison-brun' : 'bg-maison-brun/25 hover:bg-maison-brun/50'
            }`}
            aria-label={`Voir recette ${i + 1}`}
          />
        ))}
      </div>

      <div className="mt-3 md:hidden">
        <button
          type="button"
          onClick={() => setShowMobileDetails((v) => !v)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-maison-brun/15 bg-white px-4 py-2.5 text-sm font-medium text-maison-cacao/90 hover:bg-maison-sable/30 transition-colors"
          aria-expanded={showMobileDetails}
        >
          {showMobileDetails ? 'Masquer les détails' : 'Voir les détails de la recette'}
        </button>
        {showMobileDetails && (
          <div className="mt-3 rounded-sm border border-maison-brun/10 bg-white p-4 shadow-card">
            <h4 className="font-display text-base text-maison-cacao">{recettes[current].title}</h4>
            <p className="mt-2 text-sm text-maison-cacao/80 leading-relaxed whitespace-pre-line">
              {recettes[current].detailsDesktop ?? recettes[current].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
