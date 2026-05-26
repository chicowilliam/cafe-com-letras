import { motion } from "framer-motion";
import { ABOUT_IMAGES, ABOUT_PARAGRAPHS } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
    <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl aspect-[4/5] lg:max-w-[500px]">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
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
  const imageOrder = imageFirst
    ? "order-1 md:order-1"
    : "order-1 md:order-2";
  const textOrder = imageFirst
    ? "order-2 md:order-2"
    : "order-2 md:order-1";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInUp}
      className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16"
    >
      <div className={imageOrder}>
        <StoryImage src={imageSrc} alt={imageAlt} />
      </div>
      <div className={textOrder}>
        <StoryText>{text}</StoryText>
      </div>
    </motion.div>
  );
}

export function About() {
  const [img1, img2, img3] = ABOUT_IMAGES;

  return (
    <section id="sobre" className="bg-[#12110f] px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="py-24 pb-12"
        >
          <p className="mb-3 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
            A História
          </p>
          <h2 className="max-w-md font-serif text-2xl font-light tracking-tight text-[#f5f0e6] md:text-3xl">
            Três amigos, um sonho{" "}
            <span className="italic text-[#f5f0e6]/80">e a Savassi</span>
          </h2>
        </motion.div>

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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="border-t border-white/5 py-12"
        >
          <p className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </motion.div>
      </div>
    </section>
  );
}
