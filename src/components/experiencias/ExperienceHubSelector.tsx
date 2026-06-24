import type { ExperienciaCatalogEntry, ExperienciaId } from "@/lib/experiencias";

type ExperienceHubSelectorProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeId: ExperienciaId;
  onSelect: (id: ExperienciaId) => void;
};

export function ExperienceHubSelector({
  entries,
  activeId,
  onSelect,
}: ExperienceHubSelectorProps) {
  return (
    <div
      className="exp-hub-mini-grid md:hidden"
      role="tablist"
      aria-label="Experiências gastronômicas"
    >
      {entries.map((entry) => {
        const isActive = entry.id === activeId;
        return (
          <button
            key={entry.id}
            type="button"
            role="tab"
            id={`exp-tab-${entry.id}`}
            aria-selected={isActive}
            aria-controls="exp-hub-preview"
            onClick={() => onSelect(entry.id)}
            className={`exp-hub-mini-card exp-hub-mini-card--${entry.id} focus-ring ${
              isActive ? "is-active" : ""
            }`}
          >
            <span className="exp-hub-mini-card__media">
              <img
                src={entry.image}
                alt=""
                aria-hidden
                className="exp-hub-mini-card__image"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="exp-hub-mini-card__body">
              <span className="exp-hub-mini-card__band">{entry.timeBandLabel}</span>
              <span className="exp-hub-mini-card__title">{entry.title}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
