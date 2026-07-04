import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { AboutHistoryMediaColumn } from "@/components/AboutHistoryDiptych";
import { AboutHistoryOrnament } from "@/components/AboutHistoryOrnament";
import { AnniversaryRibbon } from "@/components/AnniversaryRibbon";
import { SectionReveal } from "@/components/SectionReveal";
import { ABOUT_PARAGRAPHS } from "@/lib/constants";
import "@/styles/about-history.css";

export function About() {
  return (
    <section
      id="sobre"
      className="about-history section-canvas section-canvas--shift section-padding relative grid w-full grid-cols-1 items-stretch overflow-hidden md:grid-cols-[46%_54%] lg:grid-cols-[42%_58%]"
    >
      <AboutHistoryMediaColumn />

      <div className="about-history__story about-history-story relative h-full min-h-full">
        <AboutHistoryOrnament variant="story" />

        <div className="about-history-story__inner relative z-10">
          <AnimatedSectionHeading
            index="05"
            eyebrow="A História"
            align="left"
            kicker="De três amigos e um sonho a referência cultural da Savassi — quase três décadas de mesa, música e livros."
            titleClassName="max-w-xl text-foreground"
            title={
              <>
                Três amigos, um sonho{" "}
                <span className="italic text-foreground-muted">e a Savassi</span>
              </>
            }
            editorial
          />

          <div
            className="mt-7 mb-7 h-px w-16 bg-accent/60 md:mt-8 md:mb-8"
            aria-hidden
          />

          <SectionReveal variant="line-mask">
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
          </SectionReveal>

          <AnniversaryRibbon className="mt-8 md:mt-10" />

          <p className="section-caption mt-5 md:mt-6">
            Rua Antônio de Albuquerque, 781 · Savassi · Belo Horizonte
          </p>
        </div>
      </div>
    </section>
  );
}
