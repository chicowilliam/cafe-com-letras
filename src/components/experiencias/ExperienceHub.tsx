import { AppLink } from "@/components/AppLink";
import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ExperienceHubCommandBar,
  ExperienceHubFilters,
} from "@/components/experiencias/ExperienceHubCommandBar";
import { ExperienceHubMobile } from "@/components/experiencias/ExperienceHubMobile";
import { ExperienceHubTriptych } from "@/components/experiencias/ExperienceHubTriptych";
import { SectionHandoff } from "@/components/SectionBridge";
import { useExpHubPerfMode } from "@/hooks/useExpHubPerfMode";
import {
  DESKTOP_BP,
  getInitialActiveIndex,
  getHubIndexFromHighlight,
  HUB_TOTAL,
} from "@/lib/experience-hub-utils";
import {
  initExpHubChromeTheme,
  resetExpHubChrome,
  syncExpHubChromeTheme,
} from "@/lib/exp-hub-chrome-store";
import {
  EXPERIENCIAS_CATALOG,
  type ExperienciaId,
} from "@/lib/experiencias";

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduceMotion;
}

function useIsDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(DESKTOP_BP).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_BP);
    const onChange = () => setIsDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export function ExperienceHub() {
  const reduceMotion = useReducedMotion();
  const perfMode = useExpHubPerfMode(reduceMotion);
  const isDesktop = useIsDesktopLayout();
  const [searchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex);

  const activeEntry = EXPERIENCIAS_CATALOG[activeIndex] ?? EXPERIENCIAS_CATALOG[0];
  const didInitChrome = useRef(false);

  const goToIndex = useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(Math.max(0, Math.min(HUB_TOTAL - 1, index)));
    });
  }, []);

  const goPrev = useCallback(() => {
    startTransition(() => {
      setActiveIndex((current) => Math.max(0, current - 1));
    });
  }, []);

  const goNext = useCallback(() => {
    startTransition(() => {
      setActiveIndex((current) => Math.min(HUB_TOTAL - 1, current + 1));
    });
  }, []);

  useEffect(() => {
    if (!didInitChrome.current) {
      didInitChrome.current = true;
      initExpHubChromeTheme(activeEntry.id);
      return;
    }

    syncExpHubChromeTheme(activeEntry.id);
  }, [activeEntry.id]);

  useEffect(() => () => resetExpHubChrome(), []);

  useEffect(() => {
    const highlightIndex = getHubIndexFromHighlight(searchParams.get("highlight"));
    if (highlightIndex !== null) {
      goToIndex(highlightIndex);
    }
  }, [searchParams, goToIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }

      const digit = Number(event.key);
      if (digit >= 1 && digit <= HUB_TOTAL) {
        goToIndex(digit - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goToIndex]);

  const filtersBlock = (
    <>
      <SectionHandoff
        variant="breath"
        from="background"
        to="background"
        dividerCurve="swell"
        className="exp-hub-command__handoff exp-hub-command__handoff--filters"
      />
      <ExperienceHubFilters
        entries={EXPERIENCIAS_CATALOG}
        activeIndex={activeIndex}
        onSelect={goToIndex}
      />
    </>
  );

  return (
    <section
      className={`exp-hub-command${perfMode ? " exp-hub-command--perf" : ""}`}
      data-active-theme={activeEntry.id as ExperienciaId}
    >
      <div className="exp-hub-command__inner">
        <header className="exp-hub-command__header">
          <p className="exp-hub-command__eyebrow">Como viver a casa</p>
          <h1 className="exp-hub-command__title font-display">Experiências</h1>
        </header>

        <ExperienceHubCommandBar
          entries={EXPERIENCIAS_CATALOG}
          activeIndex={activeIndex}
          onSelect={goToIndex}
        />

        <SectionHandoff
          variant="breath"
          from="background"
          to="background"
          dividerCurve="swell"
          className="exp-hub-command__handoff exp-hub-command__handoff--intro"
        />

        <div className="exp-hub-command__body">
          {isDesktop ? (
            <>
              <ExperienceHubTriptych
                entries={EXPERIENCIAS_CATALOG}
                activeIndex={activeIndex}
                reduceMotion={reduceMotion}
                perfMode={perfMode}
                onActiveIndexChange={goToIndex}
              />
              {filtersBlock}
            </>
          ) : (
            <ExperienceHubMobile
              entries={EXPERIENCIAS_CATALOG}
              activeIndex={activeIndex}
              onSelect={goToIndex}
              filters={filtersBlock}
            />
          )}
        </div>

        <p className="exp-hub-command__footer">
          Jazz e programação cultural na{" "}
          <AppLink to="/programacao">
            agenda do site
          </AppLink>
          .
        </p>
      </div>
    </section>
  );
}
