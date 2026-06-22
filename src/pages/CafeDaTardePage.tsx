import { useEffect, useRef } from "react";
import { Coffee } from "lucide-react";
import { ExperienceMenuItem } from "@/components/experiencias/ExperienceMenuItem";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { FadeIn } from "@/components/FadeIn";
import { useReservation } from "@/hooks/useReservation";
import {
  CAFE_DA_TARDE_HERO_ALT,
  CAFE_DA_TARDE_HERO_IMAGE,
  getCafeDaTardeGalleryImages,
} from "@/lib/cafe-da-tarde-images";
import { CAFE_DA_TARDE_ITEMS, EXPERIENCIAS_BY_ID } from "@/lib/experiencias";
import "@/styles/cafe-da-tarde-theme.css";

export default function CafeDaTardePage() {
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["cafe-da-tarde"];
  const gallery = getCafeDaTardeGalleryImages();
  const [featured, ...supporting] = gallery;

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell theme="cafe-da-tarde" title="Café da Tarde · Café com Letras">
      <main ref={contentRef}>
        <section className="relative section-padding border-b border-hairline bg-surface">
          <div className="cdt-hero-glow" aria-hidden />
          <div className="relative mx-auto max-w-4xl">
            <FadeIn>
              <div className="mb-8 overflow-hidden rounded-md border border-hairline">
                <img
                  src={CAFE_DA_TARDE_HERO_IMAGE}
                  alt={CAFE_DA_TARDE_HERO_ALT}
                  className="cdt-hero-image h-52 w-full object-cover object-center md:h-72"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <div className="text-center md:text-left">
                <span className="section-eyebrow flex items-center justify-center gap-1.5 md:justify-start">
                  <Coffee size={12} strokeWidth={1.75} aria-hidden />
                  {info.eyebrow}
                </span>
                <h1 className="section-title mt-2 text-foreground">{info.title}</h1>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-accent">
                  {info.scheduleLong}
                </p>
                <p className="mx-auto mt-5 max-w-2xl font-garamond text-xl italic leading-relaxed text-foreground-muted md:mx-0 md:text-2xl">
                  {info.description}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding border-b border-hairline">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                Na mesa
              </h2>
              <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                Salgados, doces e sucos do dia servidos na livraria
              </p>

              {featured ? (
                <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-2 md:gap-3">
                  <figure className="cdt-gallery-feature overflow-hidden rounded-sm border border-hairline md:col-span-2 md:row-span-2">
                    <img
                      src={featured.src}
                      alt={featured.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full min-h-[220px] w-full object-cover md:min-h-[360px]"
                    />
                    <figcaption className="px-3 py-2 text-xs text-foreground-muted">
                      {featured.label}
                    </figcaption>
                  </figure>

                  {supporting.map((image) => (
                    <figure
                      key={image.slug}
                      className="overflow-hidden rounded-sm border border-hairline"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="px-3 py-2 text-xs text-foreground-muted">
                        {image.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </FadeIn>
          </div>
        </section>

        <section className="section-padding border-b border-hairline bg-surface">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                O que pedir
              </h2>
              <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                Doces, salgados e sucos do dia na livraria
              </p>
              <div className="mt-6 flex flex-col gap-5">
                {CAFE_DA_TARDE_ITEMS.map((item) => (
                  <ExperienceMenuItem key={item.name} item={item} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="font-garamond text-lg italic text-foreground-muted">
                Reserve sua mesa para o próximo café da tarde.
              </p>
              <button
                type="button"
                onClick={openReservation}
                className="btn-primary focus-ring mt-6 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Fazer reserva
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
