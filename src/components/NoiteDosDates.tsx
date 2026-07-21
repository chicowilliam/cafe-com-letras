import { Heart } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { SurfacePattern } from "@/components/SurfacePattern";
import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import "@/styles/noite-dos-dates-theme.css";

export function NoiteDosDates() {
  return (
    <section
      id="noite-dos-dates"
      className="ndd-home-section ndd-theme-tokens section-canvas section-padding patterned-surface"
    >
      <SurfacePattern />
      <div className="relative z-[1] mx-auto max-w-6xl">
        <div className="ndd-home-teaser">
          <div className="ndd-home-teaser__copy order-2 md:order-1">
            <AnimatedSectionHeading
              className="mb-5 md:mb-6"
              index="01"
              eyebrow="Savassi · sob reserva"
              title="Noite dos Dates"
              editorial
            />

            <SectionReveal variant="line-mask">
              <p className="section-prose mx-auto mb-3 max-w-xl md:mx-0">
                Jazz ao vivo, luz baixa e menu a dois — a noite da casa para quem
                quer a mesa sem pressa.
              </p>
              <p className="section-caption !mb-0 !normal-case tracking-normal text-foreground-muted">
                A partir de R$ 115 por pessoa
              </p>
            </SectionReveal>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <AppLink
                to="/noite-dos-dates"
                className={`btn-primary focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
              >
                <Heart size={15} strokeWidth={1.75} aria-hidden />
                {CTA_LABELS.guaranteeExperience}
              </AppLink>
              <AppLink
                to="/experiencias"
                className={`btn-ghost-minimal focus-ring inline-flex min-h-[44px] items-center rounded-md px-6 py-3 text-sm text-foreground-muted ${CTA_HOVER_CLASS}`}
              >
                {CTA_LABELS.viewExperiences}
              </AppLink>
            </div>
          </div>

          <SectionReveal
            variant="subtle"
            className="ndd-home-teaser__media order-1 md:order-2"
          >
            <img
              src={DATE_PACKAGE_IMAGES.casa}
              alt="Prato da Noite dos Dates no Café com Letras"
              width={880}
              height={1100}
              loading="lazy"
              decoding="async"
              className="ndd-home-teaser__img"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
