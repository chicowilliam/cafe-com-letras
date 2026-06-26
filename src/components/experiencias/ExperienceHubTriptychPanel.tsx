import { AppLink } from "@/components/AppLink";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import {
  ACTIVE_PANEL_FLEX,
  INACTIVE_PANEL_FLEX,
  PREMIUM_EASE,
} from "@/lib/experience-hub-utils";

type ExperienceHubTriptychPanelProps = {
  entry: ExperienciaCatalogEntry;
  index: number;
  isActive: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
};

export const ExperienceHubTriptychPanel = memo(function ExperienceHubTriptychPanel({
  entry,
  index,
  isActive,
  reduceMotion,
  onActivate,
}: ExperienceHubTriptychPanelProps) {
  const flexGrow = isActive ? ACTIVE_PANEL_FLEX : INACTIVE_PANEL_FLEX;

  return (
    <button
      type="button"
      role="tab"
      id={`exp-hub-tab-${entry.id}`}
      aria-selected={isActive}
      aria-controls={`exp-hub-panel-${entry.id}`}
      aria-label={`${entry.title} — ${entry.timeBandLabel}`}
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`exp-hub-editorial__panel exp-hub-editorial__panel--${entry.id} focus-ring ${
        isActive ? "is-active" : ""
      }`}
      style={{
        flexGrow,
        flexBasis: 0,
        transition: reduceMotion
          ? undefined
          : `flex-grow 550ms ${PREMIUM_EASE}, opacity 550ms ${PREMIUM_EASE}, transform 550ms ${PREMIUM_EASE}`,
      }}
    >
      <div
        id={`exp-hub-panel-${entry.id}`}
        role="tabpanel"
        aria-labelledby={`exp-hub-tab-${entry.id}`}
        className="exp-hub-editorial__panel-inner"
      >
        <img
          src={entry.image}
          alt=""
          aria-hidden
          className="exp-hub-editorial__image"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="exp-hub-editorial__overlay" aria-hidden />

        <div className="exp-hub-editorial__content">
          {isActive ? (
            <>
              <p className="exp-hub-editorial__eyebrow">{entry.eyebrow}</p>
              <h2 className="exp-hub-editorial__title font-display">{entry.title}</h2>
              <p className="exp-hub-editorial__schedule">{entry.scheduleShort}</p>
              <p className="exp-hub-editorial__tagline">{entry.tagline}</p>
              <ul className="exp-hub-editorial__highlights">
                {entry.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <AppLink
                to={entry.href}
                className="exp-hub-editorial__cta btn-primary focus-ring"
                onClick={(event) => event.stopPropagation()}
              >
                Explorar experiência
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
              </AppLink>
            </>
          ) : (
            <>
              <p className="exp-hub-editorial__band">{entry.timeBandLabel}</p>
              <h2 className="exp-hub-editorial__title exp-hub-editorial__title--compact font-display">
                {entry.title}
              </h2>
              <p className="exp-hub-editorial__schedule">{entry.scheduleShort}</p>
            </>
          )}
        </div>
      </div>

      <span className="sr-only">
        Painel {index + 1}: {entry.title}
      </span>
    </button>
  );
});
