import type { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { FadeIn } from "@/components/FadeIn";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import {
  DATE_PACKAGES,
  DATE_PACKAGE_ANCHOR_ID,
  type DatePackageId,
} from "@/lib/date-experience";
import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";
import { CTA_LABELS, CTA_HOVER_CLASS } from "@/lib/cta-labels";
import "@/styles/noite-dos-dates-theme.css";

const NIGHT_INCLUDES = [
  "Menu degustação em quatro tempos, para duas pessoas",
  "Jazz ao vivo sob luz baixa",
  "Harmonização pensada para a mesa (vinho ou opção sem álcool no vegano)",
  "Reserva com taxa por pessoa — pacotes Casal Movimento, Casal da Casa e Casal Vegano",
] as const;

export default function NoiteDosDatesPage() {
  const { openWithPackage } = useExperienceCheckout();

  const openAnchor = () =>
    openWithPackage(DATE_PACKAGE_ANCHOR_ID, { theme: "dates" });

  const scrollToPackages = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector<HTMLElement>("[data-dates-packages]")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <ExperiencePageShell className="noite-dos-dates-page ndd-theme-tokens">
      <main className="section-stack">
        {/* Hero full-bleed — uma composição de desejo */}
        <section className="ndd-hero" aria-label="Noite dos Dates">
          <div className="ndd-hero__media" aria-hidden>
            <img
              src={DATE_PACKAGE_IMAGES.casa}
              alt=""
              width={1600}
              height={1000}
              className="ndd-hero__img"
              decoding="async"
              fetchPriority="high"
            />
            <div className="ndd-hero__veil" />
          </div>

          <div className="ndd-hero__content section-padding">
            <FadeIn className="ndd-hero__lead">
              <p className="section-kicker !mb-2 text-left">Savassi · sob reserva</p>
              <h1 className="ndd-hero__title font-display tracking-[-0.02em] text-foreground">
                Noite dos Dates
              </h1>
              <p className="ndd-hero__tagline mt-3 font-garamond italic leading-snug text-foreground/90">
                Jazz ao vivo, luz baixa e menu a dois no Café com Letras.
              </p>
              <p className="mt-3 text-sm text-foreground-muted md:text-base">
                A partir de R$ 115 por pessoa
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openAnchor}
                  className={`btn-primary focus-ring inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
                >
                  <Heart size={15} strokeWidth={1.75} aria-hidden />
                  {CTA_LABELS.guaranteeExperience}
                </button>
                <a
                  href="#pacotes"
                  onClick={scrollToPackages}
                  className={`btn-ghost-minimal focus-ring inline-flex min-h-[44px] items-center justify-center rounded-md px-6 py-3 text-sm text-foreground-muted ${CTA_HOVER_CLASS}`}
                >
                  {CTA_LABELS.viewPackages}
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="ndd-hero__story">
              <p className="ndd-hero__story-rule" aria-hidden />
              <p className="ndd-hero__story-copy font-garamond italic leading-relaxed text-foreground/88">
                Luz baixa, jazz ao vivo e a mesa só de vocês — quatro tempos,
                harmonização e a Savassi do lado de fora. Escolham o casal; a
                noite já está posta.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Escolha dos casais */}
        <section
          id="pacotes"
          data-dates-packages
          className="section-canvas section-padding"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn className="mb-8 md:mb-10">
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                Escolha o casal
              </h2>
              <p className="section-caption mt-2 !mb-0 !normal-case tracking-normal text-foreground-muted">
                Três leituras da mesma noite — taxa por pessoa, para duas pessoas à mesa.
              </p>
            </FadeIn>

            <ul className="ndd-packages">
              {DATE_PACKAGES.map((pkg, index) => (
                <li key={pkg.id}>
                  <FadeIn delay={0.04 + index * 0.05}>
                    <article
                      className={`ndd-package${pkg.featured ? " ndd-package--featured" : ""}`}
                    >
                      <div className="ndd-package__media">
                        <img
                          src={pkg.image}
                          alt={pkg.imageAlt}
                          width={640}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="ndd-package__img"
                          style={{ objectPosition: pkg.imagePosition }}
                        />
                      </div>
                      <div className="ndd-package__body">
                        <div className="ndd-package__top">
                          <div className="min-w-0">
                            <p className="section-caption !mb-1">{pkg.badge}</p>
                            <h3 className="font-display text-xl text-foreground md:text-2xl">
                              {pkg.title}
                            </h3>
                            <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                              {pkg.subtitle}
                            </p>
                          </div>
                          <div className="ndd-package__price shrink-0 text-right">
                            <p className="font-display text-xl text-accent md:text-2xl">
                              {pkg.price}
                            </p>
                            <p className="text-[11px] text-foreground-muted">
                              {pkg.priceNote}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground-muted">
                          {pkg.description}
                        </p>
                        <ul className="ndd-package__facts">
                          {pkg.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() =>
                            openWithPackage(pkg.id as DatePackageId, {
                              theme: "dates",
                            })
                          }
                          className={`btn-primary focus-ring mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium sm:w-auto ${CTA_HOVER_CLASS}`}
                        >
                          {CTA_LABELS.guaranteeExperience}
                        </button>
                      </div>
                    </article>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O que a noite inclui — lista editorial, sem icon row */}
        <section className="section-canvas section-canvas--surface section-padding">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                A noite na mesa
              </h2>
              <p className="mt-2 font-garamond text-lg italic text-foreground-muted">
                O ritual é o mesmo; muda o casal que vocês escolhem.
              </p>
              <ul className="ndd-includes mt-8">
                {NIGHT_INCLUDES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* Fecho curto — desejo já está no hero */}
        <section className="ndd-close section-padding">
          <div className="mx-auto max-w-xl text-center">
            <FadeIn>
              <button
                type="button"
                onClick={openAnchor}
                className={`btn-primary focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium ${CTA_HOVER_CLASS}`}
              >
                <Heart size={15} strokeWidth={1.75} aria-hidden />
                {CTA_LABELS.guaranteeExperience}
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
