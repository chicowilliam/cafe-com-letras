import { Heart } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { SurfacePattern } from "@/components/SurfacePattern";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import "@/styles/noite-dos-dates-theme.css";

/**
 * Capítulo tipográfico na home — mesmo canvas das seções irmãs.
 * Sem banner fotográfico (evita cliff / “site colado”).
 * Accent coral só no kicker/CTA; a página /noite-dos-dates guarda o tema vinho.
 */
export function NoiteDosDates() {
  return (
    <section
      id="noite-dos-dates"
      className="ndd-home-chapter section-canvas section-padding patterned-surface"
      aria-label="Noite dos Dates"
    >
      <SurfacePattern />
      <div className="relative z-[1] mx-auto max-w-6xl">
        <AnimatedSectionHeading
          className="mb-6 md:mb-8"
          index="01"
          eyebrow="Savassi · sob reserva"
          eyebrowClassName="ndd-home-chapter__eyebrow"
          title="Noite dos Dates"
          editorial
        />

        <SectionReveal variant="line-mask">
          <p className="section-prose mx-auto mb-2 max-w-2xl text-center md:mx-0 md:text-left">
            Jazz ao vivo, luz baixa e menu a dois — a noite da casa para quem quer
            a mesa sem pressa.
          </p>
          <p className="section-caption mx-auto !mb-0 !normal-case tracking-normal text-foreground-muted md:mx-0">
            A partir de R$ 115 por pessoa
          </p>
        </SectionReveal>

        <div className="mt-8 flex justify-center md:justify-start">
          <AppLink
            to="/noite-dos-dates"
            className={`ndd-home-chapter__cta btn-primary focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
          >
            <Heart size={15} strokeWidth={1.75} aria-hidden />
            {CTA_LABELS.guaranteeExperience}
          </AppLink>
        </div>
      </div>
    </section>
  );
}
