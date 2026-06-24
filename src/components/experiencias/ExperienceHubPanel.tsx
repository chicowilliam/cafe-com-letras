import { ArrowRight } from "lucide-react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";

type ExperienceHubPanelProps = {
  entry: ExperienciaCatalogEntry;
  index: number;
  reverse?: boolean;
};

function padIndex(value: number) {
  return String(value + 1).padStart(2, "0");
}

export function ExperienceHubPanel({
  entry,
  index,
  reverse = false,
}: ExperienceHubPanelProps) {
  return (
    <article className="exp-hub-timeline__item">
      <span className="exp-hub-timeline__marker" aria-hidden>
        <span className="exp-hub-timeline__dot" />
        <span className="exp-hub-timeline__band">{entry.timeBandLabel}</span>
      </span>

      <a
        href={entry.href}
        className={`exp-hub-panel exp-hub-panel--${entry.id} group focus-ring ${
          reverse ? "exp-hub-panel--reverse" : ""
        }`}
      >
        <div className="exp-hub-panel__visual">
          <div className="exp-hub-panel__glow" aria-hidden />
          <div className="exp-hub-panel__frame overflow-hidden">
            <img
              src={entry.image}
              alt={entry.imageAlt}
              className="exp-hub-panel__image h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
          <span className="exp-hub-panel__badge">{entry.timeLabel}</span>
        </div>

        <div className="exp-hub-panel__content">
          <p className="exp-hub-panel__index font-display tabular-nums">
            {padIndex(index)}
          </p>
          <p className="exp-hub-panel__eyebrow">{entry.eyebrow}</p>
          <h2 className="exp-hub-panel__title">{entry.title}</h2>
          <p className="exp-hub-panel__schedule">{entry.scheduleShort}</p>
          <p className="exp-hub-panel__tagline">{entry.tagline}</p>
          <span className="exp-hub-panel__cta">
            Explorar experiência
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </a>
    </article>
  );
}
