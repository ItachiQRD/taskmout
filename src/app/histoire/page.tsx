import Image from 'next/image';
import Link from 'next/link';
import { AnimateSection } from '@/components/AnimateSection';
import { Sparkles, Leaf, HeartHandshake, MapPin, ArrowRight } from 'lucide-react';

const IMG = (p: string) => `/assets/images/histoire/${p}`;

export const metadata = {
  title: "Notre histoire — Taskmout",
  description:
    "L'histoire de Taskmout : un héritage marocain, un savoir-faire familial et une exigence artisanale autour des huiles d'argan, d'olive, du miel et de l'amlou.",
};

const VALEURS = [
  {
    icon: Leaf,
    title: 'Authenticité',
    text:
      "Des matières premières issues de terroirs marocains que nous connaissons. Origine traçable, pression à froid, recettes simples.",
  },
  {
    icon: HeartHandshake,
    title: 'Transmission',
    text:
      "Un savoir appris depuis l'enfance, transmis par la famille. Chaque produit raconte un geste, une habitude, une mémoire.",
  },
  {
    icon: Sparkles,
    title: 'Exigence',
    text:
      "Le travail est fait ici, à la main et à la machine, pour préserver les arômes et la qualité jusqu'au flacon que vous ouvrirez.",
  },
];

const TIMELINE = [
  {
    year: 'Origines',
    title: 'Au Maroc, dans la cuisine de famille',
    text:
      "Tout commence avec les huiles d'argan et d'olive, le miel et l'amlou — des produits du quotidien préparés et partagés en famille.",
    image: 'timeline-souk.png',
    alt: 'Souk marocain, étal traditionnel',
  },
  {
    year: 'Apprentissage',
    title: "Un geste appris, jamais oublié",
    text:
      "On apprend à choisir les amandons, à reconnaître une bonne huile, à doser le miel, à respecter le temps de chaque préparation.",
    image: 'timeline-apprentissage.png',
    alt: 'Transmission du geste — mortier en pierre',
  },
  {
    year: 'Atelier',
    title: 'Un atelier à Reims',
    text:
      "Aujourd'hui, nous importons les matières premières du Maroc et nous les travaillons ici, à Reims, avec un soin artisanal.",
    image: 'timeline-atelier-reims.png',
    alt: "Atelier Taskmout à Reims",
  },
  {
    year: 'Taskmout',
    title: 'Une marque, une promesse',
    text:
      "Taskmout, c'est ce que nous voulons partager avec vous : des huiles, des tartinables et un miel qui ont du sens, du goût et de l'histoire.",
    image: 'timeline-marque.png',
    alt: 'Coffret Taskmout finalisé',
  },
];

export default function HistoirePage() {
  return (
    <div className="min-h-screen bg-maison-creme">
      {/* Hero — visuel arganier en fond */}
      <section className="relative overflow-hidden border-b border-maison-brun/10 min-h-[60vh] flex items-center">
        <Image
          src={IMG('hero-arganier.png')}
          alt="Champ d'arganiers au coucher du soleil"
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
          quality={90}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-maison-cacao/50 via-maison-cacao/40 to-maison-creme"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(214,139,42,0.18),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(140,160,60,0.12),_transparent_55%)]"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <AnimateSection>
            <div className="section-animate inline-flex items-center gap-2 px-4 py-2 rounded-full border border-maison-brun/15 bg-maison-sable/30 text-maison-cacao/90 text-sm">
              <MapPin className="w-4 h-4 text-maison-brun" />
              Du Maroc à Reims
            </div>
            <h1 className="section-animate mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-maison-brun">
              Notre histoire
            </h1>
            <p className="section-animate mt-6 text-maison-cacao/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Taskmout est née d&apos;une rencontre&nbsp;: celle d&apos;un héritage marocain et
              d&apos;un savoir-faire appris depuis l&apos;enfance autour des huiles, du miel et de
              l&apos;amlou. Voici comment nous en sommes arrivés là.
            </p>
            <div className="section-animate-item mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/savoir-plus" className="btn-maison-primary !w-auto inline-flex items-center gap-2 px-7">
                Découvrir nos produits
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
              <Link href="/articles" className="btn-maison-outline !w-auto inline-flex gap-2">
                Voir la gamme
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Origines — récit principal */}
      <section className="py-16 sm:py-24 border-b border-maison-brun/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="section-animate-item relative aspect-[4/3] rounded-sm overflow-hidden border border-maison-brun/10 bg-maison-sable/30">
                <Image
                  src={IMG('origines-cuisine-famille.png')}
                  alt="Cuisine familiale marocaine — origines Taskmout"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 720px"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-maison-cacao/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-argan-400 shadow-[0_0_18px_rgba(214,139,42,0.6)]" />
                  <span className="text-maison-cacao/90 text-sm">Maroc &middot; Sud-Ouest</span>
                </div>
              </div>

              <div>
                <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maison-cacao tracking-tight">
                  Une rencontre entre deux rives
                </h2>
                <div className="section-animate-item mt-6 space-y-5 text-maison-cacao/85 leading-relaxed border-l-4 border-maison-brun/25 pl-5">
                  <p>
                    Tout part d&apos;un geste familial&nbsp;: choisir les bons amandons d&apos;arganier,
                    presser doucement, surveiller le miel, broyer les amandes pour l&apos;amlou.
                    Au Maroc, ces produits font partie du quotidien, au petit-déjeuner comme
                    sur la table du dîner.
                  </p>
                  <p>
                    En s&apos;installant en France, nous avons voulu garder ce lien intact.
                    Nous importons nos matières premières directement depuis nos régions
                    de cœur, et nous les travaillons à Reims, avec une exigence
                    artisanale&nbsp;: pression à froid, contrôle de la matière, conditionnement
                    soigné.
                  </p>
                  <p>
                    Taskmout, c&apos;est ce pont&nbsp;: un produit qui voyage du Maroc à votre
                    table, sans rien perdre de ce qui le rend précieux.
                  </p>
                </div>
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 border-b border-maison-brun/10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maison-cacao tracking-tight">
                Les étapes qui nous ont menés ici
              </h2>
              <p className="section-animate mt-4 text-maison-cacao/75 leading-relaxed">
                D&apos;un savoir transmis à un atelier rémois&nbsp;: voici comment Taskmout a pris forme.
              </p>
            </div>

            <div className="relative mt-12">
              {/* Ligne verticale (desktop) */}
              <div
                aria-hidden
                className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-argan-400/40 to-transparent"
              />

              <ol className="space-y-12 md:space-y-20">
                {TIMELINE.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <li
                      key={step.year}
                      className="section-animate-item relative md:grid md:grid-cols-2 md:gap-12 items-center"
                    >
                      {/* Texte */}
                      <div
                        className={`relative md:px-2 ${
                          isLeft ? 'md:text-right md:pr-12 md:order-1' : 'md:text-left md:pl-12 md:order-2'
                        }`}
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-maison-brun/15 bg-maison-sable/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-argan-400" />
                          <span className="text-maison-brun text-xs font-semibold tracking-wide uppercase">
                            {step.year}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-xl sm:text-2xl text-maison-cacao">{step.title}</h3>
                        <p className="mt-2 text-maison-cacao/75 leading-relaxed">{step.text}</p>
                      </div>

                      {/* Image */}
                      <div className={`mt-6 md:mt-0 ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-maison-brun/10 bg-maison-sable/30 shadow-maison">
                          <Image
                            src={IMG(step.image)}
                            alt={step.alt}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) min(100vw, 900px), min(50vw, 900px)"
                            quality={93}
                            priority={step.year === 'Taskmout'}
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-maison-cacao/35 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Pastille centrale (desktop) */}
                      <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                        <span className="w-4 h-4 rounded-full bg-argan-400 ring-4 ring-maison-creme shadow-[0_0_18px_rgba(214,139,42,0.55)]" />
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Savoir-faire visuel */}
      <section className="py-16 sm:py-24 border-b border-maison-brun/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maison-cacao tracking-tight">
                  Un savoir-faire qui ne se résume pas à une recette
                </h2>
                <div className="section-animate-item mt-6 space-y-5 text-maison-cacao/85 leading-relaxed">
                  <p>
                    Travailler une huile, c&apos;est connaître son arbre, son climat,
                    sa saison. Travailler le miel ou l&apos;amlou, c&apos;est respecter la
                    matière, ne pas trop chauffer, ne pas dénaturer. Ce sont des
                    gestes simples mais précis, transmis et répétés.
                  </p>
                  <p>
                    À chaque lot, nous goûtons, nous comparons, nous ajustons. Notre
                    promesse n&apos;est pas industrielle&nbsp;: c&apos;est artisanale,
                    avec ce que cela implique de variations subtiles d&apos;une saison à
                    l&apos;autre, et la même exigence à chaque étape.
                  </p>
                </div>
                <div className="section-animate-item mt-8">
                  <Link
                    href="/savoir-plus"
                    className="btn-maison-primary !w-auto inline-flex items-center justify-center gap-2 text-center"
                  >
                    <span className="leading-snug max-w-[min(100%,220px)] sm:max-w-none">
                      Voir nos produits &amp; bienfaits
                    </span>
                    <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Mosaïque : style initial restauré (le souci venait du fichier source) */}
              <div className="section-animate-item relative w-full rounded-sm overflow-hidden border border-maison-brun/10 bg-maison-sable/30 shadow-maison aspect-[762/571]">
                <Image
                  src={IMG('savoir-faire-mosaic.png')}
                  alt="Mosaïque savoir-faire Taskmout — amandons, olives, miel, amlou"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 900px"
                  quality={95}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-maison-cacao/20 via-transparent to-argan-400/10"
                />
              </div>
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* Valeurs — image d'ambiance en fond */}
      <section className="relative py-16 sm:py-24 border-b border-maison-brun/10 overflow-hidden">
        <Image
          src={IMG('valeurs-ambiance.png')}
          alt="Atmosphère atelier Taskmout"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-maison-cacao/70 via-maison-cacao/75 to-maison-cacao/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <AnimateSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maison-cacao tracking-tight">
                Ce qui nous tient à cœur
              </h2>
              <p className="section-animate mt-4 text-maison-cacao/75 leading-relaxed">
                Trois piliers qui guident chaque produit que nous proposons.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {VALEURS.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="section-animate-item group relative p-6 rounded-sm bg-maison-sable/30 border border-maison-brun/10 transition-all duration-300 hover:border-maison-brun/25 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-maison-sable/40 border border-maison-brun/15 flex items-center justify-center text-maison-brun group-hover:bg-maison-sable/50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-maison-cacao">{v.title}</h3>
                    <p className="mt-2 text-maison-cacao/75 leading-relaxed">{v.text}</p>
                  </div>
                );
              })}
            </div>
          </AnimateSection>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateSection>
            <h2 className="section-animate font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maison-cacao tracking-tight">
              Goûtez à notre histoire
            </h2>
            <p className="section-animate mt-4 text-maison-cacao/80 text-lg max-w-2xl mx-auto">
              Découvrez nos huiles, notre amlou et notre miel — ou écrivez-nous pour préparer un coffret sur-mesure.
            </p>
            <div className="section-animate-item mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/articles" className="btn-maison-primary !w-auto inline-flex items-center gap-2">
                Voir la gamme
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-maison-outline !w-auto inline-flex items-center gap-2">
                Nous contacter
              </Link>
            </div>
          </AnimateSection>
        </div>
      </section>
    </div>
  );
}
