import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardapioMenuViewer } from "@/components/cardapio/CardapioMenuViewer";
import { CardapioPrintContextPanel } from "@/components/cardapio/CardapioPrintContextPanel";
import { CardapioPrintViewer } from "@/components/cardapio/CardapioPrintViewer";
import { CardapioViewToggle } from "@/components/cardapio/CardapioViewToggle";
import { CardapioSectionNav } from "@/components/CardapioSectionNav";
import { FadeIn } from "@/components/FadeIn";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { SectionHandoff } from "@/components/SectionBridge";
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
import { navigateWithTransition } from "@/lib/navigation";

function toNavSections(
  entries: Array<{ id: string; label: string }>,
): CardapioSection[] {
  return entries.map((entry) => ({ ...entry, src: "" }));
}

const LANG_CARD_COPY = {
  pt: {
    language: "Português",
    title: "Cardápio",
    hint: "Carta completa · Ler ou folhear",
    stamp: "BR",
  },
  en: {
    language: "English",
    title: "Menu",
    hint: "Full menu · Read or browse",
    stamp: "EN",
  },
} as const;

/** Âmbar do site (selos / divisores) — contraste real sobre o bege do papel */
const CARDAPIO_PATTERN_COLOR = "#6b4f1a";

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
    navigateWithTransition(navigate, "/");
  }, [lang, navigate]);

  const chromeOverride = useMemo(
    () => ({
      backLabel: lang ? "Escolher idioma" : "Voltar",
      onBack: handleBack,
      endAction: "home" as const,
      navEyebrow: lang
        ? "da cozinha mineira ao café autoral"
        : "Savassi · Belo Horizonte",
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
    document.documentElement.setAttribute("data-cardapio-skin", cardapioSkin);
    return () => {
      document.documentElement.removeAttribute("data-cardapio-skin");
    };
  }, [cardapioSkin]);

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
      {cardapioSkin !== "print" ? (
        <BackgroundPattern
          variant="constellation"
          mode="absolute"
          opacity={0.14}
          color={CARDAPIO_PATTERN_COLOR}
          weight="strong"
          parallax
          className="cardapio-page__pattern"
        />
      ) : null}

      {!lang ? <h1 className="sr-only">Cardápio</h1> : null}

      {!lang && (
        <div className="cardapio-picker">
          <FadeIn className="cardapio-picker__intro">
            <p className="cardapio-picker__tagline font-garamond">
              da cozinha mineira ao café autoral
            </p>
            <p className="cardapio-picker__edition">
              Edição{" "}
              {new Date("2026-06-01").toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </FadeIn>

          <SectionHandoff
            variant="breath"
            from="background"
            to="background"
            dividerCurve="swell"
            className="cardapio-picker__handoff"
          />

          <div className="cardapio-picker__stage">
            <div className="cardapio-picker__rail cardapio-picker__rail--left" aria-hidden>
              <BackgroundPattern
                variant="constellation"
                mode="absolute"
                opacity={0.17}
                color={CARDAPIO_PATTERN_COLOR}
                weight="strong"
                focus="left"
                parallax={false}
                className="cardapio-picker__rail-pattern"
              />
            </div>

            <div className="cardapio-picker__grid">
              {(["pt", "en"] as CardapioLang[]).map((key) => {
                const capa = CARDAPIO_CAPAS[key];
                const copy = LANG_CARD_COPY[key];
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
                          alt={`${copy.title} — ${copy.language}`}
                          loading="eager"
                          decoding="async"
                          className="cardapio-lang-card__image"
                        />
                        {/* Cobre tipografia embutida na foto (PORTUGUÊS / ENGLISH) */}
                        <div className="cardapio-lang-card__band" aria-hidden />
                        <div className="cardapio-lang-card__scrim" aria-hidden />
                        <div className="cardapio-lang-card__caption">
                          <span className="cardapio-lang-card__stamp" aria-hidden>
                            {copy.stamp}
                          </span>
                          <p className="cardapio-lang-card__language">
                            {copy.language}
                          </p>
                          <span className="cardapio-lang-card__rule" aria-hidden />
                        </div>
                        <span className="cardapio-lang-card__arrow" aria-hidden>
                          <ArrowUpRight size={16} strokeWidth={1.5} />
                        </span>
                      </div>

                      <div className="cardapio-lang-card__footer">
                        <span className="cardapio-lang-card__icon" aria-hidden>
                          <BookOpen size={15} strokeWidth={1.5} />
                        </span>
                        <div className="cardapio-lang-card__meta">
                          <p className="cardapio-lang-card__title">{copy.title}</p>
                          <p className="cardapio-lang-card__hint">{copy.hint}</p>
                        </div>
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>

            <div className="cardapio-picker__rail cardapio-picker__rail--right" aria-hidden>
              <BackgroundPattern
                variant="constellation"
                mode="absolute"
                opacity={0.17}
                color={CARDAPIO_PATTERN_COLOR}
                weight="strong"
                focus="right"
                parallax={false}
                className="cardapio-picker__rail-pattern"
              />
            </div>
          </div>
        </div>
      )}

      {lang && (
        <div ref={menuRef} className="cardapio-page__stage">
          <div className="sticky top-12 z-40 lg:hidden">
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
