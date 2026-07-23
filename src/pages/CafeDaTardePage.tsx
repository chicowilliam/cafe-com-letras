import { Fragment } from "react";
import { CafeDaTardeCta } from "@/components/cafe-da-tarde/CafeDaTardeCta";
import { CafeDaTardeHero } from "@/components/cafe-da-tarde/CafeDaTardeHero";
import { CafeDaTardeIntro } from "@/components/cafe-da-tarde/CafeDaTardeIntro";
import { CafeDaTardeSpread } from "@/components/cafe-da-tarde/CafeDaTardeSpread";
import { SectionFlourish } from "@/components/SectionFlourish";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { useReservation } from "@/hooks/useReservation";
import { getCafeDaTardeImageBySlug } from "@/lib/cafe-da-tarde-images";
import {
  CAFE_DA_TARDE_PRICE_FOOTNOTE,
  getCafeDaTardeSpreads,
} from "@/lib/cafe-da-tarde-menu";
import { EXPERIENCIAS_BY_ID } from "@/lib/experiencias";
import "@/styles/cafe-da-tarde-theme.css";

export default function CafeDaTardePage() {
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["cafe-da-tarde"];
  const spreads = getCafeDaTardeSpreads();

  return (
    <ExperiencePageShell className="cafe-da-tarde-page">
      <main className="section-stack">
        <CafeDaTardeHero
          eyebrow={info.eyebrow}
          title={info.title}
          schedule={info.scheduleLong}
          subtitle="Bolos do dia, quiches dourados e sucos frescos — uma pausa lenta entre as estantes da livraria."
          conversionHint="Bolos a partir de R$ 14"
          onReserve={openReservation}
        />

        <div className="cdt-flow">
          <CafeDaTardeIntro
            description={info.description}
            image={getCafeDaTardeImageBySlug("cafe")}
          />

          {spreads.map((spread, index) => (
            <Fragment key={spread.id}>
              <SectionFlourish tone="cafe-da-tarde" />
              <CafeDaTardeSpread
                index={index}
                eyebrow={spread.eyebrow}
                title={spread.title}
                subtitle={spread.subtitle}
                items={spread.items}
                images={spread.images}
                variant={spread.variant}
                reverse={index % 2 !== 0}
              />
            </Fragment>
          ))}

          <SectionFlourish tone="cafe-da-tarde" />

          <p className="cdt-footnote cdt-section-bridge px-5 py-6 text-center font-garamond text-xs italic text-foreground-muted/70 md:px-10">
            {CAFE_DA_TARDE_PRICE_FOOTNOTE}
          </p>
        </div>

        <CafeDaTardeCta onReserve={openReservation} />
      </main>
    </ExperiencePageShell>
  );
}
