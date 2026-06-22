import type { ExperienciaMenuItem } from "@/lib/experiencias";

export function ExperienceMenuItem({ item }: { item: ExperienciaMenuItem }) {
  if (item.image) {
    return (
      <article className="group grid grid-cols-[120px_1fr] gap-4 overflow-hidden rounded-sm border border-hairline bg-surface md:grid-cols-[160px_1fr] md:gap-6">
        <div className="aspect-[4/3] h-full w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-col justify-center p-4 pl-0">
          {item.badge ? <Badge label={item.badge} /> : null}
          <h3 className="font-display text-lg leading-tight tracking-tight text-foreground md:text-xl">
            {item.name}
          </h3>
          <p className="mt-1.5 font-garamond text-base leading-relaxed text-foreground-muted">
            {item.description}
          </p>
          {item.price ? (
            <p className="mt-2 text-sm font-medium text-accent">{item.price}</p>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-hairline pb-4 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
          {item.name}
        </h3>
        {item.badge ? <Badge label={item.badge} /> : null}
        {item.price ? (
          <>
            <span
              aria-hidden
              className="mb-1 hidden min-w-4 flex-1 border-b border-dotted border-hairline sm:block"
            />
            <span className="text-sm font-medium text-accent">{item.price}</span>
          </>
        ) : null}
      </div>
      <p className="mt-1 font-garamond text-base leading-relaxed text-foreground-muted">
        {item.description}
      </p>
    </article>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
      {label}
    </span>
  );
}
