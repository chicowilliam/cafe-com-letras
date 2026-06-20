import { BLUE_MOON_IMAGES } from "@/lib/blue-moon-images";
import type { HappyHourBloco } from "@/lib/happy-hour";

type HappyHourBlocoCardProps = {
  bloco: HappyHourBloco;
  /** No desktop, inverte a ordem (fotos à direita). Mobile permanece empilhado. */
  reverse?: boolean;
};

export function HappyHourBlocoCard({
  bloco,
  reverse = false,
}: HappyHourBlocoCardProps) {
  const fotos = bloco.imageIndexes
    .slice(0, 4)
    .map((index) => BLUE_MOON_IMAGES[index])
    .filter(Boolean);

  const emptySlots = Math.max(0, 4 - fotos.length);

  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-[55fr_45fr] md:items-center md:gap-12 ${
        reverse
          ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
          : ""
      }`}
    >
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {fotos.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-sm">
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
            />
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            aria-hidden
            className="aspect-square rounded-sm bg-surface-elevated"
          />
        ))}
      </div>

      <div>
        <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
          {bloco.titulo}
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          {bloco.items.map((item) => (
            <div key={item.name}>
              <div className="flex items-baseline gap-3">
                <p className="font-display text-base text-accent md:text-lg">
                  {item.name}
                </p>
                {item.price ? (
                  <>
                    <span
                      aria-hidden
                      className="mb-1 min-w-4 flex-1 border-b border-dotted border-hairline"
                    />
                    <span className="shrink-0 font-sans text-xs text-foreground-muted/70">
                      {item.price}
                    </span>
                  </>
                ) : null}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
