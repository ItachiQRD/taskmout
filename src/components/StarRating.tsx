'use client';

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
};

export function StarRating({ rating, reviewCount, size = 'sm' }: StarRatingProps) {
  const stars = Math.round(Math.min(5, Math.max(0, rating)));
  const cls = size === 'md' ? 'text-base' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-1 ${cls}`}>
      <span className="inline-flex gap-px text-maison-dore" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < stars ? '' : 'opacity-25'}>
            ★
          </span>
        ))}
      </span>
      {reviewCount !== undefined && (
        <span className="text-maison-cacao/55 text-xs">({reviewCount} avis)</span>
      )}
    </span>
  );
}
