'use client';

/**
 * Hero avec vidéo en fond.
 * Fichier : public/assets/video/hero.mp4
 */
const HERO_VIDEO_SRC = '/assets/video/hero.mp4';

export function HeroVideo() {
  return (
    <div className="absolute inset-0 -z-10 min-w-full min-h-full bg-gradient-to-b from-argan-100/90 to-cream/80">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      {/* Overlay léger pour que la vidéo reste visible */}
      <div className="absolute inset-0 bg-ink/15" aria-hidden />
    </div>
  );
}
