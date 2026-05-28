import { FadeIn } from "@/components/FadeIn";
import { ABOUT_IMAGES, ABOUT_PARAGRAPHS } from "@/lib/constants";

const STORY_BLOCKS = [
  [ABOUT_PARAGRAPHS[0], ABOUT_PARAGRAPHS[1]],
  [ABOUT_PARAGRAPHS[2], ABOUT_PARAGRAPHS[3]],
] as const;

type StoryRowProps = {
  imageSrc: string;
  imageAlt: string;
  paragraphs: readonly string[];
  imageFirst: boolean;
};

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-xl sm:max-w-[240px] md:max-w-[300px] lg:max-w-[340px]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function StoryText({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="mx-auto flex max-w-[19rem] flex-col justify-center gap-4 text-center sm:max-w-sm md:max-w-md md:text-left lg:max-w-lg lg:gap-5">
      {paragraphs.map((text, index) => (
        <p
          key={index}
          className="text-[0.9375rem] leading-relaxed text-gray-300 md:text-base md:leading-relaxed"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function StoryRow({ imageSrc, imageAlt, paragraphs, imageFirst }: StoryRowProps) {
  const imageOrder = imageFirst ? "order-1 md:order-1" : "order-1 md:order-2";
  const textOrder = imageFirst ? "order-2 md:order-2" : "order-2 md:order-1";

  return (
    <FadeIn className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-0 lg:gap-x-20">
      <div className={imageOrder}>
        <StoryImage src={imageSrc} alt={imageAlt} />
      </div>
      <div className={textOrder}>
        <StoryText paragraphs={paragraphs} />
      </div>
    </FadeIn>
  );
}

export function About() {
  const [img1, img2] = ABOUT_IMAGES;

  return (
    <section id="sobre" className="bg-[#12110f] px-5 py-14 sm:px-8 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="pb-10 text-center md:pb-14 md:text-left">
          <p className="mb-2 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
            A História
          </p>
          <h2 className="mx-auto max-w-xs font-serif text-xl font-light tracking-tight text-[#f5f0e6] sm:max-w-sm md:mx-0 md:max-w-md md:text-2xl lg:max-w-lg lg:text-[1.75rem]">
            Três amigos, um sonho{" "}
            <span className="italic text-[#f5f0e6]/80">e a Savassi</span>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-14 sm:gap-16 md:gap-24">
          <StoryRow
            imageSrc={img1}
            imageAlt="Livraria Contraponto — ambiente acolhedor"
            paragraphs={STORY_BLOCKS[0]}
            imageFirst
          />
          <StoryRow
            imageSrc={img2}
            imageAlt="Livraria Contraponto — estantes e leitura"
            paragraphs={STORY_BLOCKS[1]}
            imageFirst={false}
          />
        </div>

        <FadeIn className="mt-14 border-t border-white/5 pt-8 text-center md:mt-20 md:pt-12 md:text-left" rootMargin="0px">
          <p className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
