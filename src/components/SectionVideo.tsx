'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AnimateSection } from '@/components/AnimateSection';

const SECTION_VIDEO_SRC = '/assets/video/section1.mp4';

const DEFAULT_TITLE = 'Huile & amlou';

const DESCRIPTION_LINES = [
  'Notre huile d\'argan, pressée à froid et travaillée avec soin au Maroc, est au cœur de chaque flacon.',
  'Elle donne aussi naissance à l\'amlou : cette pâte onctueuse à l\'amande et au miel, née des mêmes terroirs, que nous proposons en tartinable pour le petit-déjeuner ou en idée recette.',
  'Huile et amlou partagent la même exigence — origine tracée, gestes traditionnels, goût authentique.',
];

function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 sm:w-6 sm:h-6 text-maison-dore/70 ${className}`}
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
    <section className="min-h-screen flex items-center border-t border-maison-brun/10 bg-maison-sable/20" aria-labelledby="section-video-heading">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <AnimateSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="section-animate space-y-4">
              <h2
                id="section-video-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-maison-brun"
              >
                {title}
              </h2>
              <div className="pt-6 sm:pt-8" />
              <div className="pl-5 border-l-4 border-maison-dore/50 space-y-5">
                {lines.map((line, i) => (
                  <p key={i} className="text-maison-cacao/80 leading-relaxed text-base sm:text-lg max-w-xl">
                    {line}
                  </p>
                ))}
              </div>
              <div className="pt-12 sm:pt-14">
                <Link
                  href="/savoir-plus"
                  className="btn-maison-primary !w-auto inline-flex items-center gap-2 px-6"
                >
                  Découvrir les bienfaits & recettes
                  <ChevronRight className="w-5 h-5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="section-animate flex justify-center md:justify-end">
              <div className="relative w-full max-w-[520px] sm:max-w-[580px] md:max-w-[640px]">
                <div
                  className="relative rounded-2xl p-3 sm:p-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(90,56,37,0.08) 0%, transparent 40%, transparent 60%, rgba(90,102,80,0.06) 100%)',
                    border: '1px solid rgba(90,56,37,0.18)',
                    boxShadow: 'inset 0 0 0 1px rgba(90,56,37,0.04), 0 8px 32px rgba(90,56,37,0.08)',
                  }}
                >
                  <span className="absolute top-2 left-2" aria-hidden><CornerOrnament /></span>
                  <span className="absolute top-2 right-2 rotate-90" aria-hidden><CornerOrnament /></span>
                  <span className="absolute bottom-2 right-2 rotate-180" aria-hidden><CornerOrnament /></span>
                  <span className="absolute bottom-2 left-2 -rotate-90" aria-hidden><CornerOrnament /></span>

                  <div className="relative rounded-2xl overflow-hidden bg-maison-sable/30">
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
                        background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, rgba(245,241,234,0.3) 55%, rgba(245,241,234,0.6) 75%, rgba(245,241,234,0.85) 100%)',
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
