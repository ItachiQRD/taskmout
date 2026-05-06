'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene').then((m) => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-argan-100/90 to-cream/80" />
  ),
});

export function HeroSceneClient() {
  return <HeroScene />;
}
