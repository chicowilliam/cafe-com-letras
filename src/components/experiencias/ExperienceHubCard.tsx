import { ArrowRight } from "lucide-react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";

type ExperienceHubCardProps = {
  entry: ExperienciaCatalogEntry;
  index: number;
};

export function ExperienceHubCard({ entry, index }: ExperienceHubCardProps) {
  return (
    <a
      href={entry.href}
      className="card-experience group flex h-full flex-col overflow-hidden transition-transform duration-300 motion-reduce:transition-none"
    >
      <div className="relative h-44 overflow-hidden md:h-48">
        <img
          src={entry.image}
          alt={entry.imageAlt}
          className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-sans text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
          {entry.timeLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="section-eyebrow mb-1">{entry.eyebrow}</p>
        <h2 className="font-display text-xl tracking-tight text-foreground md:text-2xl">
          {entry.title}
        </h2>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">
          {entry.scheduleShort}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
          {entry.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-hover">
          Ver detalhes
          <ArrowRight
            size={15}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </a>
  );
}
