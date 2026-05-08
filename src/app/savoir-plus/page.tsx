import Image from 'next/image';
import { AnimateSection } from '@/components/AnimateSection';
import { RecettesCarousel } from '@/components/RecettesCarousel';
import Link from 'next/link';

const IMG = (path: string) => `/assets/images/savoir-plus/${path}`;

const BIENFAITS_CORPS = [
  {
    key: 'cheveux',
    title: 'Cheveux',
    description:
      "Nourrit les pointes et apporte de la brillance. Utilisable en masque ou en soin léger pour limiter les fourches.",
  },
  {
    key: 'barbe',
    title: 'Barbe',
    description:
      "Hydrate la barbe et la peau. Quelques gouttes suffisent pour assouplir le poil et calmer les irritations.",
  },
  {
    key: 'peau',
    title: 'Peau & massage',
    description:
      "Absorption rapide sur les zones sèches (mains, coudes, pieds). Idéale en massage pour hydrater et détendre.",
  },
  {
    key: 'ongles',
    title: 'Ongles & cuticules',
    description:
      'Aide à renforcer ongles et cuticules. Un massage court et régulier limite les gerçures.',
  },
] as const;

function BienfaitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="group h-full p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/40 hover:bg-white/[0.07] hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-argan-400 shadow-[0_0_12px_rgba(214,139,42,0.6)]" />
        <h3 className="font-display text-lg sm:text-xl text-argan-300">{title}</h3>
      </div>
      <p className="mt-3 text-cream/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const RECETTES_SLIDES = [
  {
    image: IMG('recette-tiramisu-amlou.png'),
    imageAlt: 'Tiramisu goût amlou',
    title: 'Tiramisu goût amlou',
    description: 'Version saine du tiramisu : mascarpone et amlou en couches avec biscuits et cacao. Saveurs amande et miel.',
    detailsDesktop: 'Ingrédients : mascarpone, amlou Taskmout, œufs, biscuits type boudoir ou spéculos, cacao non sucré, amandes effilées.\n\nÉtapes : mélanger mascarpone, amlou et jaunes d’œufs en crème. Monter les blancs en neige et les incorporer. Alterner dans des verrines une couche de biscuits légèrement trempés (thé ou café froid), une couche de crème, puis répéter. Finir par un voile de cacao et des amandes. Réserver au frais 2 h minimum.\n\nConseil : une touche de miel Taskmout sur la dernière couche de crème renforce le goût.',
  },
  {
    image: IMG('recette-tartines-bowls.png'),
    imageAlt: 'Tartines et bowls',
    title: 'Tartines & bowls',
    description: 'Pain complet, amlou, fruits frais et graines. Bowl yaourt, amlou, granola et fruits pour un petit-déjeuner nourrissant.',
    detailsDesktop: 'Ingrédients : pain complet ou aux céréales, amlou Taskmout, yaourt nature, granola, fruits de saison (banane, fruits rouges, grenade), graines (courge, chia), miel si souhaité.\n\nTartines : toaster le pain, tartiner d’amlou, ajouter des rondelles de banane ou des fruits et un filet de miel.\n\nBowl : déposer le yaourt dans un bol, ajouter 1 à 2 cuillères à soupe d’amlou, du granola, les fruits coupés et les graines. Parsemer de miel ou de noix pour le croquant.\n\nIdéal le matin pour un petit-déjeuner gourmand et rassasiant.',
  },
  {
    image: IMG('recette-smoothies-finitions.png'),
    imageAlt: 'Smoothies et plats à l\'huile',
    title: 'Smoothies & finitions à l\'huile',
    description: 'Amlou dans un smoothie banane-amande. Filet d\'huile d\'olive ou d\'argan sur légumes rôtis et poisson.',
    detailsDesktop: 'Smoothie : mixer banane, lait (végétal ou non), 1 cuillère à soupe d’amlou Taskmout, une pincée de cannelle. Servir avec des amandes ou du granola sur le dessus.\n\nFinition à l’huile : une fois le plat (légumes rôtis, poisson, soupe, salade) dressé, ajouter un filet d’huile d’argan ou d’olive Taskmout juste avant de servir pour préserver les arômes et les bienfaits. Ne pas chauffer l’huile à forte température.\n\nAstuce : l’huile d’olive sur les légumes de saison et l’huile d’argan sur les plats plus doux ou les soupes crémeuses.',
  },
];

export const metadata = {
  title: 'Savoir plus — Huiles, bienfaits & recettes | Taskmout',
  description: 'Découvrez nos huiles d\'argan et d\'olive, le miel, leurs bienfaits nutritionnels et pour le corps (cheveux, barbe, massage), et des idées de recettes comme le tiramisu amlou.',
};

export default function SavoirPlusPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* En-tête */}
      <section className="border-b border-white/10 py-12 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateSection>
            <h1 className="section-animate font-oriental text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent">
              Huiles, bienfaits & recettes
            </h1>
            <p className="section-animate mt-4 sm:mt-6 text-cream/80 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Tout ce que nous souhaitons partager sur nos huiles, l&apos;amlou, le miel et la façon d&apos;en profiter au quotidien — en cuisine, pour le corps et en idées recettes.
            </p>
          </AnimateSection>
        </div>
        {/* Accès rapide mobile */}
        <div className="md:hidden mt-6 px-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-2">
            <div className="grid grid-cols-2 gap-2">
              <a href="#sp-produits" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/[0.05] px-3 text-xs font-medium text-cream/90">
                Produits
              </a>
              <a href="#sp-nutrition" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/[0.05] px-3 text-xs font-medium text-cream/90">
                Nutrition
              </a>
              <a href="#sp-corps" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/[0.05] px-3 text-xs font-medium text-cream/90">
                Corps
              </a>
              <a href="#sp-recettes" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/[0.05] px-3 text-xs font-medium text-cream/90">
                Recettes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1.1 Les huiles et produits de base */}
      <section id="sp-produits" className="py-12 sm:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
                Les huiles et produits de base
              </h2>
              <p className="section-animate mt-4 text-cream/75 leading-relaxed">
                Des terroirs marocains à votre table : nos cinq incontournables, pressés à froid et travaillés avec soin.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 space-y-5 sm:space-y-10">
              {/* Argan — image gauche */}
              <div className="section-animate-item flex gap-4 sm:flex-row sm:gap-8 items-stretch p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                <div className="relative w-24 h-24 sm:w-48 sm:h-auto shrink-0 sm:aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image src={IMG('huile-argan.png')} alt="Huile d'argan Taskmout" fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                </div>
                <div className="flex-1 sm:border-l-4 sm:border-argan-500/50 sm:pl-4 flex flex-col justify-center">
                  <h3 className="font-display text-xl text-argan-300">Huile d&apos;argan</h3>
                  <p className="mt-1.5 sm:mt-2 text-cream/80 text-sm sm:text-base leading-relaxed">
                    Pressée à froid à partir des amandons d&apos;arganier.
                    Utilisation simple : assaisonnement, finition de plats, peau et cheveux.
                  </p>
                </div>
              </div>

              {/* Olive — image droite */}
              <div className="section-animate-item flex gap-4 sm:flex-row-reverse sm:gap-8 items-stretch p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-olive-400/30">
                <div className="relative w-24 h-24 sm:w-48 sm:h-auto shrink-0 sm:aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image src={IMG('huile-olive.png')} alt="Huile d'olive Taskmout" fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                </div>
                <div className="flex-1 min-w-0 sm:border-r-4 sm:border-olive-400/50 sm:pr-4 sm:text-right flex flex-col justify-center">
                  <h3 className="font-display text-xl text-olive-300">Huile d&apos;olive</h3>
                  <p className="mt-1.5 sm:mt-2 text-cream/80 text-sm sm:text-base leading-relaxed">
                    Huiles issues de terroirs sélectionnés, au profil fruité équilibré.
                    Parfaites en salade, sur tartines ou en touche finale.
                  </p>
                </div>
              </div>

              {/* Autres huiles — pleine largeur, sans image */}
              <div className="section-animate-item p-4 sm:p-8 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-argan-500/30 transition-all duration-300 hover:border-l-argan-400/60 text-center max-w-3xl mx-auto">
                <h3 className="font-display text-xl text-cream">Autres huiles</h3>
                <p className="mt-1.5 sm:mt-2 text-cream/80 text-sm sm:text-base leading-relaxed">
                  Selon la saison : noix, amande et autres fruits à coque.
                  Même exigence : origine claire et pression à froid.
                </p>
              </div>

              {/* Miel — image gauche */}
              <div className="section-animate-item flex gap-4 sm:flex-row sm:gap-8 items-stretch p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                <div className="relative w-24 h-24 sm:w-48 sm:h-auto shrink-0 sm:aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image src={IMG('miel-pot-rayon.png')} alt="Miel Taskmout" fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                </div>
                <div className="flex-1 sm:border-l-4 sm:border-argan-400/50 sm:pl-4 flex flex-col justify-center">
                  <h3 className="font-display text-xl text-argan-300">Miel</h3>
                  <p className="mt-1.5 sm:mt-2 text-cream/80 text-sm sm:text-base leading-relaxed">
                    Miels de terroir choisis pour leur goût et leur naturalité.
                    Idéals au petit-déjeuner, en cuisine et dans l&apos;amlou.
                  </p>
                </div>
              </div>

              {/* Amlou — image droite */}
              <div className="section-animate-item flex gap-4 sm:flex-row-reverse sm:gap-8 items-stretch p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                <div className="relative w-24 h-24 sm:w-48 sm:h-auto shrink-0 sm:aspect-square rounded-xl overflow-hidden bg-white/5">
                  <Image src={IMG('amlou-cacahuetes.png')} alt="Amlou Taskmout" fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                </div>
                <div className="flex-1 min-w-0 sm:border-r-4 sm:border-argan-500/50 sm:pr-4 sm:text-right flex flex-col justify-center">
                  <h3 className="font-display text-xl text-argan-300">Amlou</h3>
                  <p className="mt-1.5 sm:mt-2 text-cream/80 text-sm sm:text-base leading-relaxed">
                    Pâte onctueuse amande (ou cacahuète), huile d&apos;argan et miel.
                    À tartiner ou à intégrer dans vos desserts.
                  </p>
                </div>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* 1.2 Bienfaits nutritionnels */}
      <section id="sp-nutrition" className="py-12 sm:py-24 border-b border-white/10 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
                Bienfaits nutritionnels
              </h2>
              <p className="section-animate mt-4 text-cream/80 leading-relaxed">
                Riches en acides gras insaturés, vitamine E et antioxydants.
                En quantité raisonnable, elles s&apos;intègrent à une alimentation équilibrée.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="section-animate-item relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 max-w-md md:ml-auto">
                <Image src={IMG('coffret-produits.png')} alt="Coffret huiles, amlou et miel Taskmout" fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
              <ul className="section-animate-item space-y-3 sm:space-y-4 text-cream/85 max-w-md">
                <li className="flex gap-3 items-start p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                  <span className="text-argan-400 shrink-0 mt-1">●</span>
                  <span>Assaisonnement de salades et crudités.</span>
                </li>
                <li className="flex gap-3 items-start p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                  <span className="text-argan-400 shrink-0 mt-1">●</span>
                  <span>Tartines du matin avec amlou ou miel.</span>
                </li>
                <li className="flex gap-3 items-start p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-argan-400/30">
                  <span className="text-argan-400 shrink-0 mt-1">●</span>
                  <span>Finition de plats chauds pour préserver les nutriments.</span>
                </li>
              </ul>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* 1.3 Bienfaits pour le corps — disposition losange */}
      <section id="sp-corps" className="py-12 sm:py-24 border-b border-white/10 bg-[radial-gradient(ellipse_at_center,_rgba(214,139,42,0.06),_transparent_60%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
                Bienfaits pour le corps
              </h2>
              <p className="section-animate mt-4 text-cream/80 leading-relaxed">
                Nos huiles sont utilisées depuis longtemps pour nourrir la peau et les cheveux.
                Quatre usages emblématiques, autour d&apos;un même flacon.
              </p>
            </div>

            {/* Losange — desktop (md+) */}
            <div className="hidden md:block mt-16">
              <div className="relative mx-auto" style={{ maxWidth: '880px' }}>
                {/* Lignes décoratives reliant le centre aux 4 cartes */}
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-[1px] h-2/3 bg-gradient-to-b from-transparent via-argan-400/25 to-transparent" />
                  <div className="absolute h-[1px] w-2/3 bg-gradient-to-r from-transparent via-argan-400/25 to-transparent" />
                </div>

                <div className="relative grid grid-cols-3 grid-rows-3 gap-5 lg:gap-6">
                  {/* Cheveux — sommet */}
                  <div className="section-animate-item col-start-2 row-start-1">
                    <BienfaitCard title={BIENFAITS_CORPS[0].title} description={BIENFAITS_CORPS[0].description} />
                  </div>

                  {/* Barbe — gauche */}
                  <div className="section-animate-item col-start-1 row-start-2 flex">
                    <BienfaitCard title={BIENFAITS_CORPS[1].title} description={BIENFAITS_CORPS[1].description} />
                  </div>

                  {/* Centre — visuel circulaire */}
                  <div className="col-start-2 row-start-2 flex items-center justify-center">
                    <div className="relative w-44 h-44 lg:w-56 lg:h-56 rounded-full overflow-hidden ring-2 ring-argan-400/40 shadow-warm">
                      <Image
                        src={IMG('huile-miracle-soins-cheveux.png')}
                        alt="Huile Miracle Taskmout — soins du corps"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 176px, 224px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-argan-400/15 via-transparent to-olive-400/10 pointer-events-none" />
                      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-cream/10 pointer-events-none" />
                    </div>
                  </div>

                  {/* Peau & massage — droite */}
                  <div className="section-animate-item col-start-3 row-start-2 flex">
                    <BienfaitCard title={BIENFAITS_CORPS[2].title} description={BIENFAITS_CORPS[2].description} />
                  </div>

                  {/* Ongles & cuticules — bas */}
                  <div className="section-animate-item col-start-2 row-start-3">
                    <BienfaitCard title={BIENFAITS_CORPS[3].title} description={BIENFAITS_CORPS[3].description} />
                  </div>
                </div>
              </div>
            </div>

            {/* Empilement — mobile */}
            <div className="md:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BIENFAITS_CORPS.map((b) => (
                <div key={b.key} className="section-animate-item">
                  <BienfaitCard title={b.title} description={b.description} />
                </div>
              ))}
              <div className="sm:col-span-2 flex justify-center mt-1">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-argan-400/40 shadow-warm">
                  <Image
                    src={IMG('huile-miracle-soins-cheveux.png')}
                    alt="Huile Miracle Taskmout — soins du corps"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-argan-400/15 via-transparent to-olive-400/10 pointer-events-none" />
                </div>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* 1.4 Idées de recettes — carousel avec rideau au survol */}
      <section id="sp-recettes" className="py-12 sm:py-24 border-b border-white/10 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream tracking-tight">
                Idées de recettes
              </h2>
              <p className="section-animate mt-4 text-cream/80 leading-relaxed">
                L&apos;amlou et nos huiles se prêtent à des recettes simples et gourmandes — du petit-déjeuner au dessert.
                Sur mobile, utilisez les flèches puis le bouton « Voir les détails ».
              </p>
            </div>
            <div className="section-animate-item mt-10">
              <RecettesCarousel recettes={RECETTES_SLIDES} />
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimateSection>
            <p className="section-animate text-cream/80 text-lg">
              Retrouvez nos huiles, amlou et miel dans la gamme et sur la page articles.
            </p>
            <Link
              href="/articles"
              className="section-animate-item btn-primary mt-8 inline-flex items-center gap-2"
            >
              Voir la gamme
            </Link>
          </AnimateSection>
        </div>
      </section>
    </div>
  );
}
