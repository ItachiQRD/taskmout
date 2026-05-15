import Image from 'next/image';
import { Sparkles, UserRound, Hand, Gem } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const IMG = (path: string) => `/assets/images/savoir-plus/${path}`;

const BIENFAITS = [
  {
    key: 'cheveux',
    title: 'Cheveux',
    icon: Sparkles,
    tip: 'Masque 20–30 min',
    description:
      'Nourrit les pointes et apporte de la brillance. En masque avant shampooing ou en finition sur longueurs humides.',
  },
  {
    key: 'barbe',
    title: 'Barbe',
    icon: UserRound,
    tip: '2 à 3 gouttes',
    description:
      'Hydrate la barbe et la peau du visage. Quelques gouttes suffisent pour assouplir le poil et calmer les irritations.',
  },
  {
    key: 'peau',
    title: 'Peau & massage',
    icon: Hand,
    tip: 'Massage léger',
    description:
      'Absorption rapide sur zones sèches (mains, coudes, pieds). Idéale en massage pour hydrater et détendre.',
  },
  {
    key: 'ongles',
    title: 'Ongles & cuticules',
    icon: Gem,
    tip: 'Chaque soir',
    description:
      'Renforce ongles et cuticules. Un massage court et régulier limite les gerçures et les écailles.',
  },
] as const;

function BienfaitCard({
  title,
  icon: Icon,
  tip,
  description,
}: {
  title: string;
  icon: LucideIcon;
  tip: string;
  description: string;
}) {
  return (
    <article className="group h-full rounded-2xl border border-maison-brun/10 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-maison-sable/40 text-maison-brun transition-colors group-hover:bg-maison-dore/15">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg text-maison-brun">{title}</h3>
            <span className="rounded-full bg-maison-sable/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-maison-cacao/70">
              {tip}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-maison-cacao/75">{description}</p>
        </div>
      </div>
    </article>
  );
}

export function CorpsBienfaitsSection() {
  return (
    <section id="sp-corps" className="py-12 sm:py-20 border-b border-maison-brun/10 bg-maison-sable/15">
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Soins du corps</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
          Bienfaits pour le corps
        </h2>
        <p className="mt-3 text-maison-cacao/75 leading-relaxed">
          L&apos;huile d&apos;argan Taskmout accompagne la peau, les cheveux et la barbe au quotidien — quatre usages
          simples autour d&apos;un même flacon.
        </p>
      </div>

      <div className="hidden lg:block mt-14 max-w-4xl mx-auto px-4">
        <div className="relative mx-auto max-w-[880px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-px w-2/3 bg-gradient-to-r from-transparent via-maison-dore/30 to-transparent" />
            <div className="absolute w-px h-2/3 bg-gradient-to-b from-transparent via-maison-dore/30 to-transparent" />
          </div>

          <div className="relative grid grid-cols-3 grid-rows-3 gap-5">
            <div className="col-start-2 row-start-1">
              <BienfaitCard {...BIENFAITS[0]} />
            </div>
            <div className="col-start-1 row-start-2">
              <BienfaitCard {...BIENFAITS[1]} />
            </div>
            <div className="col-start-2 row-start-2 flex flex-col items-center justify-center py-2">
              <div className="relative w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden ring-2 ring-maison-dore/50 shadow-warm">
                <Image
                  src={IMG('huile-miracle-soins-cheveux.png')}
                  alt="Huile Miracle Taskmout — soins du corps"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-maison-dore/15 via-transparent to-maison-olive/10 pointer-events-none" />
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-maison-brun/80">
                Huile Miracle
              </p>
            </div>
            <div className="col-start-3 row-start-2">
              <BienfaitCard {...BIENFAITS[2]} />
            </div>
            <div className="col-start-2 row-start-3">
              <BienfaitCard {...BIENFAITS[3]} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-10 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-maison-dore/50 shadow-warm">
            <Image
              src={IMG('huile-miracle-soins-cheveux.png')}
              alt="Huile Miracle Taskmout"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </div>
        {BIENFAITS.map((b) => (
          <BienfaitCard key={b.key} title={b.title} icon={b.icon} tip={b.tip} description={b.description} />
        ))}
      </div>
    </section>
  );
}
