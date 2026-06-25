import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardapioMenuViewer } from "@/components/cardapio/CardapioMenuViewer";
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
        <div ref={menuRef} className="cardapio-page__stage">
          <div className="sticky top-14 z-40 lg:hidden">
            <CardapioSectionNav
              sections={navSections}
              activeId={activeSectionId}
              variant="mobile"
            />
          </div>

          <div className="mx-auto flex max-w-6xl justify-center px-4 py-4 md:px-6 lg:px-8">
            <aside className="hidden w-40 shrink-0 lg:block xl:w-44">
              <CardapioSectionNav
                sections={navSections}
                activeId={activeSectionId}
                variant="desktop"
              />
            </aside>

            <div
              className={`w-full lg:mx-6 ${
                viewMode === "print"
                  ? "cardapio-page__content--print max-w-[576px]"
                  : "max-w-[500px]"
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
          </div>
        </div>
      )}
    </main>
  );
}
