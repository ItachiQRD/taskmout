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
} from 'lucide-react';
import { HeroVideo } from '@/components/HeroVideo';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SectionVideo } from '@/components/SectionVideo';
import { AnimateSection } from '@/components/AnimateSection';
import { HomeContactSection } from '@/components/HomeContactSection';

const HOME_IMG = (path: string) => `/assets/images/home/${path}`;

const CATEGORIES = [
  {
    title: 'Huiles',
    description: "Argan, olive et autres trésors pressés à froid.",
    image: HOME_IMG('categorie-huiles.png'),
    href: '/articles',
    accent: 'from-argan-500/30 to-transparent',
  },
  {
    title: 'Amlou',
    description: "Pâte onctueuse amande, argan et miel — recette familiale.",
    image: HOME_IMG('categorie-amlou.png'),
    href: '/articles',
    accent: 'from-argan-400/30 to-transparent',
  },
  {
    title: 'Miel',
    description: "Miel de terroir, pour la cuisine ou le petit-déjeuner.",
    image: HOME_IMG('categorie-miel.png'),
    href: '/articles',
    accent: 'from-amber-400/25 to-transparent',
  },
  {
    title: 'Coffrets',
    description: "Coffrets cadeaux à composer pour offrir le Maroc.",
    image: HOME_IMG('categorie-coffrets.png'),
    href: '/articles',
    accent: 'from-olive-400/25 to-transparent',
  },
];

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

export default function HomePage() {
  return (
    <>
      {/* Hero avec vidéo — titre centré, boutons juste au-dessus du carousel */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pb-20">
        <HeroVideo />
        <div className="relative z-10 flex flex-col flex-1 w-full">
          {/* Titre et sous-titre centrés — ombre autour des lettres (pas de pavé) */}
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
                L'or liquide du Maroc, de la noix au flacon.
              </p>
            </div>
          </div>
          {/* Boutons juste au-dessus du carousel */}
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

      {/* Section : description huile à gauche, vidéo (sans fond) à droite */}
      <SectionVideo />

      {/* La maison Taskmout — split visuel + récit */}
      <section className="min-h-screen flex items-center border-t border-white/10 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(214,139,42,0.10),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(140,160,60,0.08),_transparent_55%)]"
        />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Visuel — collage à gauche */}
              <div className="lg:col-span-5 relative">
                <div className="section-animate-item relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                  <Image
                    src={HOME_IMG('atelier-taskmout.png')}
                    alt="Atelier Taskmout — gestes artisanaux"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div className="rounded-2xl border border-argan-400/25 bg-[#0d0d0d]/70 backdrop-blur px-4 py-3">
                      <p className="text-xs uppercase tracking-widest text-argan-300">Atelier</p>
                      <p className="font-display text-cream">Reims, France</p>
                    </div>
                  </div>
                </div>

                {/* Vignette flottante */}
                <div className="section-animate-item hidden sm:block absolute -bottom-8 -right-6 w-44 aspect-square rounded-3xl overflow-hidden border border-argan-400/30 shadow-[0_30px_80px_-20px_rgba(214,139,42,0.45)] bg-white/5">
                  <Image
                    src={HOME_IMG('process-2-pression.png')}
                    alt="Pression artisanale traditionnelle"
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                {/* Badge décoratif */}
                <div className="section-animate-item hidden lg:flex absolute -top-5 -left-5 items-center gap-2 px-4 py-2 rounded-full border border-argan-400/30 bg-[#0d0d0d]/85 backdrop-blur shadow-warm">
                  <span className="w-2 h-2 rounded-full bg-argan-400 shadow-[0_0_18px_rgba(214,139,42,0.7)] animate-pulse" />
                  <span className="text-cream/90 text-sm font-medium">Du Maroc à votre table</span>
                </div>
              </div>

              {/* Texte */}
              <div className="lg:col-span-7">
                <p className="section-animate text-argan-300 uppercase tracking-[0.25em] text-xs font-semibold">
                  La maison Taskmout
                </p>
                <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream tracking-tight leading-tight">
                  Un héritage marocain,
                  <br />
                  <span className="bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent">
                    un savoir-faire artisanal.
                  </span>
                </h2>
                <p className="section-animate mt-6 text-cream/80 text-lg leading-relaxed max-w-2xl">
                  Taskmout est née de la volonté de faire voyager les huiles, les amlou et les recettes
                  familiales du Sud marocain jusqu&apos;à votre table — sans compromis sur l&apos;origine
                  ni sur le goût.
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                        className="section-animate-item p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/40 hover:-translate-y-0.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-argan-500/15 border border-argan-400/25 flex items-center justify-center text-argan-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="mt-3 font-display text-cream">{p.title}</p>
                        <p className="mt-1 text-cream/70 text-sm leading-relaxed">{p.text}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="section-animate-item mt-10 flex flex-wrap gap-3">
                  <Link href="/histoire" className="btn-cta-discover inline-flex items-center gap-2">
                    Notre histoire
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/savoir-plus"
                    className="btn-outline inline-flex items-center gap-2 border-argan-400/70 text-cream/90 hover:bg-white/10"
                  >
                    Bienfaits & recettes
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { v: '100%', l: 'Origine Maroc' },
                { v: 'Petits', l: 'Lots artisanaux' },
                { v: 'À froid', l: 'Pression douce' },
                { v: '24/7', l: 'Livraison France' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="section-animate-item p-5 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <p className="font-display text-2xl sm:text-3xl text-cream">{s.v}</p>
                  <p className="mt-1 text-cream/65 text-sm">{s.l}</p>
                </div>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Catégories phares */}
      <section className="min-h-screen flex items-center border-t border-white/10 bg-[#111111]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="section-animate text-argan-300 uppercase tracking-[0.25em] text-xs font-semibold">
                  Notre gamme
                </p>
                <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream tracking-tight">
                  Les essentiels Taskmout
                </h2>
                <p className="section-animate mt-4 text-cream/75 text-lg leading-relaxed">
                  Quatre familles de produits qui résument tout notre savoir-faire — à découvrir, à
                  goûter, à partager.
                </p>
              </div>
              <Link
                href="/articles"
                className="section-animate-item inline-flex items-center gap-2 text-argan-300 hover:text-argan-200 font-medium"
              >
                Voir toute la gamme
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="section-animate-item group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:border-argan-400/40 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(214,139,42,0.35)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${c.accent}`}
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-display text-xl sm:text-2xl text-cream">{c.title}</h3>
                    <p className="mt-1 text-cream/75 text-sm leading-relaxed line-clamp-2">{c.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-argan-300 text-sm font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Découvrir
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Notre savoir-faire — 4 étapes alternées */}
      <section className="min-h-screen flex items-center border-t border-white/10">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="section-animate text-argan-300 uppercase tracking-[0.25em] text-xs font-semibold">
                Notre processus
              </p>
              <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream tracking-tight">
                Notre savoir-faire, étape par étape
              </h2>
              <p className="section-animate mt-4 text-cream/75 text-lg leading-relaxed">
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
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 font-oriental text-5xl sm:text-6xl text-argan-300/90 drop-shadow-[0_4px_18px_rgba(214,139,42,0.45)]">
                        {step.n}
                      </span>
                    </div>
                    <div>
                      <p className="text-argan-300/80 text-sm tracking-widest uppercase">Étape {step.n}</p>
                      <h3 className="mt-2 font-display text-2xl sm:text-3xl text-cream">{step.title}</h3>
                      <p className="mt-4 text-cream/80 text-lg leading-relaxed border-l-4 border-argan-500/40 pl-5">
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

      {/* Engagements — bandeau d'icônes */}
      <section className="border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <AnimateSection>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {ENGAGEMENTS.map((e) => {
                const Icon = e.icon;
                return (
                  <div
                    key={e.label}
                    className="section-animate-item inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-cream/85 text-sm transition-all duration-300 hover:border-argan-400/40 hover:bg-white/10"
                  >
                    <Icon className="w-4 h-4 text-argan-300" />
                    {e.label}
                  </div>
                );
              })}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Témoignages */}
      <section className="min-h-[80vh] flex items-center border-t border-white/10 bg-[#111111]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="section-animate text-argan-300 uppercase tracking-[0.25em] text-xs font-semibold">
                Ils en parlent mieux que nous
              </p>
              <h2 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream tracking-tight">
                Ce que nos clients disent
              </h2>
              <p className="section-animate mt-4 text-cream/75 text-lg leading-relaxed">
                Trois retours sincères de personnes qui ont adopté Taskmout au quotidien.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {TEMOIGNAGES.map((t) => (
                <figure
                  key={t.name}
                  className="section-animate-item relative p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/40 hover:-translate-y-1"
                >
                  <Quote className="w-6 h-6 text-argan-400/60" aria-hidden />
                  <blockquote className="mt-4 text-cream/85 leading-relaxed">{t.text}</blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-display text-sm font-semibold shadow-warm`}
                      aria-hidden
                    >
                      {t.initials}
                    </div>
                    <figcaption>
                      <p className="text-cream font-medium">{t.name}</p>
                      <p className="text-cream/55 text-sm">{t.location}</p>
                    </figcaption>
                    <div className="ml-auto flex items-center gap-0.5 text-argan-400" aria-label={`Note ${t.rating} sur 5`}>
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
