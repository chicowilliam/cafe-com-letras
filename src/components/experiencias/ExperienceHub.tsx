import { useCallback, useEffect, useState } from "react";
import { ExperienceHubPreview } from "@/components/experiencias/ExperienceHubPreview";
import { ExperienceHubSelector } from "@/components/experiencias/ExperienceHubSelector";
import {
  EXPERIENCIAS_CATALOG,
  type ExperienciaId,
} from "@/lib/experiencias";

const ENTRY_IDS = EXPERIENCIAS_CATALOG.map((entry) => entry.id);

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

export function ExperienceHub() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<ExperienciaId>("cafe-da-tarde");

  const activeEntry =
    EXPERIENCIAS_CATALOG.find((entry) => entry.id === activeId) ??
    EXPERIENCIAS_CATALOG[0];

  const selectByOffset = useCallback((offset: number) => {
    setActiveId((current) => {
      const index = ENTRY_IDS.indexOf(current);
      const nextIndex = (index + offset + ENTRY_IDS.length) % ENTRY_IDS.length;
      return ENTRY_IDS[nextIndex];
    });
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
        selectByOffset(1);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        selectByOffset(-1);
        return;
      }

      const digit = Number(event.key);
      if (digit >= 1 && digit <= ENTRY_IDS.length) {
        setActiveId(ENTRY_IDS[digit - 1]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectByOffset]);

  return (
    <section className="exp-hub-command" data-active-theme={activeId}>
      <div className="exp-hub-command__ambient" aria-hidden />
      <div className="exp-hub-command__grain" aria-hidden />
      <div className="exp-hub-command__inner">
        <header className="exp-hub-command__header">
          <div>
            <p className="exp-hub-command__eyebrow">Como viver a casa</p>
            <h1 className="exp-hub-command__title font-display">Experiências</h1>
          </div>
          <p className="exp-hub-command__hint hidden lg:block">
            <kbd className="exp-hub-kbd">↑</kbd>
            <kbd className="exp-hub-kbd">↓</kbd>
            <span>ou</span>
            <kbd className="exp-hub-kbd">1</kbd>
            <kbd className="exp-hub-kbd">2</kbd>
            <kbd className="exp-hub-kbd">3</kbd>
          </p>
        </header>

        <div className="exp-hub-command__body">
          <ExperienceHubSelector
            entries={EXPERIENCIAS_CATALOG}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <ExperienceHubPreview
            entries={EXPERIENCIAS_CATALOG}
            activeEntry={activeEntry}
            reduceMotion={reduceMotion}
            onSelect={setActiveId}
          />
        </div>

        <p className="exp-hub-command__footer">
          Jazz e programação cultural na{" "}
          <a href="/#programacao">agenda do site</a>.
        </p>
      </div>
    </section>
  );
}
