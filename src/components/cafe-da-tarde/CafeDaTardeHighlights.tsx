import { FadeIn } from "@/components/FadeIn";
import { CafeDaTardeHighlight } from "@/components/cafe-da-tarde/CafeDaTardeHighlight";
import type { CafeDaTardeHighlightConfig } from "@/lib/cafe-da-tarde-images";
import { getCafeDaTardeImageBySlug } from "@/lib/cafe-da-tarde-images";

type CafeDaTardeHighlightsProps = {
  items: CafeDaTardeHighlightConfig[];
};

export function CafeDaTardeHighlights({ items }: CafeDaTardeHighlightsProps) {
  return (
    <section className="cdt-highlights-section cdt-section-bridge border-t border-hairline/60 bg-background py-10 md:py-14">
      <FadeIn className="mx-auto mb-8 max-w-4xl px-5 md:mb-10 md:px-10">
        <p className="section-eyebrow mb-2">Na mesa</p>
        <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
          Três momentos da tarde
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-10 md:gap-12">
        {items.map((item, index) => (
          <CafeDaTardeHighlight
            key={item.title}
            index={index}
            title={item.title}
            description={item.description}
            image={getCafeDaTardeImageBySlug(item.imageSlug)}
            reverse={item.reverse}
            variant={item.variant}
          />
        ))}
      </div>
    </section>
  );
}
