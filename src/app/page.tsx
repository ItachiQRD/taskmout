import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Droplets,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Quote,
  Snowflake,
  Truck,
} from 'lucide-react';
import { AnimateSection } from '@/components/AnimateSection';
import { HomeContactSection } from '@/components/HomeContactSection';
import { HomeFeaturedProducts } from '@/components/HomeFeaturedProducts';
import { StarRating } from '@/components/StarRating';

const HOME_IMG = (path: string) => `/assets/images/home/${path}`;

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Sélection au Maroc',
    text:
      "Coopératives partenaires et parcelles identifiées. Nous choisissons amandons, olives et miel à la source pour préserver le caractère du terroir.",
    image: HOME_IMG('process-1-selection.png'),
    alt: "Sélection des amandons d'argan",
  },
  {
    n: '02',
    title: 'Pression à froid',
    text:
      "Les huiles sont extraites à basse température pour préserver leurs arômes, leurs nutriments et leur couleur dorée caractéristique.",
    image: HOME_IMG('process-2-pression.png'),
    alt: "Pression à froid des huiles",
  },
  {
    n: '03',
    title: 'Atelier à Reims',
    text:
      "Conditionnement et préparation de nos amlou et tartinables ici, en France, avec un soin artisanal et de petits lots.",
    image: HOME_IMG('process-3-conditionnement.png'),
    alt: "Préparation de l'amlou en atelier",
  },
  {
    n: '04',
    title: 'Contrôle & dégustation',
    text:
      "Chaque lot est goûté, comparé et validé. Si ça ne nous plaît pas, ça ne sort pas du flacon — c'est aussi simple que ça.",
    image: HOME_IMG('process-4-controle.png'),
    alt: "Contrôle qualité",
  },
];

const ENGAGEMENTS = [
  { icon: Leaf, label: 'Origine traçable' },
  { icon: Droplets, label: 'Pression à froid' },
  { icon: ShieldCheck, label: 'Petits lots contrôlés' },
  { icon: HeartHandshake, label: 'Recettes familiales' },
  { icon: Sparkles, label: 'Sans additifs' },
];

const TEMOIGNAGES = [
  {
    name: 'Sarah M.',
    location: 'Reims',
    initials: 'SM',
    color: 'from-argan-400 to-argan-600',
    text:
      "L'amlou Taskmout est devenu notre rituel du dimanche matin. Onctueux, parfumé, on retrouve vraiment le goût du Maroc à la maison.",
    rating: 5,
  },
  {
    name: 'Karim B.',
    location: 'Paris',
    initials: 'KB',
    color: 'from-olive-400 to-olive-600',
    text:
      "Une huile d'argan culinaire d'une finesse rare. Sur un poisson grillé ou des légumes rôtis, c'est juste exceptionnel.",
    rating: 5,
  },
  {
    name: 'Élise R.',
    location: 'Lyon',
    initials: 'ÉR',
    color: 'from-argan-500 to-olive-500',
    text:
      "J'ai offert un coffret huile + miel + amlou pour un anniversaire — la présentation est superbe et le goût a fait l'unanimité.",
    rating: 5,
  },
];

const PILLARS = [
  { icon: Snowflake, title: 'Pression à froid', text: 'Huiles obtenues à basse température pour préserver arômes et nutriments.' },
  { icon: HeartHandshake, title: 'Artisanal', text: 'Petits lots, gestes manuels et contrôle qualité à chaque étape.' },
  { icon: Leaf, title: 'Ingrédients naturels', text: 'Sélection des terroirs et recettes sans artifices superflus.' },
  { icon: Truck, title: 'Livraison rapide', text: 'Expédition soignée partout en France, colis préparés avec attention.' },
];

export default function HomePage() {
  return (
    <>
      <section className="relative border-b border-maison-brun/10 bg-maison-creme pt-[7.25rem] sm:pt-[7.5rem] pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">
              L&apos;or liquide du Maroc
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5.2vw,3.65rem)] font-semibold leading-[1.08] tracking-tight text-maison-cacao">
              De la noix au flacon.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-maison-cacao/82 sm:text-lg">
              Huiles d&apos;argan et d&apos;olive, amlou et saveurs du terroir — origine sélectionnée, conditionnement avec
              soin à Reims.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StarRating rating={5} reviewCount={230} />
              <span className="text-sm font-medium text-maison-cacao/70">4,9/5 · 230+ avis</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="btn-maison-primary inline-flex !w-auto px-8 sm:px-10"
              >
                Découvrir la collection
              </Link>
              <Link href="/articles" className="btn-maison-outline inline-flex !w-auto bg-white px-8 sm:px-10">
                Nos coffrets
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-maison-brun/10 shadow-maison lg:aspect-[3/4]">
            <Image
              src={HOME_IMG('categorie-huiles.png')}
              alt="Huile d&apos;argan Maison Taskmout"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={95}
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-maison-brun/10 bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:gap-8">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="text-center md:text-left">
                <Icon className="mx-auto md:mx-0 size-8 text-maison-brun/85" aria-hidden strokeWidth={1.25} />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-maison-cacao">
                  {p.title}
                </p>
                <p className="mt-2 text-sm leading-snug text-maison-cacao/70">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <HomeFeaturedProducts />

      {/* La maison Taskmout — split visuel + récit */}
      <section className="relative flex min-h-screen items-center overflow-hidden border-t border-maison-brun/10 bg-maison-sable/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(90,56,37,0.06),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(90,102,80,0.08),_transparent_55%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Visuel — taille intermédiaire (entre l'ancienne version et la version très dominante) */}
              <div className="relative lg:col-span-6">
                <div className="section-animate-item relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 ring-1 ring-inset ring-white/5 sm:aspect-[5/4] lg:aspect-[16/10]">
                  <Image
                    src={HOME_IMG('atelier-taskmout.png')}
                    alt="Atelier Taskmout — gestes artisanaux"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 88vw, (max-width: 1536px) 45vw, 840px"
                    quality={95}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div className="rounded-2xl border border-argan-400/25 bg-[#0d0d0d]/70 backdrop-blur px-4 py-3">
                      <p className="text-xs uppercase tracking-widest text-argan-300">Atelier</p>
                      <p className="font-display text-cream">Reims, France</p>
                    </div>
                  </div>
                </div>

                {/* Vignette secondaire — nettement plus petite que l’image principale */}
                <div className="section-animate-item absolute -bottom-6 -right-3 hidden aspect-square w-32 overflow-hidden rounded-2xl border border-argan-400/30 bg-neutral-950 shadow-[0_24px_56px_-18px_rgba(214,139,42,0.4)] ring-1 ring-inset ring-argan-400/10 sm:block sm:w-40 sm:-bottom-7 sm:-right-5 sm:rounded-3xl md:w-48 lg:w-52 xl:w-56">
                  <Image
                    src={HOME_IMG('process-2-pression.png')}
                    alt="Pression artisanale traditionnelle"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, (max-width: 1536px) 208px, 224px"
                    quality={95}
                  />
                </div>
                {/* Badge décoratif */}
                <div className="section-animate-item hidden lg:flex absolute -top-5 -left-5 items-center gap-2 px-4 py-2 rounded-full border border-argan-400/30 bg-[#0d0d0d]/85 backdrop-blur shadow-warm">
                  <span className="w-2 h-2 rounded-full bg-argan-400 shadow-[0_0_18px_rgba(214,139,42,0.7)] animate-pulse" />
                  <span className="text-cream/90 text-sm font-medium">Du Maroc à votre table</span>
                </div>
              </div>

              {/* Texte */}
              <div className="lg:col-span-6">
                <p className="section-animate text-maison-terre uppercase tracking-[0.25em] text-xs font-semibold">
                  La maison Taskmout
                </p>
                <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-maison-cacao">
                  Un héritage marocain,
                  <br />
                  <span className="text-maison-brun">un savoir-faire artisanal.</span>
                </h2>
                <p className="section-animate mt-6 max-w-2xl text-lg leading-relaxed text-maison-cacao/82">
                  Taskmout est née de la volonté de faire voyager les huiles, les amlou et les recettes
                  familiales du Sud marocain jusqu&apos;à votre table — sans compromis sur l&apos;origine
                  ni sur le goût.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {[
                    {
                      icon: Leaf,
                      title: 'Sélection des terroirs',
                      text: 'Coopératives et parcelles choisies pour la typicité.',
                    },
                    {
                      icon: HeartHandshake,
                      title: 'Recettes familiales',
                      text: 'Amlou et tartinables travaillés en petites séries.',
                    },
                    {
                      icon: ShieldCheck,
                      title: 'Transparence',
                      text: "Origine, saison, production : tout est tracé.",
                    },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.title}
                        className="section-animate-item rounded-sm border border-maison-brun/10 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 sm:p-5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-maison-brun/15 bg-maison-sable/30 text-maison-brun">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3 font-display text-maison-cacao">{p.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-maison-cacao/75">{p.text}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="section-animate-item mt-10 flex flex-wrap gap-3">
                  <Link href="/histoire" className="btn-maison-primary inline-flex !w-auto items-center gap-2 px-8">
                    Notre histoire
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </Link>
                  <Link
                    href="/savoir-plus"
                    className="btn-maison-outline inline-flex !w-auto items-center gap-2 bg-transparent px-8"
                  >
                    Bienfaits &amp; recettes
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-6 md:grid-cols-4">
              {[
                { v: '100%', l: 'Origine Maroc' },
                { v: 'Petits', l: 'Lots artisanaux' },
                { v: 'À froid', l: 'Pression douce' },
                { v: '24/7', l: 'Livraison France' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="section-animate-item rounded-sm border border-maison-brun/10 bg-white p-5 text-center shadow-card"
                >
                  <p className="font-display text-2xl text-maison-cacao sm:text-3xl">{s.v}</p>
                  <p className="mt-1 text-sm text-maison-cacao/70">{s.l}</p>
                </div>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Notre savoir-faire — 4 étapes alternées */}
      <section className="flex min-h-screen items-center border-t border-maison-brun/10 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-animate text-xs font-semibold uppercase tracking-[0.25em] text-maison-terre">
                Notre processus
              </p>
              <h2 className="section-animate mt-3 font-display text-3xl font-semibold tracking-tight text-maison-cacao sm:text-4xl md:text-5xl">
                Notre savoir-faire, étape par étape
              </h2>
              <p className="section-animate mt-4 text-lg leading-relaxed text-maison-cacao/75">
                De l&apos;arbre à votre flacon — quatre gestes essentiels, faits avec soin.
              </p>
            </div>

            <ol className="mt-14 space-y-12 sm:space-y-16">
              {PROCESS_STEPS.map((step, i) => {
                const reversed = i % 2 === 1;
                return (
                  <li
                    key={step.n}
                    className={`section-animate-item grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                      reversed ? 'md:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-maison-brun/15 bg-maison-sable/30 shadow-soft">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                        quality={93}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 font-display text-5xl text-maison-dore/95 drop-shadow-sm sm:text-6xl">
                        {step.n}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-maison-brun/80">Étape {step.n}</p>
                      <h3 className="mt-2 font-display text-2xl text-maison-cacao sm:text-3xl">{step.title}</h3>
                      <p className="mt-4 border-l-4 border-maison-dore/80 pl-5 text-lg leading-relaxed text-maison-cacao/80">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </AnimateSection>
        </div>
      </section>

      {/* Engagements — bandeau */}
      <section className="border-t border-maison-brun/10 bg-maison-olive">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <AnimateSection>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {ENGAGEMENTS.map((e) => {
                const Icon = e.icon;
                return (
                  <div
                    key={e.label}
                    className="section-animate-item inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-maison-creme/95 transition-colors duration-300 hover:bg-white/15"
                  >
                    <Icon className="size-4 text-maison-dore" />
                    {e.label}
                  </div>
                );
              })}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Témoignages */}
      <section className="flex min-h-[80vh] items-center border-t border-maison-brun/10 bg-maison-sable/25">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <AnimateSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-animate text-xs font-semibold uppercase tracking-[0.25em] text-maison-terre">
                Ils en parlent mieux que nous
              </p>
              <h2 className="section-animate mt-3 font-display text-3xl font-semibold tracking-tight text-maison-cacao sm:text-4xl md:text-5xl">
                Ce que nos clients disent
              </h2>
              <p className="section-animate mt-4 text-lg leading-relaxed text-maison-cacao/75">
                Trois retours sincères de personnes qui ont adopté Maison Taskmout au quotidien.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {TEMOIGNAGES.map((t) => (
                <figure
                  key={t.name}
                  className="section-animate-item relative rounded-sm border border-maison-brun/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:p-7"
                >
                  <Quote className="size-6 text-maison-dore/70" aria-hidden />
                  <blockquote className="mt-4 leading-relaxed text-maison-cacao/85">{t.text}</blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-display text-sm font-semibold text-white shadow-warm`}
                      aria-hidden
                    >
                      {t.initials}
                    </div>
                    <figcaption>
                      <p className="font-medium text-maison-cacao">{t.name}</p>
                      <p className="text-sm text-maison-cacao/60">{t.location}</p>
                    </figcaption>
                    <div
                      className="ml-auto flex items-center gap-0.5 text-maison-dore"
                      aria-label={`Note ${t.rating} sur 5`}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="text-sm leading-none">★</span>
                      ))}
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      <HomeContactSection />
    </>
  );
}
