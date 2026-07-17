import type { ReactNode } from "react";

import { MaterialCard } from "@/components/MaterialCard";
import { Surface } from "@/components/Surface";

type ExperienceCardProps = {
  image: string;
  imageAlt: string;
  badge: ReactNode;
  badgeClassName?: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  price?: string;
  priceNote?: string;
  ctaLabel: string;
  onCta: () => void;
};

export function ExperienceCard({
  image,
  imageAlt,
  badge,
  badgeClassName = "border-accent/30 bg-[#1a1512] text-accent",
  title,
  subtitle,
  description,
  highlights,
  price,
  priceNote,
  ctaLabel,
  onCta,
}: ExperienceCardProps) {
  return (
    <Surface className="h-full rounded-[2px]">
      <MaterialCard
        as="article"
        accentCorner="br"
        className="card-experience group flex h-full flex-col overflow-hidden md:flex-row"
      >
        <div className="relative z-[3] h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-1/3 md:min-h-[168px]">
          <img
            src={image}
            alt={imageAlt}
            className="h-48 w-full object-cover object-center transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105 motion-reduce:transition-none md:h-full md:w-full"
            loading="lazy"
            decoding="async"
          />
          <span
            className={`absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-tight ${badgeClassName}`}
          >
            {badge}
          </span>
        </div>

        <div className="relative flex min-w-0 w-full flex-1 flex-col p-3.5 md:p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display text-base text-foreground">{title}</h3>
              <p className="mt-0.5 text-[11px] text-foreground-muted">{subtitle}</p>
            </div>
            {price ? (
              <div className="shrink-0 text-right">
                <p className="font-display text-base leading-none text-accent">{price}</p>
                {priceNote ? (
                  <p className="mt-0.5 text-[11px] text-foreground-muted">{priceNote}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <p className="mb-2.5 line-clamp-3 text-[13px] leading-relaxed text-foreground-muted md:line-clamp-2">
            {description}
          </p>

          <ul className="mb-3 flex flex-wrap gap-x-2.5 gap-y-1">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1 text-[11px] text-foreground-muted"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onCta}
            className="btn-primary focus-ring relative z-[3] mt-auto w-full py-2.5 text-[13px]"
          >
            {ctaLabel}
          </button>
        </div>
      </MaterialCard>
    </Surface>
  );
}
