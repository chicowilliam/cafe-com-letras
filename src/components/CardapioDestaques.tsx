import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { CardapioLightbox } from "@/components/CardapioLightbox";
import { CARDAPIO_IMAGES } from "@/lib/cardapio-images";

export function CardapioDestaques() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const images = CARDAPIO_IMAGES;

  const close = () => setActiveIndex(-1);
  const prev = () => setActiveIndex((index) => Math.max(0, index - 1));
  const next = () =>
    setActiveIndex((index) => Math.min(images.length - 1, index + 1));

  return (
    <FadeIn>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((src, index) => {
          const isLonelyLast =
            index === images.length - 1 && images.length % 2 !== 0;

          return (
            <button
              type="button"
              key={src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Abrir página ${index + 1} do cardápio`}
              className={`group focus-ring aspect-[3/4] cursor-pointer overflow-hidden rounded-sm border border-hairline ${
                isLonelyLast ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            </button>
          );
        })}
      </div>

      <CardapioLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </FadeIn>
  );
}
