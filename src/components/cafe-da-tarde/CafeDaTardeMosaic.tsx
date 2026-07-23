import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeObjectStyle,
  type CafeDaTardeImage,
  type CafeDaTardeMosaicLayout,
} from "@/lib/cafe-da-tarde-images";

type MosaicItem = {
  slug: string;
  layout: CafeDaTardeMosaicLayout;
  image: CafeDaTardeImage;
};

const LAYOUT_CLASS: Record<CafeDaTardeMosaicLayout, string> = {
  feature: "cdt-mosaic-cell--feature",
  detail: "cdt-mosaic-cell--detail",
};

type CafeDaTardeMosaicProps = {
  cells: MosaicItem[];
};

export function CafeDaTardeMosaic({ cells }: CafeDaTardeMosaicProps) {
  return (
    <section className="cdt-mosaic-section cdt-section-bridge relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <FadeIn className="mb-8 max-w-2xl md:mb-12">
          <p className="section-eyebrow mb-3">Os detalhes</p>
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
            Uma tarde na livraria
          </h2>
          <p className="mt-4 font-garamond text-xl italic leading-relaxed text-foreground-muted md:text-2xl">
            Cada visita, uma composição diferente na mesa — o close do bolo, a massa
            dourada do quiche, o silêncio bom entre um capítulo e outro.
          </p>
        </FadeIn>

        <div className="cdt-mosaic grid gap-2 md:gap-3">
          {cells.map((cell, index) => (
            <FadeIn
              key={cell.slug}
              delay={0.05 * index}
              className={`cdt-mosaic-cell group relative overflow-hidden ${LAYOUT_CLASS[cell.layout]}`}
            >
              <img
                src={cell.image.src}
                alt={cell.image.alt}
                loading="lazy"
                decoding="async"
                style={cafeDaTardeObjectStyle(cell.image)}
                className="cdt-editorial-image h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="cdt-mosaic-caption pointer-events-none absolute inset-x-0 bottom-0 px-4 py-4 md:py-5">
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
