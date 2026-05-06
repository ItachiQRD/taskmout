'use client';

import Image from 'next/image';

const DEFAULT_COMPOSITE = '/assets/images/savoir-plus/dashboard-corps-composite.png';

function Crest() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-10 h-10 text-[#dea34a]"
      fill="none"
      aria-hidden
    >
      <path
        d="M41 16c-7.5 0-13.5 6-13.5 13.5S33.5 43 41 43c3.2 0 6.2-1.1 8.6-3-3.7 6.7-10.8 11.2-19 11.2C18.2 51.2 8.5 41.5 8.5 29.6 8.5 18.2 18 8.7 29.4 8.7c4.7 0 9 1.6 12.4 4.3C41.5 14.2 41 15 41 16Z"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.95"
      />
      <path
        d="M51.5 21.5l2.1 6.2 6.2 2.1-6.2 2.1-2.1 6.2-2.1-6.2-6.2-2.1 6.2-2.1 2.1-6.2Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

function CornerCard({
  title,
  children,
  highlight,
  foot,
}: {
  title: string;
  children: string;
  highlight?: boolean;
  foot?: string;
}) {
  return (
    <div
      className={`tm-dashboard-card ${highlight ? 'tm-dashboard-card--highlight' : ''}`}
    >
      <div className="tm-dashboard-card__title">{title}</div>
      <p className="tm-dashboard-card__text">{children}</p>
      {foot && (
        <div className="tm-dashboard-card__foot">
          <span className="tm-dashboard-check" aria-hidden />
          <span className="tm-dashboard-card__footText">{foot}</span>
        </div>
      )}
    </div>
  );
}

export function ArganDashboardSection({
  compositeSrc = DEFAULT_COMPOSITE,
}: {
  compositeSrc?: string;
}) {
  return (
    <section className="tm-dashboard-wrap" aria-label="Bienfaits — interface interactive">
      <div className="tm-dashboard-bg" />

      <div className="tm-dashboard-inner">
        <div className="tm-dashboard-header">
          <div className="tm-dashboard-brand">
            <Crest />
            <div className="tm-dashboard-brandText">Taskmout</div>
          </div>
        </div>

        <div className="tm-dashboard-body">
          {/* Colonne gauche : 2 blocs (moitié / moitié) */}
          <div className="tm-dashboard-col">
            <CornerCard
              title="CHEVEUX"
              children={"Nourrissement des pointes et des longueurs, brillance. L'huile d'argan peut être appliquée en masque ou en soin sans rinçage pour favoriser la pousse et limiter les fourches."}
            />
            <CornerCard
              title="PEAU & MASSAGE"
              children={"L'huile d'argan est absorbée facilement et convient aux zones sèches (mains, coudes, pieds). Idéale en huile de massage pour la détente et l'hydratation."}
            />
          </div>

          {/* Centre : image composite grande */}
          <div className="tm-dashboard-center">
            <div className="tm-composite">
              {/* gouttelettes d'huile */}
              <span className="tm-droplet tm-droplet--1" aria-hidden />
              <span className="tm-droplet tm-droplet--2" aria-hidden />
              <span className="tm-droplet tm-droplet--3" aria-hidden />
              <span className="tm-droplet tm-droplet--4" aria-hidden />

              <div className="tm-composite-frame">
                <Image
                  src={compositeSrc}
                  alt=""
                  fill
                  className="tm-composite-img"
                  sizes="(max-width: 1024px) 100vw, 760px"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Colonne droite : 2 blocs (moitié / moitié) */}
          <div className="tm-dashboard-col">
            <CornerCard
              title="BARBE"
              highlight
              children={"Hydratation de la barbe et de la peau en dessous. Quelques gouttes suffisent pour assouplir le poil et apaiser les irritations, tout en favorisant une pousse saine."}
              foot="soignée et brillante"
            />
            <CornerCard
              title="ONGLES & CUTICULES"
              children={"Quelques gouttes massées sur les ongles et les cuticules aident à les renforcer et à limiter les gerçures."}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

