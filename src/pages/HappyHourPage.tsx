import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import { HappyHourItemCard } from "@/components/HappyHourItemCard";
import { useReservation } from "@/hooks/useReservation";
import { BLUE_MOON_IMAGES } from "@/lib/blue-moon-images";
import { HAPPY_HOUR_CATEGORIAS, HAPPY_HOUR_INFO } from "@/lib/happy-hour";

export default function HappyHourPage() {
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-hairline bg-background/90 px-5 backdrop-blur-md md:px-8">
        <a
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </a>

        <span className="font-display text-sm tracking-tight text-foreground">
          Happy Hour · Café com Letras
        </span>

        <span className="w-16" aria-hidden />
      </header>

      <main ref={contentRef} className="bg-background">
        <div className="section-padding border-b border-hairline bg-surface">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <span className="section-eyebrow">Toda quinta · 17h</span>
              <h1 className="section-title mt-2 text-foreground">
                Happy Hour com Blue Moon
              </h1>
              <p className="mx-auto mt-4 max-w-md font-garamond text-xl italic leading-relaxed text-foreground-muted">
                {HAPPY_HOUR_INFO.descricao}
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-hairline" aria-hidden />
                <span className="text-xs uppercase tracking-[0.14em] text-foreground-muted/60">
                  {HAPPY_HOUR_INFO.diaSemana} · {HAPPY_HOUR_INFO.horario}
                </span>
                <span className="h-px w-8 bg-hairline" aria-hidden />
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="section-padding mx-auto max-w-3xl space-y-14">
          {HAPPY_HOUR_CATEGORIAS.map((categoria, catIndex) => (
            <FadeIn key={categoria.id} delay={0.06 * catIndex}>
              <div>
                <div className="mb-6">
                  <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                    {categoria.label}
                  </h2>
                  {categoria.sublabel ? (
                    <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                      {categoria.sublabel}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4">
                  {categoria.items.map((item) => (
                    <HappyHourItemCard key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {BLUE_MOON_IMAGES.length > 1 ? (
          <div className="section-padding border-t border-hairline bg-surface">
            <div className="mx-auto max-w-3xl">
              <FadeIn>
                <p className="section-eyebrow mb-6 text-center">Galeria</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {BLUE_MOON_IMAGES.slice(1).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-sm"
                    >
                      <img
                        src={src}
                        alt="Happy Hour Café com Letras"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-[filter] duration-300 hover:brightness-105"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        ) : null}

        <div className="section-padding border-t border-hairline">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="font-garamond text-lg italic text-foreground-muted">
                Garanta sua mesa para a próxima quinta.
              </p>
              <button
                type="button"
                onClick={openReservation}
                className="btn-primary focus-ring mt-6 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
              >
                Fazer reserva
              </button>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
