import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { DATE_PACKAGES } from "@/lib/date-experience";

export function NoiteDosDates() {
  return (
    <section id="noite-dos-dates" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-8 md:mb-10">
          <SectionHeading
            index="01"
            eyebrow="Experiência exclusiva"
            title="Noite dos Dates"
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mb-8 max-w-3xl text-center text-sm leading-relaxed text-foreground-muted md:mb-10 md:text-left md:text-base">
            Conheça a Noite dos Dates, uma experiência imersiva feita para quem busca um
            romance autêntico e sem pressa na Savassi — jazz ao vivo, luzes baixas e menu
            degustação exclusivo para compartilhar a dois.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center md:justify-start">
            {DATE_PACKAGES.map((pkg) => (
              <p key={pkg.id} className="text-sm text-foreground-muted">
                <span className="font-display text-foreground">{pkg.title}</span>
                {" · "}
                <span className="text-accent">{pkg.price}</span>
                <span className="text-foreground-muted/70"> {pkg.priceNote}</span>
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="/noite-dos-dates"
              viewTransition
              className="btn-primary focus-ring inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <Heart size={15} strokeWidth={1.75} aria-hidden />
              Conheça a experiência completa
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
            </Link>
            <Link
              to="/experiencias"
              viewTransition
              className="btn-ghost-minimal focus-ring inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm transition-all duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <Sparkles size={15} strokeWidth={1.75} aria-hidden />
              Todas as experiências
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
