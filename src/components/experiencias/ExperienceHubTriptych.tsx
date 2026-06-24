import { useCallback, type KeyboardEvent } from "react";
import { ExperienceHubTriptychPanel } from "@/components/experiencias/ExperienceHubTriptychPanel";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import { HUB_TOTAL, TRIPTYCH_HEIGHT } from "@/lib/experience-hub-utils";

type ExperienceHubTriptychProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  reduceMotion: boolean;
  onActiveIndexChange: (index: number) => void;
};

export function ExperienceHubTriptych({
  entries,
  activeIndex,
  reduceMotion,
  onActiveIndexChange,
}: ExperienceHubTriptychProps) {
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
    >
      <div
        className="exp-hub-editorial"
        style={{ height: TRIPTYCH_HEIGHT }}
      >
        {entries.map((entry, index) => (
          <ExperienceHubTriptychPanel
            key={entry.id}
            entry={entry}
            index={index}
            isActive={activeIndex === index}
            reduceMotion={reduceMotion}
            onActivate={() => onActiveIndexChange(index)}
          />
        ))}
      </div>
    </div>
  );
}
