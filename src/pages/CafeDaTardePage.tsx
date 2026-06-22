import { useEffect, useRef } from "react";
import { CafeDaTardeCta } from "@/components/cafe-da-tarde/CafeDaTardeCta";
import { CafeDaTardeDishChapter } from "@/components/cafe-da-tarde/CafeDaTardeDishChapter";
import { CafeDaTardeHero } from "@/components/cafe-da-tarde/CafeDaTardeHero";
import { CafeDaTardeIntro } from "@/components/cafe-da-tarde/CafeDaTardeIntro";
import { CafeDaTardeMosaic } from "@/components/cafe-da-tarde/CafeDaTardeMosaic";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { useReservation } from "@/hooks/useReservation";
import {
  CAFE_DA_TARDE_CHAPTERS,
  getCafeDaTardeImageBySlug,
  getCafeDaTardeMosaicImages,
} from "@/lib/cafe-da-tarde-images";
import { CAFE_DA_TARDE_ITEMS, EXPERIENCIAS_BY_ID } from "@/lib/experiencias";
import "@/styles/cafe-da-tarde-theme.css";

export default function CafeDaTardePage() {
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();
  const info = EXPERIENCIAS_BY_ID["cafe-da-tarde"];
  const mosaic = getCafeDaTardeMosaicImages();

  const chapters = CAFE_DA_TARDE_CHAPTERS.map((config) => {
    const item = CAFE_DA_TARDE_ITEMS.find((entry) => entry.name === config.itemKey);
    if (!item) {
      throw new Error(`Cafe da tarde chapter item not found: ${config.itemKey}`);
    }

    return {
      ...config,
      title: item.name,
      description: item.description,
      image: getCafeDaTardeImageBySlug(config.imageSlug),
      secondaryImage: config.secondarySlug
        ? getCafeDaTardeImageBySlug(config.secondarySlug)
        : undefined,
    };
  });

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

        {chapters.map((chapter, index) => (
          <CafeDaTardeDishChapter
            key={chapter.itemKey}
            index={index}
            title={chapter.title}
            description={chapter.description}
            image={chapter.image}
            secondaryImage={chapter.secondaryImage}
            reverse={chapter.reverse}
            objectPosition={chapter.objectPosition}
            variant={chapter.variant}
          />
        ))}

        <CafeDaTardeMosaic cells={mosaic} />

        <CafeDaTardeCta onReserve={openReservation} />
      </main>
    </ExperiencePageShell>
  );
}
