'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;
const FPS = 36;
const PRELOAD_AHEAD = 15;

function getImageSrc(index: number, folder: string, ext: string): string {
  const num = Math.max(0, Math.min(index, TOTAL_FRAMES - 1));
  const name = String(num).padStart(3, '0');
  return `${folder}/${name}${ext}`;
}

type ScrollImageSequenceProps = {
  imageFolder?: string;
  imageExt?: string;
  title?: string;
  message?: string;
  description?: string;
  buttonLabel?: string;
  /** Texte qui défile par-dessus pendant l'animation (ex: "Savoir-faire • Huile d'argan • Du Maroc à votre table") */
  scrollingText?: string;
};

export function ScrollImageSequence({
  imageFolder = '/assets/images/sequence',
  imageExt = '.png',
  title = 'Notre savoir-faire',
  message,
  description,
  buttonLabel = 'Lancer l\'animation',
  scrollingText = "Savoir-faire • Huile d'argan • Du Maroc à votre table • ",
}: ScrollImageSequenceProps) {
  const displayMessage = message ?? description ?? 'Découvrez en images le chemin de la noix au flacon.';
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'idle' | 'paused' | 'playing' | 'done'>('idle');
  const [frameIndex, setFrameIndex] = useState(0);
  const [slotSrcs, setSlotSrcs] = useState<[string, string]>(() => {
    const s = getImageSrc(0, imageFolder, imageExt);
    return [s, s];
  });
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const loadedRef = useRef<Set<number>>(new Set());

  const preload = useCallback(
    (index: number) => {
      if (loadedRef.current.has(index)) return true;
      loadedRef.current.add(index);
      const img = new window.Image();
      img.src = getImageSrc(index, imageFolder, imageExt);
      return false;
    },
    [imageFolder, imageExt]
  );

  const preloadRange = useCallback(
    (from: number, to: number) => {
      for (let i = from; i <= to; i++) {
        if (i >= 0 && i < TOTAL_FRAMES) preload(i);
      }
    },
    [preload]
  );

  useEffect(() => {
    preloadRange(0, PRELOAD_AHEAD - 1);
  }, [preloadRange]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e?.isIntersecting) return;
        if (phase !== 'idle') return;
        setPhase('paused');
        document.body.style.overflow = 'hidden';
      },
      { threshold: 0.8, rootMargin: '0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [phase]);

  const startAnimation = useCallback(() => {
    setPhase('playing');
    preloadRange(0, Math.min(TOTAL_FRAMES - 1, PRELOAD_AHEAD * 2));
    const initialSrc = getImageSrc(0, imageFolder, imageExt);
    setSlotSrcs([initialSrc, initialSrc]);
    setFrameIndex(0);

    let current = 0;
    const interval = 1000 / FPS;

    intervalRef.current = setInterval(() => {
      current += 1;
      preloadRange(current, current + PRELOAD_AHEAD);

      const src = getImageSrc(current, imageFolder, imageExt);
      setSlotSrcs((prev) => {
        const next: [string, string] = [...prev];
        next[current % 2] = src;
        return next;
      });
      setFrameIndex(current);

      if (current >= TOTAL_FRAMES - 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase('done');
        document.body.style.overflow = '';
        const section = sectionRef.current;
        if (section) {
          window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: 'smooth' });
        }
      }
    }, interval);
  }, [preloadRange, imageFolder, imageExt]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  const showOverlay = phase === 'paused' || phase === 'playing';
  const [srcA, srcB] = slotSrcs;
  const visibleSlot = frameIndex % 2;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full"
        aria-label="Savoir-faire"
      />

      {showOverlay && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/30"
          aria-modal
          role="dialog"
          aria-label="Animation savoir-faire"
        >
          {/* Double buffer : deux calques pour éviter les flashs blancs */}
          <div className="absolute inset-0 overflow-hidden bg-ink">
            <img
              src={srcA}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover ${
                visibleSlot === 0 ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              draggable={false}
            />
            <img
              src={srcB}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover ${
                visibleSlot === 1 ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              draggable={false}
            />
          </div>

          {/* Texte qui défile par-dessus pendant l'animation */}
          {phase === 'playing' && (
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="w-full overflow-hidden py-4">
                <div
                  className="flex whitespace-nowrap text-cream/90 font-display text-2xl sm:text-3xl md:text-4xl tracking-wide animate-scroll-text"
                  style={{
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="inline-block pr-8">{scrollingText.repeat(4)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Message : visible en pause, disparaît en lecture */}
          <div
            className={`relative z-20 mx-4 max-w-lg rounded-2xl bg-ink/80 px-8 py-10 text-center text-cream shadow-xl backdrop-blur-sm transition-opacity duration-500 ${
              phase === 'playing' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
            <p className="mt-3 text-cream/90">{displayMessage}</p>
            <button
              type="button"
              onClick={startAnimation}
              className="btn-primary mt-6 bg-argan-500 text-white hover:bg-argan-600"
            >
              {buttonLabel}
            </button>
          </div>

          {phase === 'playing' && (
            <p className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink/50 px-4 py-2 text-sm text-cream/90 backdrop-blur-sm">
              {frameIndex + 1} / {TOTAL_FRAMES}
            </p>
          )}
        </div>
      )}
    </>
  );
}
