import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ExperienciaCatalogEntry, ExperienciaId } from "@/lib/experiencias";
import { getExperienciasAtivasHoje } from "@/lib/experiencias";
import { PREMIUM_EASE } from "@/lib/experience-hub-utils";

type ExperienceHubCommandBarProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ExperienceHubCommandBar({
  entries,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
}: ExperienceHubCommandBarProps) {
  const activeToday = getExperienciasAtivasHoje();
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === entries.length - 1;

  const handleTodayChip = (id: ExperienciaId) => {
    const index = entries.findIndex((entry) => entry.id === id);
    if (index >= 0) onSelect(index);
  };

  return (
    <div className="exp-hub-command-bar">
      <p className="exp-hub-command-bar__subtitle">
        Da tarde descontraída ao romance da noite — três momentos na Savassi.
      </p>

      <div className="exp-hub-command-bar__row">
        <div
          className="exp-hub-command-bar__pills"
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
              aria-label={`Ir para ${entry.title}`}
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

        <div className="exp-hub-command-bar__nav">
          <button
            type="button"
            onClick={onPrev}
            disabled={atStart}
            aria-label="Experiência anterior"
            className="exp-hub-command-bar__arrow focus-ring"
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={atEnd}
            aria-label="Próxima experiência"
            className="exp-hub-command-bar__arrow focus-ring"
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="exp-hub-command-bar__today">
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
