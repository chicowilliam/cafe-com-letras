import type { HappyHourItem } from "@/lib/happy-hour";

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-amber-300">
      {label}
    </span>
  );
}

export function HappyHourItemCard({ item }: { item: HappyHourItem }) {
  if (item.image) {
    return (
      <article className="group grid grid-cols-[120px_1fr] gap-4 overflow-hidden rounded-sm border border-hairline bg-surface md:grid-cols-[160px_1fr] md:gap-6">
        <div className="aspect-[4/3] h-full w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
          />
        </div>
        <div className="flex flex-col justify-center p-4 pl-0">
          {item.badge ? (
            <div className="mb-2">
              <Badge label={item.badge} />
            </div>
          ) : null}
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
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-lg leading-tight tracking-tight text-foreground">
          {item.name}
        </h3>
        {item.badge ? <Badge label={item.badge} /> : null}
        {item.price ? (
          <>
            <span
              aria-hidden
              className="mb-1 min-w-4 flex-1 border-b border-dotted border-hairline"
            />
            <span className="shrink-0 text-sm font-medium text-accent">
              {item.price}
            </span>
          </>
        ) : null}
      </div>
      <p className="mt-1 font-garamond text-base leading-relaxed text-foreground-muted">
        {item.description}
      </p>
    </article>
  );
}
