import { useEffect, useMemo, useRef, useState } from "react";
import { ExperienceMenuItem } from "@/components/experiencias/ExperienceMenuItem";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { FadeIn } from "@/components/FadeIn";
import { useReservation } from "@/hooks/useReservation";
import {
  EXPERIENCIAS_BY_ID,
  getHappyHourDayByWeekday,
  getHappyHourDayImages,
  HAPPY_HOUR_DAYS,
  HAPPY_HOUR_DRINKS,
  type HappyHourDayKey,
} from "@/lib/experiencias";
import "@/styles/happy-hour-theme.css";

function getInitialDayKey(): HappyHourDayKey {
  const today = getHappyHourDayByWeekday(new Date().getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6);
  return today?.key ?? "qui";
}

export default function HappyHourPage() {
  const contentRef = useRef<HTMLElement>(null);
  const { open: openReservation } = useReservation();
  const [activeDay, setActiveDay] = useState<HappyHourDayKey>(getInitialDayKey);
  const info = EXPERIENCIAS_BY_ID["happy-hour"];

  const selectedDay = useMemo(
    () => HAPPY_HOUR_DAYS.find((day) => day.key === activeDay) ?? HAPPY_HOUR_DAYS[0],
    [activeDay],
  );

  const dayImages = useMemo(() => getHappyHourDayImages(selectedDay), [selectedDay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell theme="happy-hour" title="Happy Hour · Café com Letras">
      <main ref={contentRef}>
        <section className="relative section-padding border-b border-hairline bg-surface">
          <div className="hh-hero-glow" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <FadeIn>
              <span className="section-eyebrow">{info.eyebrow}</span>
              <h1 className="section-title mt-2 text-foreground">{info.title}</h1>
              <p className="mx-auto mt-4 max-w-lg font-garamond text-xl italic leading-relaxed text-foreground-muted">
                {info.description}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-foreground-muted/70">
                {info.scheduleLong}
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding border-b border-hairline">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                Cardápio do dia
              </h2>
              <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                Petiscos que mudam a cada dia — escolha o dia da semana
              </p>

              <div
                className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Dia da semana"
              >
                {HAPPY_HOUR_DAYS.map((day) => {
                  const isActive = day.key === activeDay;
                  return (
                    <button
                      key={day.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveDay(day.key)}
                      className={`hh-day-tab focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "hh-day-tab--active"
                          : "border-hairline bg-surface text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn key={selectedDay.key} delay={0.04}>
              <p className="mt-6 font-garamond text-lg italic text-accent">
                {selectedDay.headline}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-3">
                {dayImages.map((src, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-sm">
                    <img
                      src={src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {selectedDay.petiscos.map((item) => (
                  <ExperienceMenuItem key={item.name} item={item} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding border-b border-hairline bg-surface">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                Drinks & Chopps
              </h2>
              <p className="mt-1 font-garamond text-base italic text-foreground-muted">
                Disponíveis em todos os dias do happy hour
              </p>
              <div className="mt-6 flex flex-col gap-5">
                {HAPPY_HOUR_DRINKS.map((item) => (
                  <ExperienceMenuItem key={item.name} item={item} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="font-garamond text-lg italic text-foreground-muted">
                Garanta sua mesa para o próximo happy hour.
              </p>
              <button
                type="button"
                onClick={openReservation}
                className="btn-primary focus-ring mt-6 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Fazer reserva
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
