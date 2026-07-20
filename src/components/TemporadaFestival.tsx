import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { SurfacePattern } from "@/components/SurfacePattern";
import {
  TemporadaLightbox,
  type TemporadaLightboxSlide,
} from "@/components/TemporadaLightbox";
import { useReservation } from "@/hooks/useReservation";
import { CTA_HOVER_CLASS, CTA_LABELS } from "@/lib/cta-labels";
import { getTemporadaAtiva, type Temporada } from "@/lib/temporadas";
import "@/styles/temporada.css";

function TemporadaContent({ temporada }: { temporada: Temporada }) {
  const { open: openReservation } = useReservation();
  const headline = temporada.headline ?? temporada.title;
  const [lightbox, setLightbox] = useState<TemporadaLightboxSlide | null>(null);

  return (
    <section
      id={`temporada-${temporada.id}`}
      className="section-canvas section-canvas--shift temporada-section patterned-surface"
      aria-label={temporada.title}
    >
      <SurfacePattern />
      <div className="temporada-inner relative z-[1] mx-auto max-w-6xl px-5 md:px-8">
        <SectionReveal variant="subtle">
          <div className="temporada-hero grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-6 lg:gap-8">
            <div className="min-w-0 text-center md:text-left">
              <p className="section-kicker !mb-1">{temporada.kicker}</p>
              <h2 className="font-display text-[1.55rem] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[1.75rem] md:text-[1.95rem]">
                {headline}
              </h2>
              <p className="section-caption mt-1.5 !mb-0 text-foreground-muted">
                {temporada.periodLabel}
              </p>

              <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:justify-start">
                <button
                  type="button"
                  onClick={openReservation}
                  className={`btn-primary focus-ring inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
                >
                  {CTA_LABELS.reserveTable}
                </button>
                <a
                  href="#cardapio"
                  className="btn-ghost-minimal focus-ring text-sm text-foreground-muted"
                >
                  Ver cardápio da casa
                </a>
              </div>
            </div>

            <button
              type="button"
              className="temporada-frame temporada-cover temporada-frame--clickable mx-auto w-full max-w-[11.5rem] sm:max-w-[12.5rem] md:mx-0 md:max-w-[14rem] md:justify-self-end"
              onClick={() =>
                setLightbox({
                  src: temporada.cover.src,
                  alt: temporada.cover.alt,
                  title: temporada.title,
                })
              }
              aria-label={`Ampliar capa: ${temporada.title}`}
            >
              <img
                src={temporada.cover.src}
                alt=""
                width={temporada.cover.width}
                height={temporada.cover.height}
                loading="lazy"
                decoding="async"
                className="temporada-frame__img"
              />
            </button>
          </div>
        </SectionReveal>

        <div
          id={`temporada-${temporada.id}-cardapio`}
          className="temporada-menu mt-4 scroll-mt-24 md:mt-5 md:scroll-mt-28"
        >
          <p className="section-caption mb-2.5 text-center !normal-case tracking-normal text-foreground-muted md:mb-3 md:text-left">
            No cardápio da temporada
          </p>

          <ul className="temporada-thumbs grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4 md:gap-2.5">
            {temporada.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="temporada-frame temporada-frame--item temporada-frame--clickable"
                  onClick={() =>
                    setLightbox({
                      src: item.image,
                      alt: item.alt,
                      title: item.title,
                      caption: `${item.priceLabel} · ${item.description}`,
                    })
                  }
                  aria-label={`Ampliar ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="temporada-frame__img"
                  />
                  <span className="sr-only">
                    {item.title} · {item.priceLabel}. {item.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TemporadaLightbox slide={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

/** Bloco Home da temporada ativa — some fora do período (startsAt/endsAt). */
export function TemporadaFestival() {
  const temporada = getTemporadaAtiva();
  if (!temporada) return null;
  return <TemporadaContent temporada={temporada} />;
}
