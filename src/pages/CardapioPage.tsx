import { useEffect, useMemo, useRef, useState } from "react";
import { CardapioHero } from "@/components/CardapioHero";
import { CardapioSectionNav } from "@/components/CardapioSectionNav";
import { FadeIn } from "@/components/FadeIn";
import { useCardapioSectionSpy } from "@/hooks/useCardapioSectionSpy";
import {
  CARDAPIO_CAPAS,
  CARDAPIO_SECTIONS,
  type CardapioLang,
} from "@/lib/cardapio-images";

export default function CardapioPage() {
  const [lang, setLang] = useState<CardapioLang | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const sections = lang ? CARDAPIO_SECTIONS[lang] : [];
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );
  const activeSectionId = useCardapioSectionSpy(sectionIds, lang !== null);

  useEffect(() => {
    if (!lang) return;
    const timer = setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-hairline bg-background/90 px-5 backdrop-blur-md md:px-8">
        <button
          type="button"
          onClick={() => {
            if (lang) {
              setLang(null);
            } else {
              window.location.href = "/";
            }
          }}
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
          {lang ? "Escolher idioma" : "Voltar"}
        </button>

        <span className="font-display text-sm tracking-tight text-foreground">
          Café com Letras · Cardápio
        </span>

        <span className="w-16" aria-hidden />
      </header>

      <main className="min-h-dvh bg-background">
        {!lang && (
          <>
            <CardapioHero />

            <div className="section-padding">
              <FadeIn className="mx-auto max-w-2xl text-center">
                <p className="section-eyebrow">Escolha o idioma</p>
                <h2 className="mt-2 font-display text-xl tracking-tight text-foreground md:text-2xl">
                  Abrir cardápio
                </h2>
              </FadeIn>

              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 md:gap-6">
                {(["pt", "en"] as CardapioLang[]).map((key) => {
                  const capa = CARDAPIO_CAPAS[key];
                  return (
                    <FadeIn key={key} delay={key === "en" ? 0.1 : 0}>
                      <button
                        type="button"
                        onClick={() => setLang(key)}
                        className="group focus-ring w-full overflow-hidden rounded-md border border-hairline transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(212,163,115,0.15)]"
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={capa.src}
                            alt={capa.label}
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                          />
                        </div>

                        <div className="border-t border-hairline bg-surface px-4 py-3 text-left">
                          <p className="font-display text-sm text-foreground md:text-base">
                            {capa.label}
                          </p>
                          <p className="mt-0.5 text-xs text-foreground-muted">
                            {key === "pt" ? "Português" : "English"}
                          </p>
                        </div>
                      </button>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {lang && (
          <div ref={menuRef}>
            <div className="sticky top-14 z-40 lg:hidden">
              <CardapioSectionNav
                sections={sections}
                activeId={activeSectionId}
                variant="mobile"
              />
            </div>

            <div className="mx-auto flex max-w-6xl justify-center px-4 py-6 md:px-6 lg:px-8">
              <aside className="hidden w-44 shrink-0 lg:block xl:w-48">
                <CardapioSectionNav
                  sections={sections}
                  activeId={activeSectionId}
                  variant="desktop"
                />
              </aside>

              <div className="w-full max-w-[700px] lg:mx-8">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-label={section.label}
                    className="scroll-mt-[7.5rem] lg:scroll-mt-20"
                  >
                    <img
                      src={section.src}
                      alt={
                        index === 0
                          ? `Cardápio do Café com Letras — ${section.label}`
                          : section.label
                      }
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="mb-3 w-full last:mb-0"
                    />
                  </section>
                ))}

                <p className="mt-6 text-center text-xs text-foreground-muted/60">
                  Valores sujeitos a alteração — consulte no café.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setLang(null)}
                    className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-hairline px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Ver outro idioma
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
