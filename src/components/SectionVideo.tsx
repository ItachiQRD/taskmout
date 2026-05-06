'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AnimateSection } from '@/components/AnimateSection';

/**
 * Section : texte à gauche, vidéo (sans fond) à droite.
 * Vidéo attendue dans public/assets/video/section1.mp4
 */
const SECTION_VIDEO_SRC = '/assets/video/section1.mp4';

const DEFAULT_TITLE = 'Huile & amlou';

const DESCRIPTION_LINES = [
  'Notre huile d\'argan, pressée à froid et travaillée avec soin au Maroc, est au cœur de chaque flacon.',
  'Elle donne aussi naissance à l\'amlou : cette pâte onctueuse à l\'amande et au miel, née des mêmes terroirs, que nous proposons en tartinable pour le petit-déjeuner ou en idée recette.',
  'Huile et amlou partagent la même exigence — origine tracée, gestes traditionnels, goût authentique.',
];

/** Ornement de coin style marocain (losange / diamant) */
function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 sm:w-6 sm:h-6 text-argan-400/70 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
    </svg>
  );
}

type SectionVideoProps = {
  title?: string;
  description?: string | string[];
  videoSrc?: string;
};

function getDescriptionLines(description: string | string[] | undefined): string[] {
  if (!description) return DESCRIPTION_LINES;
  if (Array.isArray(description)) return description;
  return description.split(/\n\n+/).filter(Boolean);
}

export function SectionVideo({
  title = DEFAULT_TITLE,
  description,
  videoSrc = SECTION_VIDEO_SRC,
}: SectionVideoProps) {
  const lines = getDescriptionLines(description);
  return (
    <section className="min-h-screen flex items-center border-t border-white/10" aria-labelledby="section-video-heading">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <AnimateSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Gauche : bloc texte (titre détaché, paragraphe, CTA) */}
            <div className="section-animate space-y-4">
              <h2
                id="section-video-heading"
                className="font-oriental text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent"
              >
                {title}
              </h2>
              <div className="pt-6 sm:pt-8" />
              <div className="pl-5 border-l-4 border-argan-500/50 space-y-5">
                {lines.map((line, i) => (
                  <p key={i} className="text-cream/85 leading-relaxed text-base sm:text-lg max-w-xl">
                    {line}
                  </p>
                ))}
              </div>
              <div className="pt-12 sm:pt-14">
                <Link
                  href="/savoir-plus"
                  className="btn-cta-discover inline-flex items-center gap-2 rounded-2xl bg-argan-500 px-6 py-3.5 text-cream font-semibold hover:bg-argan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-argan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Découvrir les bienfaits & recettes
                  <ChevronRight className="w-5 h-5" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Droite : cadre ornemental autour de la vidéo (taille agrandie) */}
            <div className="section-animate flex justify-center md:justify-end">
              <div className="relative w-full max-w-[520px] sm:max-w-[580px] md:max-w-[640px]">
                {/* Cadre avec bordures et ornements aux coins */}
                <div
                  className="relative rounded-2xl p-3 sm:p-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(214,139,42,0.15) 0%, transparent 40%, transparent 60%, rgba(109,139,68,0.08) 100%)',
                    border: '1px solid rgba(214,139,42,0.35)',
                    boxShadow: 'inset 0 0 0 1px rgba(250,247,242,0.06), 0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Ornements aux quatre coins */}
                  <span className="absolute top-2 left-2" aria-hidden><CornerOrnament /></span>
                  <span className="absolute top-2 right-2 rotate-90" aria-hidden><CornerOrnament /></span>
                  <span className="absolute bottom-2 right-2 rotate-180" aria-hidden><CornerOrnament /></span>
                  <span className="absolute bottom-2 left-2 -rotate-90" aria-hidden><CornerOrnament /></span>

                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{ background: '#1a1a1a' }}
                  >
                    <video
                      src={videoSrc}
                      className="relative z-0 w-full h-auto max-h-[400px] sm:max-h-[460px] md:max-h-[520px] object-contain"
                      playsInline
                      muted
                      loop
                      autoPlay
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(26,26,26,0.5) 55%, rgba(26,26,26,0.85) 75%, #1a1a1a 100%)',
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateSection>
      </div>
    </section>
  );
}
