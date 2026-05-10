'use client';

/** Affichage décoratif type charte (pas de micro-données avis réels). */
export function StarRating({
  rating = 5,
  reviewCount,
  className = '',
}: {
  rating?: number;
  reviewCount: number;
  className?: string;
}) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`size-4 ${i < full ? 'text-maison-dore' : 'text-maison-sable/55'}`}
            fill="currentColor"
          >
            <path d="M10 1.5l2.63 5.32 5.87.85-4.25 4.14 1 5.84L10 14.9l-5.25 2.76 1-5.84-4.25-4.14 5.87-.85L10 1.5z" />
          </svg>
        ))}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-maison-cacao/70">
        ({reviewCount}&nbsp;avis)
      </span>
    </div>
  );
}
