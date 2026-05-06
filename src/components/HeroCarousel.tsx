'use client';

const INGREDIENTS = [
  'Noisette',
  'Amande',
  'Olive',
  'Huile',
  'Beurre',
  'Amlou',
  'Camomille',
  'Eucalyptus',
  'Curcuma',
  'Henné',
  'Safran',
  'Sellou',
];

export function HeroCarousel() {
  /* Deux copies identiques pour boucle infinie : on anime de -50% à 0 */
  const words = [...INGREDIENTS, ...INGREDIENTS];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/10 bg-[#1a1a1a]/60 backdrop-blur-sm py-4 hero-appear-base hero-appear-bottom"
      style={{ animationDelay: '9s' }}
    >
      <div className="flex w-max animate-hero-carousel-track whitespace-nowrap gap-10 sm:gap-14 font-medium">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="shrink-0 tracking-widest px-1 font-oriental text-base sm:text-lg font-semibold hero-carousel-gradient"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
