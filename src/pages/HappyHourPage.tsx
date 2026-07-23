import { Fragment } from "react";
import { HappyHourCta } from "@/components/happy-hour/HappyHourCta";
import { HappyHourFaq } from "@/components/happy-hour/HappyHourFaq";
import { HappyHourHero } from "@/components/happy-hour/HappyHourHero";
import { HappyHourIntro } from "@/components/happy-hour/HappyHourIntro";
import { HappyHourSpread } from "@/components/happy-hour/HappyHourSpread";
import { HappyHourSurfacePattern } from "@/components/happy-hour/HappyHourSurfacePattern";
import { SectionFlourish } from "@/components/SectionFlourish";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { useReservation } from "@/hooks/useReservation";
import { getBlueMoonImageBySlug } from "@/lib/blue-moon-images";
import {
  getHappyHourSpreads,
  HAPPY_HOUR_PRICE_FOOTNOTE,
} from "@/lib/happy-hour-menu";
import { EXPERIENCIAS_BY_ID } from "@/lib/experiencias";
import "@/styles/happy-hour-theme.css";

export default function HappyHourPage() {
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["happy-hour"];
  const spreads = getHappyHourSpreads();

  return (
    <ExperiencePageShell className="happy-hour-page hh-theme-tokens">
      <main className="section-stack">
        <HappyHourHero
          eyebrow={info.eyebrow}
          schedule={info.scheduleLong}
          subtitle="Parceria Blue Moon no terraço: cerveja de trigo, petiscos da casa e o ritmo do entardecer."
          conversionHint={info.conversionHint}
          onReserve={openReservation}
        />

        <div className="hh-flow">
          <HappyHourSurfacePattern />

          <HappyHourIntro
            description={info.description}
            image={getBlueMoonImageBySlug("servindo-blue-moon")}
          />

          {spreads.map((spread, index) => (
            <Fragment key={spread.id}>
              <SectionFlourish tone="happy-hour" />
              <HappyHourSpread
                index={index}
                eyebrow={spread.eyebrow}
                title={spread.title}
                subtitle={spread.subtitle}
                items={spread.items}
                images={spread.images}
                variant={spread.variant}
                tone={spread.tone}
                reverse={index % 2 !== 0}
                onReserve={spread.id === "na-mesa" ? openReservation : undefined}
              />
            </Fragment>
          ))}

          <SectionFlourish tone="happy-hour" />

          <p className="hh-footnote hh-section-bridge px-5 py-6 text-center font-garamond text-sm italic leading-relaxed text-foreground-muted md:px-10 md:text-base">
            {HAPPY_HOUR_PRICE_FOOTNOTE}
          </p>

          <SectionFlourish tone="happy-hour" />

          <HappyHourFaq />
        </div>

        <HappyHourCta onReserve={openReservation} />
      </main>
    </ExperiencePageShell>
  );
}
