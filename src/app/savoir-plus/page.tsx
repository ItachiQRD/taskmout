import Image from 'next/image';
import { AnimateSection } from '@/components/AnimateSection';
import { RecettesCarousel } from '@/components/RecettesCarousel';
import Link from 'next/link';
import { ArrowRight, Droplets, Sparkles, Leaf, HeartHandshake } from 'lucide-react';

const IMG = (path: string) => `/assets/images/savoir-plus/${path}`;

const BIENFAITS_CORPS = [
  {
    key: 'cheveux',
    title: 'Cheveux',
    icon: '✨',
    description:
      "Nourrit les pointes et apporte de la brillance. Utilisable en masque ou en soin léger pour limiter les fourches.",
  },
  {
    key: 'barbe',
    title: 'Barbe',
    icon: '🧔',
    description:
      "Hydrate la barbe et la peau. Quelques gouttes suffisent pour assouplir le poil et calmer les irritations.",
  },
  {
    key: 'peau',
    title: 'Peau & massage',
    icon: '🤲',
    description:
      "Absorption rapide sur les zones sèches (mains, coudes, pieds). Idéale en massage pour hydrater et détendre.",
  },
  {
    key: 'ongles',
    title: 'Ongles & cuticules',
    icon: '💅',
    description:
      'Aide à renforcer ongles et cuticules. Un massage court et régulier limite les gerçures.',
  },
] as const;

function BienfaitCard({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="group h-full p-5 sm:p-6 rounded-sm bg-white border border-maison-brun/10 shadow-card transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden>{icon}</span>
        <h3 className="font-display text-lg sm:text-xl text-maison-brun">{title}</h3>
      </div>
      <p className="mt-3 text-maison-cacao/75 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const PRODUITS = [
  {
    name: "Huile d'argan",
    desc: "Pressée à froid à partir des amandons d'arganier. Assaisonnement, finition de plats, peau et cheveux.",
    image: IMG('huile-argan.png'),
    alt: "Huile d'argan Taskmout",
    icon: Droplets,
    borderColor: 'border-l-maison-dore/60',
  },
  {
    name: "Huile d'olive",
    desc: "Huiles issues de terroirs sélectionnés, au profil fruité équilibré. Parfaites en salade ou en touche finale.",
    image: IMG('huile-olive.png'),
    alt: "Huile d'olive Taskmout",
    icon: Leaf,
    borderColor: 'border-l-maison-olive/60',
  },
  {
    name: 'Miel',
    desc: "Miels de terroir choisis pour leur goût et leur naturalité. Idéals au petit-déjeuner et dans l'amlou.",
    image: IMG('miel-pot-rayon.png'),
    alt: 'Miel Taskmout',
    icon: Sparkles,
    borderColor: 'border-l-maison-dore/60',
  },
  {
    name: 'Amlou',
    desc: "Pâte onctueuse amande (ou cacahuète), huile d'argan et miel. À tartiner ou à intégrer dans vos desserts.",
    image: IMG('amlou-cacahuetes.png'),
    alt: 'Amlou Taskmout',
    icon: HeartHandshake,
    borderColor: 'border-l-maison-brun/40',
  },
];

const RECETTES_SLIDES = [
  {
    image: IMG('recette-tiramisu-amlou.png'),
    imageAlt: 'Tiramisu goût amlou',
    title: 'Tiramisu goût amlou',
    description: 'Version saine du tiramisu : mascarpone et amlou en couches avec biscuits et cacao. Saveurs amande et miel.',
    detailsDesktop: 'Ingrédients : mascarpone, amlou Taskmout, œufs, biscuits type boudoir ou spéculos, cacao non sucré, amandes effilées.\n\nÉtapes : mélanger mascarpone, amlou et jaunes d\u2019œufs en crème. Monter les blancs en neige et les incorporer. Alterner dans des verrines une couche de biscuits légèrement trempés (thé ou café froid), une couche de crème, puis répéter. Finir par un voile de cacao et des amandes. Réserver au frais 2 h minimum.\n\nConseil : une touche de miel Taskmout sur la dernière couche de crème renforce le goût.',
  },
  {
    image: IMG('recette-tartines-bowls.png'),
    imageAlt: 'Tartines et bowls',
    title: 'Tartines & bowls',
    description: 'Pain complet, amlou, fruits frais et graines. Bowl yaourt, amlou, granola et fruits pour un petit-déjeuner nourrissant.',
    detailsDesktop: 'Ingrédients : pain complet ou aux céréales, amlou Taskmout, yaourt nature, granola, fruits de saison (banane, fruits rouges, grenade), graines (courge, chia), miel si souhaité.\n\nTartines : toaster le pain, tartiner d\u2019amlou, ajouter des rondelles de banane ou des fruits et un filet de miel.\n\nBowl : déposer le yaourt dans un bol, ajouter 1 à 2 cuillères à soupe d\u2019amlou, du granola, les fruits coupés et les graines. Parsemer de miel ou de noix pour le croquant.\n\nIdéal le matin pour un petit-déjeuner gourmand et rassasiant.',
  },
  {
    image: IMG('recette-smoothies-finitions.png'),
    imageAlt: 'Smoothies et plats à l\'huile',
    title: 'Smoothies & finitions à l\'huile',
    description: 'Amlou dans un smoothie banane-amande. Filet d\'huile d\'olive ou d\'argan sur légumes rôtis et poisson.',
    detailsDesktop: 'Smoothie : mixer banane, lait (végétal ou non), 1 cuillère à soupe d\u2019amlou Taskmout, une pincée de cannelle. Servir avec des amandes ou du granola sur le dessus.\n\nFinition à l\u2019huile : une fois le plat (légumes rôtis, poisson, soupe, salade) dressé, ajouter un filet d\u2019huile d\u2019argan ou d\u2019olive Taskmout juste avant de servir pour préserver les arômes et les bienfaits. Ne pas chauffer l\u2019huile à forte température.\n\nAstuce : l\u2019huile d\u2019olive sur les légumes de saison et l\u2019huile d\u2019argan sur les plats plus doux ou les soupes crémeuses.',
  },
];

const NAV_SECTIONS = [
  { id: 'sp-produits', label: 'Nos produits' },
  { id: 'sp-nutrition', label: 'Nutrition' },
  { id: 'sp-corps', label: 'Soins du corps' },
  { id: 'sp-recettes', label: 'Recettes' },
];

export const metadata = {
  title: 'Savoir plus — Huiles, bienfaits & recettes | Taskmout',
  description: 'Découvrez nos huiles d\'argan et d\'olive, le miel, leurs bienfaits nutritionnels et pour le corps (cheveux, barbe, massage), et des idées de recettes comme le tiramisu amlou.',
};

export default function SavoirPlusPage() {
  return (
    <div className="min-h-screen bg-maison-creme">
      {/* Hero */}
      <section className="border-b border-maison-brun/10 bg-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">
                  Tout savoir
                </p>
                <h1 className="section-animate mt-3 font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-maison-cacao leading-tight">
                  Huiles, bienfaits
                  <br />
                  <span className="text-maison-brun">&amp; recettes</span>
                </h1>
                <p className="section-animate mt-5 text-maison-cacao/75 text-base sm:text-lg leading-relaxed max-w-lg">
                  Tout ce que nous souhaitons partager sur nos huiles, l&apos;amlou, le miel et la façon d&apos;en profiter au quotidien — en cuisine, pour le corps et en idées recettes.
                </p>
                <div className="section-animate-item mt-7 flex flex-wrap gap-3">
                  <Link href="/articles" className="btn-maison-primary !w-auto inline-flex items-center gap-2 px-7">
                    Voir la boutique <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <a href="#sp-recettes" className="btn-maison-outline !w-auto inline-flex items-center gap-2 px-7">
                    Nos recettes
                  </a>
                </div>
              </div>
              <div className="section-animate-item relative aspect-[4/3] rounded-sm overflow-hidden border border-maison-brun/10 shadow-maison">
                <Image
                  src={IMG('coffret-produits.png')}
                  alt="Coffret huiles, amlou et miel Taskmout"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
              </div>
            </div>
          </AnimateSection>
        </div>

        {/* Quick nav — mobile */}
        <div className="md:hidden mt-8 px-4">
          <div className="mx-auto max-w-5xl rounded-sm border border-maison-brun/10 bg-maison-creme p-2">
            <div className="grid grid-cols-2 gap-2">
              {NAV_SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-white px-3 text-xs font-medium text-maison-cacao/90 border border-maison-brun/8 transition-colors hover:bg-maison-sable/30">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content with optional sticky side nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-14">
          {/* Sticky sidebar — desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1 pt-14" aria-label="Sections">
              {NAV_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-sm px-3 py-2 text-sm text-maison-cacao/70 hover:text-maison-brun hover:bg-maison-sable/30 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div>
            {/* Produits */}
            <section id="sp-produits" className="py-12 sm:py-20 border-b border-maison-brun/10">
              <AnimateSection>
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Nos produits</p>
                <h2 className="section-animate mt-2 font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
                  Les huiles et produits de base
                </h2>
                <p className="section-animate mt-3 text-maison-cacao/75 leading-relaxed max-w-2xl">
                  Des terroirs marocains à votre table : nos incontournables, pressés à froid et travaillés avec soin.
                </p>

                <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {PRODUITS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.name} className={`section-animate-item flex gap-4 p-4 sm:p-5 rounded-sm bg-white border border-maison-brun/10 border-l-4 ${p.borderColor} shadow-card transition-all duration-300 hover:border-maison-brun/20 hover:-translate-y-0.5`}>
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm overflow-hidden bg-maison-sable/30">
                          <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="96px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Icon className="size-4 text-maison-brun/70 shrink-0" aria-hidden />
                            <h3 className="font-display text-base sm:text-lg text-maison-brun truncate">{p.name}</h3>
                          </div>
                          <p className="mt-1.5 text-maison-cacao/75 text-sm leading-relaxed line-clamp-3">{p.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="section-animate-item mt-4 p-5 rounded-sm bg-maison-sable/25 border border-maison-brun/8 text-center">
                  <p className="text-sm text-maison-cacao/70">
                    Selon la saison : noix, amande et autres fruits à coque. Même exigence : origine claire et pression à froid.
                  </p>
                </div>

                <div className="section-animate-item mt-6 text-center">
                  <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-maison-brun hover:text-maison-cacao transition-colors">
                    Voir tous les produits en boutique <ArrowRight className="size-4" />
                  </Link>
                </div>
              </AnimateSection>
            </section>

            {/* Bienfaits nutritionnels */}
            <section id="sp-nutrition" className="py-12 sm:py-20 border-b border-maison-brun/10">
              <AnimateSection>
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Nutrition</p>
                <h2 className="section-animate mt-2 font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
                  Bienfaits nutritionnels
                </h2>
                <p className="section-animate mt-3 text-maison-cacao/75 leading-relaxed max-w-2xl">
                  Riches en acides gras insaturés, vitamine E et antioxydants. En quantité raisonnable, elles s&apos;intègrent à une alimentation équilibrée.
                </p>

                <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div className="section-animate-item relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-maison-sable/30 border border-maison-brun/10 shadow-soft max-w-md">
                    <Image src={IMG('coffret-produits.png')} alt="Coffret huiles, amlou et miel Taskmout" fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="section-animate-item space-y-3">
                    {[
                      'Assaisonnement de salades et crudités.',
                      'Tartines du matin avec amlou ou miel.',
                      'Finition de plats chauds pour préserver les nutriments.',
                      'Base pour vinaigrettes maison et marinades.',
                    ].map((text, i) => (
                      <div key={i} className="flex gap-3 items-start p-3.5 rounded-sm bg-white border border-maison-brun/10 transition-all duration-300 hover:border-maison-brun/20">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-maison-sable/40 text-xs font-bold text-maison-brun">{i + 1}</span>
                        <span className="text-sm text-maison-cacao/85 leading-relaxed">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateSection>
            </section>

            {/* Bienfaits pour le corps */}
            <section id="sp-corps" className="py-12 sm:py-20 border-b border-maison-brun/10">
              <AnimateSection>
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Soins du corps</p>
                <h2 className="section-animate mt-2 font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
                  Bienfaits pour le corps
                </h2>
                <p className="section-animate mt-3 text-maison-cacao/75 leading-relaxed max-w-2xl">
                  Nos huiles sont utilisées depuis longtemps pour nourrir la peau et les cheveux. Quatre usages emblématiques.
                </p>

                <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BIENFAITS_CORPS.map((b) => (
                    <div key={b.key} className="section-animate-item">
                      <BienfaitCard title={b.title} icon={b.icon} description={b.description} />
                    </div>
                  ))}
                </div>

                <div className="section-animate-item mt-8 flex justify-center">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-maison-dore/40 shadow-warm">
                    <Image src={IMG('huile-miracle-soins-cheveux.png')} alt="Huile Miracle Taskmout — soins du corps" fill className="object-cover" sizes="176px" />
                    <div className="absolute inset-0 bg-gradient-to-br from-maison-dore/10 via-transparent to-maison-olive/10 pointer-events-none" />
                  </div>
                </div>
              </AnimateSection>
            </section>

            {/* Recettes */}
            <section id="sp-recettes" className="py-12 sm:py-20 border-b border-maison-brun/10">
              <AnimateSection>
                <p className="section-animate text-[11px] font-semibold uppercase tracking-[0.22em] text-maison-terre">Idées gourmandes</p>
                <h2 className="section-animate mt-2 font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
                  Idées de recettes
                </h2>
                <p className="section-animate mt-3 text-maison-cacao/75 leading-relaxed max-w-2xl">
                  L&apos;amlou et nos huiles se prêtent à des recettes simples et gourmandes — du petit-déjeuner au dessert.
                </p>
                <div className="section-animate-item mt-8 sm:mt-10">
                  <RecettesCarousel recettes={RECETTES_SLIDES} />
                </div>
              </AnimateSection>
            </section>

            {/* CTA */}
            <section className="py-14 sm:py-20">
              <AnimateSection>
                <div className="section-animate rounded-sm border border-maison-brun/10 bg-white p-8 sm:p-10 text-center shadow-card">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-maison-cacao tracking-tight">
                    Envie d&apos;essayer ?
                  </h2>
                  <p className="mt-3 text-maison-cacao/75 max-w-lg mx-auto">
                    Retrouvez nos huiles, amlou et miel dans la boutique. Livraison soignée dans toute la France.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link href="/articles" className="btn-maison-primary !w-auto inline-flex items-center gap-2 px-8">
                      Voir la gamme <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link href="/contact" className="btn-maison-outline !w-auto inline-flex items-center gap-2 px-8">
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </AnimateSection>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
