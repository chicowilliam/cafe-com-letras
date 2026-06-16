import { Music, Star } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";
import { DATE_PACKAGES, type DatePackageId } from "@/lib/date-experience";
import { JAZZ_EXPERIENCES } from "@/lib/jazz-experiences";

const BADGE_STYLES: Record<DatePackageId, string> = {
  complete: "border-accent/30 bg-black/65 text-accent",
  vegan: "border-accent-2/30 bg-black/65 text-accent-2",
};

const JAZZ_BADGE_ICONS = {
  "jazz-experience": Music,
  "jazz-lovers": Star,
} as const;

export function NoiteDosDates() {
  const { openWithPackage } = useExperienceCheckout();
  const { open: openReservation } = useReservation();

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
          <p className="mb-10 max-w-3xl text-center text-sm leading-relaxed text-foreground-muted md:mb-12 md:text-left md:text-base">
            Conheça a Noite dos Dates, uma experiência imersiva feita para quem busca
            um romance autêntico e sem pressa na Savassi. Enquanto o jazz ao vivo dita
            o ritmo sob luzes baixas, vocês desfrutam de um menu degustação exclusivo
            e alta coquetelaria desenhada para compartilhar. O refúgio perfeito para se
            desconectar do mundo exterior e viver uma noite memorável a dois.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {DATE_PACKAGES.map((pkg, index) => (
            <FadeIn key={pkg.id} delay={0.1 + index * 0.06}>
              <ExperienceCard
                image={pkg.image}
                imageAlt={pkg.imageAlt}
                badge={pkg.badge}
                badgeClassName={BADGE_STYLES[pkg.id]}
                title={pkg.title}
                subtitle={pkg.subtitle}
                description={pkg.description}
                highlights={pkg.highlights}
                price={pkg.price}
                priceNote={pkg.priceNote}
                ctaLabel="Selecionar pacote"
                onCta={() => openWithPackage(pkg.id)}
              />
            </FadeIn>
          ))}

          {JAZZ_EXPERIENCES.map((experience, index) => {
            const Icon = JAZZ_BADGE_ICONS[experience.id];
            const cardIndex = DATE_PACKAGES.length + index;

            return (
              <FadeIn key={experience.id} delay={0.1 + cardIndex * 0.06}>
                <ExperienceCard
                  image={experience.image}
                  imageAlt={experience.imageAlt}
                  badge={
                    <>
                      <Icon size={11} strokeWidth={2} aria-hidden />
                      {experience.badge}
                    </>
                  }
                  title={experience.title}
                  subtitle={experience.subtitle}
                  description={experience.description}
                  highlights={experience.highlights}
                  ctaLabel="Reservar lugar"
                  onCta={openReservation}
                />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
