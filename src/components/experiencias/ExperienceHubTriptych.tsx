import { LayoutGroup } from "framer-motion";
import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { ExperienceHubTriptychPanel } from "@/components/experiencias/ExperienceHubTriptychPanel";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import {
  HUB_HOVER_ACTIVATE_MS,
  HUB_TOTAL,
  TRIPTYCH_HEIGHT,
} from "@/lib/experience-hub-utils";

type ExperienceHubTriptychProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  reduceMotion: boolean;
  perfMode: boolean;
  onActiveIndexChange: (index: number) => void;
};

export function ExperienceHubTriptych({
  entries,
  activeIndex,
  reduceMotion,
  perfMode,
  onActiveIndexChange,
}: ExperienceHubTriptychProps) {
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearHoverTimer(), [clearHoverTimer]);

  const handlePanelHover = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      clearHoverTimer();

      if (reduceMotion || perfMode) {
        onActiveIndexChange(index);
        return;
      }

      hoverTimerRef.current = setTimeout(() => {
        onActiveIndexChange(index);
        hoverTimerRef.current = null;
      }, HUB_HOVER_ACTIVATE_MS);
    },
    [activeIndex, clearHoverTimer, onActiveIndexChange, perfMode, reduceMotion],
  );

  const handlePanelActivate = useCallback(
    (index: number) => {
      clearHoverTimer();
      onActiveIndexChange(index);
    },
    [clearHoverTimer, onActiveIndexChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onActiveIndexChange(Math.max(0, activeIndex - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onActiveIndexChange(Math.min(HUB_TOTAL - 1, activeIndex + 1));
      }
    },
    [activeIndex, onActiveIndexChange],
  );

  return (
    <div
      className="exp-hub-editorial-wrap"
      role="tablist"
      aria-label="Experiências — tríptico editorial"
      onKeyDown={handleKeyDown}
      onMouseLeave={clearHoverTimer}
    >
      <LayoutGroup id="exp-hub-triptych">
        <div className="exp-hub-editorial" style={{ height: TRIPTYCH_HEIGHT }}>
          {entries.map((entry, index) => (
            <ExperienceHubTriptychPanel
              key={entry.id}
              entry={entry}
              index={index}
              isActive={activeIndex === index}
              reduceMotion={reduceMotion || perfMode}
              onHover={() => handlePanelHover(index)}
              onActivate={() => handlePanelActivate(index)}
            />
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}
