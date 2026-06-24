import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardapioMenuViewer } from "@/components/cardapio/CardapioMenuViewer";
import { CardapioSectionNav } from "@/components/CardapioSectionNav";
import { FadeIn } from "@/components/FadeIn";
import { useCardapioSectionSpy } from "@/hooks/useCardapioSectionSpy";
import { useSubpageChrome } from "@/hooks/useSubpageChrome";
import {
  CARDAPIO_CAPAS,
  CARDAPIO_SECTIONS,
  type CardapioLang,
} from "@/lib/cardapio-images";
import { viewTransitionNavigateOptions } from "@/lib/navigation";

export default function CardapioPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<CardapioLang | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const sections = lang ? CARDAPIO_SECTIONS[lang] : [];
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );
  const activeSectionId = useCardapioSectionSpy(sectionIds, lang !== null);

  const handleBack = useCallback(() => {
    if (lang) {
      setLang(null);
      return;
    }
    navigate("/", viewTransitionNavigateOptions);
  }, [lang, navigate]);

  const chromeOverride = useMemo(
    () => ({
      backLabel: lang ? "Escolher idioma" : "Voltar",
      onBack: handleBack,
    }),
    [lang, handleBack],
  );

  useSubpageChrome(chromeOverride);

  useEffect(() => {
    if (!lang) return;
    const timer = setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <main className="min-h-dvh bg-background" data-page="cardapio">
      {!lang && (
        <div className="section-padding">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Escolha o idioma</p>
            <h1 className="section-title mt-2 text-foreground">Cardápio</h1>
            <p className="mt-3 font-garamond text-lg italic text-foreground-muted">
              da cozinha mineira ao café autoral
            </p>
          </FadeIn>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 md:gap-6">
            {(["pt", "en"] as CardapioLang[]).map((key) => {
              const capa = CARDAPIO_CAPAS[key];
              return (
                <FadeIn key={key} delay={key === "en" ? 0.1 : 0}>
                  <button
                    type="button"
                    onClick={() => setLang(key)}
                    className="cardapio-lang-card focus-ring group w-full text-left"
                  >
                    <div className="cardapio-lang-card__cover">
                      <img
                        src={capa.src}
                        alt={capa.label}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                      />
                    </div>

                    <div className="cardapio-lang-card__footer">
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

            <div className="w-full max-w-[500px] lg:mx-8">
              <CardapioMenuViewer
                sections={sections}
                activeSectionId={activeSectionId}
                onChangeLang={() => setLang(null)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
