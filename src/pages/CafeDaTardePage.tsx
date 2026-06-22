import { useEffect, useRef } from "react";
import { CafeDaTardeCta } from "@/components/cafe-da-tarde/CafeDaTardeCta";
import { CafeDaTardeHero } from "@/components/cafe-da-tarde/CafeDaTardeHero";
import { CafeDaTardeHighlights } from "@/components/cafe-da-tarde/CafeDaTardeHighlights";
import { CafeDaTardeIntro } from "@/components/cafe-da-tarde/CafeDaTardeIntro";
import { CafeDaTardeMenu } from "@/components/cafe-da-tarde/CafeDaTardeMenu";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { useReservation } from "@/hooks/useReservation";
import {
  CAFE_DA_TARDE_HIGHLIGHTS,
  getCafeDaTardeImageBySlug,
} from "@/lib/cafe-da-tarde-images";
import { EXPERIENCIAS_BY_ID } from "@/lib/experiencias";
import "@/styles/cafe-da-tarde-theme.css";

export default function CafeDaTardePage() {
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["cafe-da-tarde"];

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell theme="cafe-da-tarde" title="Café da Tarde · Café com Letras">
      <main ref={contentRef}>
        <CafeDaTardeHero
          eyebrow={info.eyebrow}
          title={info.title}
          schedule={info.scheduleLong}
          subtitle="Bolos do dia, quiches dourados e sucos frescos — uma pausa lenta entre as estantes da livraria."
        />

        <CafeDaTardeIntro
          description={info.description}
          image={getCafeDaTardeImageBySlug("todas-as-refeicoes-foco-pao")}
        />

        <CafeDaTardeHighlights items={CAFE_DA_TARDE_HIGHLIGHTS} />

        <CafeDaTardeMenu schedule={info.scheduleLong} />

        <CafeDaTardeCta onReserve={openReservation} />
      </main>
    </ExperiencePageShell>
  );
}
