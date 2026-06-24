import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";

type ExperienceHubMobileProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ExperienceHubMobile({
  entries,
  activeIndex,
  onSelect,
}: ExperienceHubMobileProps) {
  const activeEntry = entries[activeIndex] ?? entries[0];

  return (
    <div className="exp-hub-mobile">
      <div
        className="exp-hub-mobile__grid"
        role="tablist"
        aria-label="Experiências gastronômicas"
      >
        {entries.map((entry, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`exp-hub-mobile-tab-${entry.id}`}
              aria-selected={isActive}
              aria-controls="exp-hub-mobile-detail"
              onClick={() => onSelect(index)}
              className={`exp-hub-mobile__card exp-hub-mobile__card--${entry.id} focus-ring ${
                isActive ? "is-active" : ""
              }`}
            >
              <span className="exp-hub-mobile__card-media">
                <img
                  src={entry.image}
                  alt=""
                  aria-hidden
                  className="exp-hub-mobile__card-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="exp-hub-mobile__card-overlay" aria-hidden />
                <span className="exp-hub-mobile__card-copy">
                  <span className="exp-hub-mobile__card-band">{entry.timeBandLabel}</span>
                  <span className="exp-hub-mobile__card-title">{entry.title}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <article
        id="exp-hub-mobile-detail"
        role="tabpanel"
        aria-labelledby={`exp-hub-mobile-tab-${activeEntry.id}`}
        className={`exp-hub-mobile__detail exp-hub-mobile__detail--${activeEntry.id}`}
      >
        <p className="exp-hub-mobile__detail-eyebrow">{activeEntry.eyebrow}</p>
        <h2 className="exp-hub-mobile__detail-title font-display">{activeEntry.title}</h2>
        <p className="exp-hub-mobile__detail-schedule">{activeEntry.scheduleShort}</p>
        <p className="exp-hub-mobile__detail-tagline">{activeEntry.tagline}</p>
        <ul className="exp-hub-mobile__detail-highlights">
          {activeEntry.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link
          to={activeEntry.href}
          viewTransition
          className="exp-hub-mobile__detail-cta btn-primary focus-ring"
        >
          Explorar experiência
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
        </Link>
      </article>
    </div>
  );
}
