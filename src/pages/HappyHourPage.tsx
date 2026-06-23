import { useEffect, useRef } from "react";
import { HappyHourCta } from "@/components/happy-hour/HappyHourCta";
import { HappyHourHero } from "@/components/happy-hour/HappyHourHero";
import { HappyHourIntro } from "@/components/happy-hour/HappyHourIntro";
import { HappyHourSpread } from "@/components/happy-hour/HappyHourSpread";
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
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["happy-hour"];
  const spreads = getHappyHourSpreads();

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell theme="happy-hour" title="Happy Hour · Café com Letras">
      <main ref={contentRef}>
        <HappyHourHero
          eyebrow={info.eyebrow}
          title={`${info.title} · Blue Moon`}
          schedule={info.scheduleLong}
          subtitle="Chopp gelado, fatia de laranja e petiscos para o entardecer na Savassi."
        />

        <HappyHourIntro
          description={info.description}
          image={getBlueMoonImageBySlug("laranja-no-copo")}
        />

        {spreads.map((spread, index) => (
          <HappyHourSpread
            key={spread.id}
            index={index}
            eyebrow={spread.eyebrow}
            title={spread.title}
            subtitle={spread.subtitle}
            items={spread.items}
            images={spread.images}
            variant={spread.variant}
            tone={spread.tone}
            reverse={index % 2 !== 0}
          />
        ))}

        <p className="border-t border-hairline/60 bg-surface px-5 py-6 text-center font-garamond text-xs italic text-foreground-muted/70 md:px-10">
          {HAPPY_HOUR_PRICE_FOOTNOTE}
        </p>

        <HappyHourCta onReserve={openReservation} schedule={info.scheduleLong} />
      </main>
    </ExperiencePageShell>
  );
}
