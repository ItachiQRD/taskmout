'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

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
  const [desktopDetailsOpen, setDesktopDetailsOpen] = useState(false);

  const goPrev = () => {
    setCurrent((i) => (i === 0 ? recettes.length - 1 : i - 1));
    setShowMobileDetails(false);
    setDesktopDetailsOpen(false);
  };
  const goNext = () => {
    setCurrent((i) => (i === recettes.length - 1 ? 0 : i + 1));
    setShowMobileDetails(false);
    setDesktopDetailsOpen(false);
  };

  const r = recettes[current];

  return (
    <div className="w-full">
      {/* Carousel image + navigation */}
      <div className="relative rounded-2xl overflow-hidden border border-maison-brun/10 bg-maison-sable/20 touch-pan-y shadow-soft">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[320px] sm:max-h-[420px] md:max-h-[520px]">
          {recettes.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-300 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, min(1200px, 90vw)"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-maison-cacao flex items-center justify-center transition-colors shadow-sm md:w-10 md:h-10"
          aria-label="Recette précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-maison-cacao flex items-center justify-center transition-colors shadow-sm md:w-10 md:h-10"
          aria-label="Recette suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom title bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/40 to-transparent pt-10 pb-4 px-4 sm:px-6 pointer-events-none">
          <h3 className="font-display text-base sm:text-lg font-semibold text-white drop-shadow-sm">
            {r.title}
          </h3>
          <p className="mt-1 text-white/85 text-sm line-clamp-2 drop-shadow-sm">
            {r.description}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-4">
        {recettes.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrent(i);
              setShowMobileDetails(false);
              setDesktopDetailsOpen(false);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-maison-brun scale-110' : 'bg-maison-brun/20 hover:bg-maison-brun/45'
            }`}
            aria-label={`Voir recette ${i + 1}`}
          />
        ))}
      </div>

      {/* Details card — below the carousel, always readable */}
      <div className="mt-4">
        {/* Desktop: toggle button */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => setDesktopDetailsOpen((v) => !v)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-maison-brun/15 bg-white px-4 py-3 text-sm font-medium text-maison-cacao hover:bg-maison-sable/30 transition-colors shadow-card"
            aria-expanded={desktopDetailsOpen}
          >
            <BookOpen className="size-4 text-maison-brun" aria-hidden />
            {desktopDetailsOpen ? 'Masquer la recette' : `Voir la recette : ${r.title}`}
          </button>
          {desktopDetailsOpen && (
            <div className="mt-3 rounded-2xl border border-maison-brun/10 bg-white p-6 shadow-card">
              <h4 className="font-display text-lg text-maison-brun">{r.title}</h4>
              <p className="mt-3 text-sm text-maison-cacao/80 leading-relaxed whitespace-pre-line">
                {r.detailsDesktop ?? r.description}
              </p>
            </div>
          )}
        </div>

        {/* Mobile: toggle button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setShowMobileDetails((v) => !v)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-maison-brun/15 bg-white px-4 py-3 text-sm font-medium text-maison-cacao/90 hover:bg-maison-sable/30 transition-colors shadow-card"
            aria-expanded={showMobileDetails}
          >
            <BookOpen className="size-4 text-maison-brun" aria-hidden />
            {showMobileDetails ? 'Masquer les détails' : 'Voir les détails de la recette'}
          </button>
          {showMobileDetails && (
            <div className="mt-3 rounded-2xl border border-maison-brun/10 bg-white p-4 shadow-card">
              <h4 className="font-display text-base text-maison-brun">{r.title}</h4>
              <p className="mt-2 text-sm text-maison-cacao/80 leading-relaxed whitespace-pre-line">
                {r.detailsDesktop ?? r.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
