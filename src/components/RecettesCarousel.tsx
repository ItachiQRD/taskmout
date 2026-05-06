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

  const goPrev = () => setCurrent((i) => (i === 0 ? recettes.length - 1 : i - 1));
  const goNext = () => setCurrent((i) => (i === recettes.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full">
      {/* Diaporama horizontal : une slide à la fois, image affichée en entier (object-contain) */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
        {/* Zone image plus grande sur desktop, image entière sans crop */}
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
              {/* Rideau au survol : descend du haut — version courte mobile, détaillée desktop */}
              <div
                className="absolute inset-x-0 top-0 h-0 bg-[#1a1a1a]/95 backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden group-hover:h-full flex flex-col"
                aria-hidden
              >
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0 overflow-y-auto">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-cream shrink-0">
                    {r.title}
                  </h3>
                  {/* Mobile : courte description */}
                  <p className="mt-2 text-cream/80 text-sm leading-relaxed md:hidden line-clamp-4">
                    {r.description}
                  </p>
                  {/* Desktop : détails complets pour remplir le voile (ingrédients, étapes, conseils) */}
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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-cream flex items-center justify-center transition-colors"
          aria-label="Recette précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-cream flex items-center justify-center transition-colors"
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
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? 'bg-argan-400' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Voir recette ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
