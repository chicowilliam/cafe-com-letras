import { FadeIn } from "@/components/FadeIn";
import type { CafeDaTardeMosaicCell, CafeDaTardeImage } from "@/lib/cafe-da-tarde-images";

type MosaicItem = CafeDaTardeMosaicCell & { image: CafeDaTardeImage };

const LAYOUT_CLASS: Record<CafeDaTardeMosaicCell["layout"], string> = {
  "hero-wide": "cdt-mosaic-cell--hero-wide",
  tall: "cdt-mosaic-cell--tall",
  standard: "cdt-mosaic-cell--standard",
  panorama: "cdt-mosaic-cell--panorama",
};

type CafeDaTardeMosaicProps = {
  cells: MosaicItem[];
};

export function CafeDaTardeMosaic({ cells }: CafeDaTardeMosaicProps) {
  return (
    <section className="cdt-mosaic-section bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <FadeIn className="mb-10 max-w-2xl md:mb-14">
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
            Uma tarde na livraria
          </h2>
          <p className="mt-4 font-garamond text-xl italic leading-relaxed text-foreground-muted md:text-2xl">
            Luz de tarde, mesa compartilhada e o aroma de algo saindo do forno — o
            café da tarde como pausa elegante no coração da Savassi.
          </p>
        </FadeIn>

        <div className="cdt-mosaic grid gap-2 md:gap-3">
          {cells.map((cell, index) => (
            <FadeIn
              key={cell.slug}
              delay={0.04 * index}
              className={`cdt-mosaic-cell group relative overflow-hidden ${LAYOUT_CLASS[cell.layout]}`}
            >
              <img
                src={cell.image.src}
                alt={cell.image.alt}
                loading="lazy"
                decoding="async"
                className="cdt-editorial-image h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="cdt-mosaic-caption absolute inset-x-0 bottom-0 px-4 py-5">
                <p className="font-garamond text-sm italic text-foreground/90 md:text-base">
                  {cell.image.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
