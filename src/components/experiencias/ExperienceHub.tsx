import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ExperienceHubCommandBar } from "@/components/experiencias/ExperienceHubCommandBar";
import { ExperienceHubMobile } from "@/components/experiencias/ExperienceHubMobile";
import { ExperienceHubTriptych } from "@/components/experiencias/ExperienceHubTriptych";
import {
  DESKTOP_BP,
  getInitialActiveIndex,
  HUB_TOTAL,
} from "@/lib/experience-hub-utils";
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
  const isDesktop = useIsDesktopLayout();
  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex);

  const activeEntry = EXPERIENCIAS_CATALOG[activeIndex] ?? EXPERIENCIAS_CATALOG[0];

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(HUB_TOTAL - 1, index)));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => Math.min(HUB_TOTAL - 1, current + 1));
  }, []);

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

  return (
    <section
      className="exp-hub-command"
      data-active-theme={activeEntry.id as ExperienciaId}
    >
      <div className="exp-hub-command__ambient" aria-hidden />
      <div className="exp-hub-command__grain" aria-hidden />
      <div className="exp-hub-command__inner">
        <header className="exp-hub-command__header">
          <p className="exp-hub-command__eyebrow">Como viver a casa</p>
          <h1 className="exp-hub-command__title font-display">Experiências</h1>
        </header>

        <ExperienceHubCommandBar
          entries={EXPERIENCIAS_CATALOG}
          activeIndex={activeIndex}
          onSelect={goToIndex}
          onPrev={goPrev}
          onNext={goNext}
        />

        <div className="exp-hub-command__body">
          {isDesktop ? (
            <ExperienceHubTriptych
              entries={EXPERIENCIAS_CATALOG}
              activeIndex={activeIndex}
              reduceMotion={reduceMotion}
              onActiveIndexChange={goToIndex}
            />
          ) : (
            <ExperienceHubMobile
              entries={EXPERIENCIAS_CATALOG}
              activeIndex={activeIndex}
              onSelect={goToIndex}
            />
          )}
        </div>

        <p className="exp-hub-command__footer">
          Jazz e programação cultural na{" "}
          <Link to="/#programacao" viewTransition>
            agenda do site
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
