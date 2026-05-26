import { FadeIn } from "@/components/FadeIn";
import { ABOUT_IMAGES, ABOUT_PARAGRAPHS } from "@/lib/constants";

const STORY_BLOCKS = [
  ABOUT_PARAGRAPHS[0],
  ABOUT_PARAGRAPHS[1],
  `${ABOUT_PARAGRAPHS[2]} ${ABOUT_PARAGRAPHS[3]}`,
] as const;

type StoryRowProps = {
  imageSrc: string;
  imageAlt: string;
  text: string;
  imageFirst: boolean;
};

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-2xl lg:max-w-[500px]">
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

function StoryText({ children }: { children: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center">
      <p className="text-base leading-relaxed text-gray-300 md:text-lg">{children}</p>
    </div>
  );
}

function StoryRow({ imageSrc, imageAlt, text, imageFirst }: StoryRowProps) {
  const imageOrder = imageFirst ? "order-1 md:order-1" : "order-1 md:order-2";
  const textOrder = imageFirst ? "order-2 md:order-2" : "order-2 md:order-1";

  return (
    <FadeIn className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
      <div className={imageOrder}>
        <StoryImage src={imageSrc} alt={imageAlt} />
      </div>
      <div className={textOrder}>
        <StoryText>{text}</StoryText>
      </div>
    </FadeIn>
  );
}

export function About() {
  const [img1, img2, img3] = ABOUT_IMAGES;

  return (
    <section id="sobre" className="bg-[#12110f] px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="py-24 pb-12">
          <p className="mb-3 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
            A História
          </p>
          <h2 className="max-w-md font-serif text-2xl font-light tracking-tight text-[#f5f0e6] md:text-3xl">
            Três amigos, um sonho{" "}
            <span className="italic text-[#f5f0e6]/80">e a Savassi</span>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-24 py-24 pt-0">
          <StoryRow
            imageSrc={img1}
            imageAlt="Livraria Contraponto — ambiente acolhedor"
            text={STORY_BLOCKS[0]}
            imageFirst
          />
          <StoryRow
            imageSrc={img2}
            imageAlt="Livraria Contraponto — estantes e leitura"
            text={STORY_BLOCKS[1]}
            imageFirst={false}
          />
          <StoryRow
            imageSrc={img3}
            imageAlt="Livraria Contraponto — detalhes do espaço"
            text={STORY_BLOCKS[2]}
            imageFirst
          />
        </div>

        <FadeIn className="border-t border-white/5 py-12" rootMargin="0px">
          <p className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
