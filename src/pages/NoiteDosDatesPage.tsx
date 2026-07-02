import { Heart, Music, Sparkles, Wine } from "lucide-react";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FadeIn } from "@/components/FadeIn";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { DATE_PACKAGES, type DatePackageId } from "@/lib/date-experience";
import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import "@/styles/noite-dos-dates-theme.css";

const BADGE_STYLES: Record<DatePackageId, string> = {
  complete: "border-accent/35 bg-black/55 text-accent",
  vegan: "border-accent-2/35 bg-black/55 text-accent-2",
};

const ATMOSPHERE = [
  {
    icon: Music,
    title: "Jazz ao vivo",
    text: "O ritmo da noite dita o compasso enquanto vocês desfrutam do menu, sob luzes baixas e clima íntimo.",
  },
  {
    icon: Wine,
    title: "Harmonização",
    text: "Vinhos selecionados e alta coquetelaria pensados para compartilhar — cada gole prolonga o encontro.",
  },
  {
    icon: Sparkles,
    title: "Savassi à noite",
    text: "Um refúgio no coração da cidade para se desconectar do mundo exterior e viver uma noite memorável a dois.",
  },
] as const;

export default function NoiteDosDatesPage() {
  const { openWithPackage } = useExperienceCheckout();

  return (
    <ExperiencePageShell className="noite-dos-dates-page">
      <main>
        <section className="ndd-hero section-padding border-b border-hairline bg-surface">
          <div className="ndd-hero-glow" aria-hidden />
          <div className="relative mx-auto max-w-4xl">
            <FadeIn>
              <div className="mb-8 overflow-hidden rounded-md border border-hairline md:mb-10">
                <img
                  src={DATE_PACKAGE_IMAGES.complete}
                  alt=""
                  aria-hidden
                  className="ndd-hero-image h-48 w-full object-cover object-center md:h-64"
                  decoding="async"
                />
              </div>

              <span className="section-eyebrow flex items-center justify-center gap-1.5 md:justify-start">
                <Heart size={12} strokeWidth={1.75} aria-hidden />
                Experiência exclusiva
              </span>
              <h1 className="section-title mt-2 text-center text-foreground md:text-left">
                Noite dos Dates
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-center font-garamond text-xl italic leading-relaxed text-foreground-muted md:mx-0 md:text-left md:text-2xl">
                Uma experiência imersiva feita para quem busca um romance autêntico e sem
                pressa na Savassi.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-foreground-muted md:mx-0 md:text-left md:text-base">
                Enquanto o jazz ao vivo dita o ritmo sob luzes baixas, vocês desfrutam de um
                menu degustação exclusivo e alta coquetelaria desenhada para compartilhar. O
                refúgio perfeito para se desconectar do mundo exterior e viver uma noite
                memorável a dois.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-medium text-foreground-muted md:mx-0 md:text-left">
                A partir de R$ 269 por casal · sob reserva
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <button
                  type="button"
                  onClick={() => openWithPackage("complete", { theme: "dates" })}
                  className={`btn-primary focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
                >
                  <Heart size={15} strokeWidth={1.75} aria-hidden />
                  {CTA_LABELS.guaranteeExperience}
                </button>
                <a
                  href="#pacotes"
                  onClick={(event) => {
                    event.preventDefault();
                    document
                      .querySelector<HTMLElement>("[data-dates-packages]")
                      ?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                          .matches
                          ? "auto"
                          : "smooth",
                      });
                  }}
                  className={`btn-ghost-minimal focus-ring inline-flex min-h-[44px] items-center rounded-md px-6 py-3 text-sm ${CTA_HOVER_CLASS}`}
                >
                  {CTA_LABELS.viewPackages}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <section
          id="pacotes"
          data-dates-packages
          className="section-padding border-b border-hairline"
        >
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-8 text-center md:mb-10 md:text-left">
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                Escolha seu pacote
              </h2>
              <p className="mt-2 font-garamond text-base italic text-foreground-muted md:text-lg">
                Menu degustação em quatro tempos · para 2 pessoas
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {DATE_PACKAGES.map((pkg, index) => (
                <FadeIn key={pkg.id} delay={0.06 + index * 0.06}>
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
                    onCta={() =>
                      openWithPackage(pkg.id, { theme: "dates" })
                    }
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-hairline bg-surface">
          <div className="mx-auto max-w-4xl">
            <FadeIn className="mb-8 text-center md:text-left">
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                A atmosfera da noite
              </h2>
              <p className="mt-2 font-garamond text-base italic text-foreground-muted">
                Cultura, gastronomia e intimidade no coração da Savassi
              </p>
            </FadeIn>

            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              {ATMOSPHERE.map((item, index) => (
                <FadeIn key={item.title} delay={0.05 * index}>
                  <article className="ndd-atmosphere-card p-5">
                    <item.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-accent"
                      aria-hidden
                    />
                    <h3 className="mt-3 font-display text-base text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {item.text}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="font-garamond text-lg italic text-foreground-muted md:text-xl">
                Reserve sua mesa e viva uma noite inesquecível a dois.
              </p>
              <a
                href="#pacotes"
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .querySelector<HTMLElement>("[data-dates-packages]")
                    ?.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                        ? "auto"
                        : "smooth",
                    });
                }}
                className={`btn-primary focus-ring mt-6 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
              >
                <Heart size={15} strokeWidth={1.75} aria-hidden />
                {CTA_LABELS.viewPackages}
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
