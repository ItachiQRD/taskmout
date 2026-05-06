'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

type AnimateSectionProps = {
  children: ReactNode;
  className?: string;
  /** Délai avant de considérer la section visible (en px au-dessus du viewport) */
  rootMargin?: string;
};

export function AnimateSection({ children, className = '', rootMargin = '0px 0px -8% 0px' }: AnimateSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`section-animate-wrapper ${inView ? 'section-in-view' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
