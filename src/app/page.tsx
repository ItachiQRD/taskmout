import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  Leaf,
  Droplets,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Quote,
  Snowflake,
  Truck,
} from 'lucide-react';
import { HeroVideo } from '@/components/HeroVideo';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SectionVideo } from '@/components/SectionVideo';
import { AnimateSection } from '@/components/AnimateSection';
import { HomeContactSection } from '@/components/HomeContactSection';
import { HomeFeaturedProducts } from '@/components/HomeFeaturedProducts';

const HOME_IMG = (path: string) => `/assets/images/home/${path}`;

const CATEGORIES = [
  {
    title: 'Huiles',
    description: "Argan, olive et autres trésors pressés à froid.",
    image: HOME_IMG('categorie-huiles.png'),
    href: '/articles',
  },
  {
    title: 'Amlou',
    description: "Pâte onctueuse amande, argan et miel — recette familiale.",
    image: HOME_IMG('categorie-amlou.png'),
    href: '/articles',
  },
  {
    title: 'Miel',
    description: "Miel de terroir, pour la cuisine ou le petit-déjeuner.",
    image: HOME_IMG('categorie-miel.png'),
    href: '/articles',
  },
  {
    title: 'Coffrets',
    description: "Coffrets cadeaux à composer pour offrir le Maroc.",
    image: HOME_IMG('categorie-coffrets.png'),
    href: '/articles',
  },
];

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Sélection au Maroc',
    text: "Coopératives partenaires et parcelles identifiées. Nous choisissons amandons, olives et miel à la source pour préserver le caractère du terroir.",
    image: HOME_IMG('process-1-selection.png'),
    alt: "Sélection des amandons d'argan",
  },
  {
    n: '02',
    title: 'Pression à froid',
    text: "Les huiles sont extraites à basse température pour préserver leurs arômes, leurs nutriments et leur couleur dorée caractéristique.",
    image: HOME_IMG('process-2-pression.png'),
    alt: "Pression à froid des huiles",
  },
  {
    n: '03',
    title: 'Atelier à Reims',
    text: "Conditionnement et préparation de nos amlou et tartinables ici, en France, avec un soin artisanal et de petits lots.",
    image: HOME_IMG('process-3-conditionnement.png'),
    alt: "Préparation de l'amlou en atelier",
  },
  {
    n: '04',
    title: 'Contrôle & dégustation',
    text: "Chaque lot est goûté, comparé et validé. Si ça ne nous plaît pas, ça ne sort pas du flacon — c'est aussi simple que ça.",
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
    text: "L'amlou Taskmout est devenu notre rituel du dimanche matin. Onctueux, parfumé, on retrouve vraiment le goût du Maroc à la maison.",
    rating: 5,
  },
  {
    name: 'Karim B.',
    location: 'Paris',
    initials: 'KB',
    color: 'from-olive-400 to-olive-600',
    text: "Une huile d'argan culinaire d'une finesse rare. Sur un poisson grillé ou des légumes rôtis, c'est juste exceptionnel.",
    rating: 5,
  },
  {
    name: 'Élise R.',
    location: 'Lyon',
    initials: 'ÉR',
    color: 'from-argan-500 to-olive-500',
    text: "J'ai offert un coffret huile + miel + amlou pour un anniversaire — la présentation est superbe et le goût a fait l'unanimité.",
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
      {/* ══════════ HERO VIDÉO ══════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pb-20">
        <HeroVideo />
        <div className="relative z-10 flex flex-col flex-1 w-full">
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-oriental font-bold text-cream tracking-tight hero-text-shadow hero-appear-base hero-appear-title"
                style={{ animationDelay: '5s' }}
              >
                Taskmout
              </h1>
              <p
                className="mt-3 text-cream/90 text-sm sm:text-base max-w-md mx-auto font-oriental hero-text-shadow hero-appear-base hero-appear-subtitle"
                style={{ animationDelay: '7s' }}
              >
                L&apos;or liquide du Maroc, de la noix au flacon.
              </p>
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center pb-6 hero-appear-base hero-appear-bottom"
            style={{ animationDelay: '9s' }}
          >
            <Link href="/articles" className="btn-primary text-sm px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center gap-2">
              Voir la gamme
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn-outline text-sm px-5 py-2.5 min-h-[44px] border-cream/70 text-cream hover:bg-white/15 inline-flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" aria-hidden />
              Écrivez-nous
            </Link>
          </div>
        </div>
        <HeroCarousel />
      </section>

      {/* ══════════ PILIERS ══════════ */}
      <section className="border-b border-maison-brun/10 bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:gap-8">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="text-center md:text-left">
                <Icon className="mx-auto md:mx-0 size-8 text-maison-brun/85" aria-hidden strokeWidth={1.25} />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-maison-cacao">{p.title}</p>
                <p className="mt-2 text-sm leading-snug text-maison-cacao/70">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ SECTION VIDÉO : huile & amlou ══════════ */}
      <SectionVideo />

      {/* ══════════ NOS INCONTOURNABLES ══════════ */}
      <HomeFeaturedProducts />

      {/* ══════════ LA MAISON TASKMOUT ══════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden border-t border-maison-brun/10 bg-maison-sable/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(90,56,37,0.06),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(90,102,80,0.08),_transparent_55%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="relative lg:col-span-6">
                <div className="section-animate-item relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-maison-brun/15 bg-maison-sable/30 shadow-soft sm:aspect-[5/4] lg:aspect-[16/10]">
                  <Image
                    src={HOME_IMG('atelier-taskmout.png')}
                    alt="Atelier Taskmout — gestes artisanaux"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 88vw, 45vw"
                    quality={95}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div className="rounded-sm border border-maison-brun/25 bg-white/85 backdrop-blur px-4 py-3">
                      <p className="text-[10px] uppercase tracking-widest text-maison-terre">Atelier</p>
                      <p className="font-display text-maison-cacao">Reims, France</p>
                    </div>
                  </div>
                </div>

                <div className="section-animate-item absolute -bottom-6 -right-3 hidden aspect-square w-32 overflow-hidden rounded-sm border border-maison-brun/15 bg-maison-sable/30 shadow-maison sm:block sm:w-40 sm:-bottom-7 sm:-right-5 md:w-48 lg:w-52 xl:w-56">
                  <Image
                    src={HOME_IMG('process-2-pression.png')}
                    alt="Pression artisanale traditionnelle"
                    fill
                    className="object-cover object-center"
                    sizes="224px"
                    quality={95}
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="section-animate text-maison-terre uppercase tracking-[0.25em] text-xs font-semibold">
                  Un héritage marocain
                </p>
                <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-maison-cacao">
                  Plus qu&apos;un produit,
                  <br />
                  <span className="text-maison-brun">un savoir-faire transmis.</span>
                </h2>
                <p className="section-animate mt-6 max-w-2xl text-lg leading-relaxed text-maison-cacao/82">
                  Chez Maison Taskmout, nous célébrons l&apos;héritage culinaire marocain à travers des
                  produits d&apos;exception, élaborés avec passion et exigence.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {[
                    { icon: Leaf, title: 'Sélection à la main', text: 'Des noix rigoureusement sélectionnées.' },
                    { icon: HeartHandshake, title: 'Recettes authentiques', text: 'Des saveurs traditionnelles revisitées avec élégance.' },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.title}
                        className="section-animate-item flex items-start gap-4 rounded-sm border border-maison-brun/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-maison-brun/15 bg-maison-sable/30 text-maison-brun">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-display text-maison-cacao">{p.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-maison-cacao/75">{p.text}</p>
                          <ArrowRight className="mt-2 size-4 text-maison-brun/50" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="section-animate-item mt-10 flex flex-wrap gap-3">
                  <Link href="/histoire" className="btn-maison-primary inline-flex !w-auto items-center gap-2 px-8">
                    Découvrir notre histoire
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-6 md:grid-cols-4">
              {[
                { v: '100%', l: 'Origine Maroc' },
                { v: 'Petits', l: 'Lots artisanaux' },
                { v: 'À froid', l: 'Pression douce' },
                { v: '24/7', l: 'Livraison France' },
              ].map((s) => (
                <div key={s.l} className="section-animate-item rounded-sm border border-maison-brun/10 bg-white p-5 text-center shadow-card">
                  <p className="font-display text-2xl text-maison-cacao sm:text-3xl">{s.v}</p>
                  <p className="mt-1 text-sm text-maison-cacao/70">{s.l}</p>
                </div>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* ══════════ CATÉGORIES PHARES ══════════ */}
      <section className="flex min-h-screen items-center border-t border-maison-brun/10 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Notre gamme</p>
                <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-maison-cacao tracking-tight">
                  Les essentiels Taskmout
                </h2>
                <p className="section-animate mt-4 text-maison-cacao/75 text-lg leading-relaxed">
                  Quatre familles de produits qui résument tout notre savoir-faire — à découvrir, à goûter, à partager.
                </p>
              </div>
              <Link href="/articles" className="section-animate-item inline-flex items-center gap-2 text-maison-brun hover:text-maison-cacao font-medium text-sm uppercase tracking-wide">
                Voir toute la gamme <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="section-animate-item group relative overflow-hidden rounded-sm border border-maison-brun/10 bg-maison-sable/20 transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-1 hover:shadow-maison"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-display text-xl sm:text-2xl text-white">{c.title}</h3>
                    <p className="mt-1 text-white/80 text-sm leading-relaxed line-clamp-2">{c.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-white/70 text-sm font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Découvrir <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* ══════════ SAVOIR-FAIRE ══════════ */}
      <section className="flex min-h-screen items-center border-t border-maison-brun/10 bg-maison-creme">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-animate text-xs font-semibold uppercase tracking-[0.25em] text-maison-terre">Notre processus</p>
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
                        sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* ══════════ ENGAGEMENTS ══════════ */}
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

      {/* ══════════ TÉMOIGNAGES ══════════ */}
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
                    <div className="ml-auto flex items-center gap-0.5 text-maison-dore" aria-label={`Note ${t.rating} sur 5`}>
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
