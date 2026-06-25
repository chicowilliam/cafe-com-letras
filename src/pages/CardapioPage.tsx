import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardapioMenuViewer } from "@/components/cardapio/CardapioMenuViewer";
import { CardapioPrintContextPanel } from "@/components/cardapio/CardapioPrintContextPanel";
import { CardapioPrintViewer } from "@/components/cardapio/CardapioPrintViewer";
import { CardapioViewToggle } from "@/components/cardapio/CardapioViewToggle";
import { CardapioSectionNav } from "@/components/CardapioSectionNav";
import { FadeIn } from "@/components/FadeIn";
import { useCardapioSectionSpy } from "@/hooks/useCardapioSectionSpy";
import { useCardapioViewMode } from "@/hooks/useCardapioViewMode";
import { useSubpageChrome } from "@/hooks/useSubpageChrome";
import { getCatalogSectionsWithItems } from "@/lib/cardapio-catalog";
import {
  CARDAPIO_CAPAS,
  CARDAPIO_SECTIONS,
  type CardapioLang,
  type CardapioSection,
} from "@/lib/cardapio-images";
import { viewTransitionNavigateOptions } from "@/lib/navigation";

function toNavSections(
  entries: Array<{ id: string; label: string }>,
): CardapioSection[] {
  return entries.map((entry) => ({ ...entry, src: "" }));
}

export default function CardapioPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<CardapioLang | null>(null);
  const [viewMode, setViewMode] = useCardapioViewMode();
  const menuRef = useRef<HTMLDivElement>(null);

  const imageSections = lang ? CARDAPIO_SECTIONS[lang] : [];
  const printSections = lang ? getCatalogSectionsWithItems(lang) : [];

  const navSections = useMemo(() => {
    if (!lang) return [];
    if (viewMode === "sheet") return imageSections;
    return toNavSections(printSections);
  }, [imageSections, lang, printSections, viewMode]);

  const sectionIds = useMemo(
    () => navSections.map((section) => section.id),
    [navSections],
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
      ...(lang
        ? { navEyebrow: "da cozinha mineira ao café autoral" }
        : {}),
    }),
    [lang, handleBack],
  );

  const cardapioSkin = !lang
    ? "picker"
    : viewMode === "print"
      ? "print"
      : "sheet";

  useSubpageChrome(chromeOverride);

  useEffect(() => {
    if (!lang) return;
    const timer = setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <main
      className="min-h-dvh"
      data-page="cardapio"
      data-cardapio-skin={cardapioSkin}
    >
      {!lang && (
        <div className="section-padding cardapio-picker">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="cardapio-picker__kicker">Savassi · Belo Horizonte</p>
            <h1 className="cardapio-picker__title font-display">Cardápio</h1>
            <p className="cardapio-picker__tagline font-garamond">
              da cozinha mineira ao café autoral
            </p>
            <p className="cardapio-picker__edition">
              Edição {new Date("2026-06-01").toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
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
                        {key === "pt"
                          ? "Carta completa · Ler ou folhear"
                          : "Full menu · Read or browse"}
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
        <div ref={menuRef} className="cardapio-page__stage">
          <div className="sticky top-14 z-40 lg:hidden">
            <CardapioSectionNav
              sections={navSections}
              activeId={activeSectionId}
              variant="mobile"
              lang={lang}
            />
          </div>

          <div className="cardapio-page__triptych mx-auto px-4 py-4 md:px-6 lg:px-8">
            <aside className="cardapio-page__aside cardapio-page__aside--nav hidden shrink-0 lg:block">
              <CardapioSectionNav
                sections={navSections}
                activeId={activeSectionId}
                variant="desktop"
                lang={lang}
              />
            </aside>

            <div
              className={`cardapio-page__content w-full min-w-0 ${
                viewMode === "print"
                  ? "cardapio-page__content--print"
                  : "cardapio-page__content--sheet max-w-[500px] lg:mx-auto"
              }`}
            >
              <div className="cardapio-page__toolbar">
                <CardapioViewToggle
                  lang={lang}
                  mode={viewMode}
                  onChange={setViewMode}
                />
              </div>

              {viewMode === "sheet" ? (
                <CardapioMenuViewer
                  sections={imageSections}
                  activeSectionId={activeSectionId}
                  onChangeLang={() => setLang(null)}
                />
              ) : (
                <CardapioPrintViewer
                  lang={lang}
                  onChangeLang={() => setLang(null)}
                />
              )}
            </div>

            {viewMode === "print" ? (
              <div className="cardapio-page__aside cardapio-page__aside--context hidden shrink-0 xl:block">
                <CardapioPrintContextPanel lang={lang} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
