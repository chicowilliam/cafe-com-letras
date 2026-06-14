import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { HISTORIA_IMAGE } from "@/lib/about-images";
import { ABOUT_PARAGRAPHS } from "@/lib/constants";

export function About() {
  return (
    <section
      id="sobre"
      className="relative flex w-full flex-col items-stretch overflow-hidden bg-surface md:flex-row md:items-center"
    >
      <FadeIn className="relative w-full shrink-0 md:w-[44%] lg:w-[40%]">
        <div className="relative h-[clamp(220px,48vw,280px)] w-full overflow-hidden sm:h-[clamp(240px,42vw,300px)] md:h-auto md:aspect-[4/3] md:max-h-[min(380px,46vh)] lg:max-h-[min(420px,48vh)]">
          <img
            src={HISTORIA_IMAGE}
            alt="Interior do Café com Letras — mesas, estantes e ambiente acolhedor"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-hairline"
            aria-hidden
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-black/45 px-3 py-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent backdrop-blur-sm md:left-6 md:top-6">
            Desde 1996
          </span>
        </div>
      </FadeIn>

      <FadeIn
        className="flex w-full flex-col justify-center p-8 md:w-[56%] md:p-12 lg:w-[60%] lg:p-20"
        delay={0.08}
      >
        <SectionHeading
          index="04"
          eyebrow="A História"
          align="left"
          titleClassName="max-w-xl text-foreground"
          title={
            <>
              Três amigos, um sonho{" "}
              <span className="italic text-foreground-muted">e a Savassi</span>
            </>
          }
        />

        <div
          className="mt-7 mb-7 h-px w-16 bg-accent/60 md:mt-8 md:mb-8"
          aria-hidden
        />

        <div className="flex max-w-xl flex-col gap-6">
          {ABOUT_PARAGRAPHS.map((text, index) => (
            <p
              key={index}
              className={`font-garamond text-[1.0625rem] leading-relaxed text-foreground-muted md:text-[1.1875rem] ${
                index === 0 ? "story-lead" : ""
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        <p className="mt-8 font-sans text-xs uppercase tracking-[0.12em] text-foreground-muted/80 md:mt-10">
          Rua Antônio de Albuquerque · Savassi · Belo Horizonte
        </p>
      </FadeIn>
    </section>
  );
}
