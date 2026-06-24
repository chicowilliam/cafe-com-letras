import { ArrowRight } from "lucide-react";
import type { ExperienciaCatalogEntry, ExperienciaId } from "@/lib/experiencias";

type ExperienceHubPreviewProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeEntry: ExperienciaCatalogEntry;
  reduceMotion: boolean;
  onSelect: (id: ExperienciaId) => void;
};

function TriptychSideCard({
  entry,
  onSelect,
}: {
  entry: ExperienciaCatalogEntry;
  onSelect: (id: ExperienciaId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(entry.id)}
      className={`exp-hub-triptych__side exp-hub-triptych__side--${entry.id} focus-ring`}
      aria-label={`Ver ${entry.title}`}
    >
      <span className="exp-hub-triptych__side-media">
        <img
          src={entry.image}
          alt=""
          aria-hidden
          className="exp-hub-triptych__side-image"
          loading="lazy"
          decoding="async"
        />
        <span className="exp-hub-triptych__side-overlay" aria-hidden />
      </span>
      <span className="exp-hub-triptych__side-copy">
        <span className="exp-hub-triptych__side-band">{entry.timeBandLabel}</span>
        <span className="exp-hub-triptych__side-title">{entry.title}</span>
      </span>
    </button>
  );
}

export function ExperienceHubPreview({
  entries,
  activeEntry,
  reduceMotion,
  onSelect,
}: ExperienceHubPreviewProps) {
  const inactiveEntries = entries.filter((entry) => entry.id !== activeEntry.id);
  const [leftEntry, rightEntry] = inactiveEntries;

  return (
    <div
      id="exp-hub-preview"
      role="tabpanel"
      aria-labelledby={`exp-tab-${activeEntry.id}`}
      className={`exp-hub-triptych exp-hub-triptych--${activeEntry.id}`}
    >
      {leftEntry ? (
        <TriptychSideCard entry={leftEntry} onSelect={onSelect} />
      ) : (
        <span className="hidden md:block" aria-hidden />
      )}

      <article
        className={`exp-hub-preview exp-hub-preview--${activeEntry.id}`}
      >
        <div className="exp-hub-preview__glow" aria-hidden />
        <div className="exp-hub-preview__media">
          {entries.map((entry) => {
            const isActive = entry.id === activeEntry.id;
            return (
              <img
                key={entry.id}
                src={entry.image}
                alt={isActive ? entry.imageAlt : ""}
                aria-hidden={!isActive}
                className={`exp-hub-preview__image ${
                  isActive ? "is-active" : ""
                } ${reduceMotion ? "exp-hub-preview__image--static" : ""}`}
                loading={entry.id === entries[0]?.id ? "eager" : "lazy"}
                decoding="async"
              />
            );
          })}
          <div className="exp-hub-preview__overlay" aria-hidden />
        </div>

        <div className="exp-hub-preview__content">
          <p className="exp-hub-preview__eyebrow">{activeEntry.eyebrow}</p>
          <h2 className="exp-hub-preview__title font-display">{activeEntry.title}</h2>
          <p className="exp-hub-preview__schedule">{activeEntry.scheduleShort}</p>
          <p className="exp-hub-preview__tagline">{activeEntry.tagline}</p>
          <ul className="exp-hub-preview__highlights">
            {activeEntry.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href={activeEntry.href}
            className="exp-hub-preview__cta btn-primary focus-ring inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Explorar experiência
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </article>

      {rightEntry ? (
        <TriptychSideCard entry={rightEntry} onSelect={onSelect} />
      ) : (
        <span className="hidden md:block" aria-hidden />
      )}
    </div>
  );
}
