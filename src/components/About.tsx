import { FadeIn } from "@/components/FadeIn";
import { ABOUT_IMAGES } from "@/lib/about-images";
import { ABOUT_PARAGRAPHS } from "@/lib/constants";

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
    <div className="mx-auto flex max-w-2xl flex-col justify-center space-y-6 text-center md:max-w-3xl md:text-left">
      {paragraphs.map((text, index) => (
        <p
          key={index}
          className="font-garamond italic text-[1.0625rem] leading-relaxed text-foreground-muted md:text-[1.1875rem]"
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
    <section id="sobre" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="pb-10 text-center md:pb-14 md:text-left">
          <p className="section-eyebrow">A História</p>
          <h2 className="section-title mx-auto max-w-xs sm:max-w-sm md:mx-0 md:max-w-md lg:max-w-lg">
            Três amigos, um sonho{" "}
            <span className="italic text-foreground-muted">e a Savassi</span>
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

        <FadeIn
          className="mt-14 border-t border-hairline pt-8 text-center md:mt-20 md:pt-12 md:text-left"
          rootMargin="0px"
        >
          <p className="section-eyebrow mb-0 text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
