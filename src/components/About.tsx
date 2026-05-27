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
    <div className="mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-xl md:max-w-[280px]">
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
    <div className="mx-auto flex max-w-sm flex-col justify-center gap-4">
      {paragraphs.map((text, index) => (
        <p
          key={index}
          className="text-sm leading-snug text-gray-300 md:text-[0.9375rem] md:leading-relaxed"
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
    <FadeIn className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
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
    <section id="sobre" className="bg-[#12110f] px-8 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="pb-8 md:pb-10">
          <p className="mb-2 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
            A História
          </p>
          <h2 className="max-w-sm font-serif text-xl font-light tracking-tight text-[#f5f0e6] md:text-2xl">
            Três amigos, um sonho{" "}
            <span className="italic text-[#f5f0e6]/80">e a Savassi</span>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-16 md:gap-20">
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

        <FadeIn className="mt-12 border-t border-white/5 pt-8 md:mt-16 md:pt-10" rootMargin="0px">
          <p className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
