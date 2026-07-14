import type { ExperienciaCatalogEntry, ExperienciaId } from "@/lib/experiencias";
import { getExperienciasAtivasHoje } from "@/lib/experiencias";
import { PREMIUM_EASE } from "@/lib/experience-hub-utils";

type ExperienceHubCommandBarProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

/** Intro acima dos cards: subtítulo + badge “Hoje na casa”. */
export function ExperienceHubCommandBar({
  entries,
  activeIndex,
  onSelect,
}: ExperienceHubCommandBarProps) {
  const activeToday = getExperienciasAtivasHoje();

  const handleTodayChip = (id: ExperienciaId) => {
    const index = entries.findIndex((entry) => entry.id === id);
    if (index >= 0) onSelect(index);
  };

  return (
    <div className="exp-hub-command-bar">
      <div className="exp-hub-command-bar__intro">
        <p className="exp-hub-command-bar__subtitle">
          Da tarde descontraída ao romance da noite — três momentos na Savassi.
        </p>

        <div
          className={`exp-hub-command-bar__today exp-hub-command-bar__today--${entries[activeIndex]?.id ?? "cafe-da-tarde"}`}
        >
          <span className="exp-hub-command-bar__today-label">Hoje na casa</span>
          {activeToday.length > 0 ? (
            <div className="exp-hub-command-bar__today-chips">
              {activeToday.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => handleTodayChip(entry.id)}
                  className={`exp-hub-command-bar__today-chip exp-hub-command-bar__today-chip--${entry.id} focus-ring ${
                    entries[activeIndex]?.id === entry.id ? "is-active" : ""
                  }`}
                >
                  {entry.title}
                </button>
              ))}
            </div>
          ) : (
            <span className="exp-hub-command-bar__today-empty">
              Confira os horários
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

type ExperienceHubFiltersProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

/** Filtros TARDE / ENTARDECER / NOITE — abaixo da grade de cards. */
export function ExperienceHubFilters({
  entries,
  activeIndex,
  onSelect,
}: ExperienceHubFiltersProps) {
  return (
    <div
      className="exp-hub-command-bar__filters"
      role="tablist"
      aria-label="Seleção de experiências"
    >
      {entries.map((entry, index) => (
        <button
          key={entry.id}
          type="button"
          role="tab"
          id={`exp-hub-control-tab-${entry.id}`}
          aria-selected={activeIndex === index}
          aria-controls={`exp-hub-panel-${entry.id}`}
          aria-label={`Destacar ${entry.title}`}
          onClick={() => onSelect(index)}
          className={`exp-hub-command-bar__pill exp-hub-command-bar__pill--${entry.id} focus-ring ${
            activeIndex === index ? "is-active" : ""
          }`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          {entry.timeBandLabel}
        </button>
      ))}
    </div>
  );
}
