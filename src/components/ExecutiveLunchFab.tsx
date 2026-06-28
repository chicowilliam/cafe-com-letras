import { m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  EXECUTIVE_LUNCH_ANCHOR,
  isExecutiveLunchHours,
  isExecutiveLunchWeekday,
} from "@/lib/executive-lunch";
import { revealSpring } from "@/lib/motion-presets";

const fabClassName =
  "focus-ring group flex max-w-[calc(100vw-5.5rem)] items-center gap-2.5 rounded-full border border-white/12 bg-background/60 py-2 pl-3 pr-3.5 text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:border-accent/30 hover:bg-background/78 hover:shadow-[0_6px_28px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98] motion-reduce:transition-none sm:pl-3.5 sm:pr-4";

function scrollToExecutiveLunch() {
  const target = document.getElementById(EXECUTIVE_LUNCH_ANCHOR);
  if (!target) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
}

export function ExecutiveLunchFab() {
  const reduceMotion = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [isWeekday, setIsWeekday] = useState(isExecutiveLunchWeekday);
  const [duringLunch, setDuringLunch] = useState(isExecutiveLunchHours);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) {
      setPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.4);
      },
      { threshold: [0, 0.4, 0.7, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      setIsWeekday(isExecutiveLunchWeekday());
      setDuringLunch(isExecutiveLunchHours());
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!isWeekday) return null;

  const content = (
    <>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.5625rem] font-semibold uppercase leading-none tracking-wide ${
          duringLunch
            ? "border-accent/35 bg-accent/15 text-accent"
            : "border-white/10 bg-white/5 text-foreground-muted"
        }`}
        aria-hidden
      >
        seg–sex
      </span>
      <span className="min-w-0 text-left leading-tight">
        <span className="block truncate font-sans text-xs font-medium tracking-wide text-foreground sm:text-[0.8125rem]">
          Almoço executivo
        </span>
        <span className="block truncate font-garamond text-[0.6875rem] italic text-foreground-muted sm:text-xs">
          {duringLunch ? "Menu do dia · servido agora" : "Menu do dia · seg–sex"}
        </span>
      </span>
      <ArrowRight
        size={15}
        strokeWidth={1.75}
        aria-hidden
        className="shrink-0 text-foreground-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none"
      />
    </>
  );

  const positionClass =
    "fixed z-40 bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))]";

  const visibilityClass = pastHero
    ? "translate-x-0 opacity-100"
    : "pointer-events-none -translate-x-[120%] opacity-0";

  const buttonProps = {
    type: "button" as const,
    onClick: scrollToExecutiveLunch,
    "aria-label": "Ir para o almoço executivo na seção cardápio",
    "aria-hidden": !pastHero,
  };

  if (reduceMotion) {
    return (
      <button
        {...buttonProps}
        className={`${fabClassName} ${positionClass} transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${visibilityClass}`}
      >
        {content}
      </button>
    );
  }

  return (
    <m.div
      className={positionClass}
      initial={false}
      animate={pastHero ? { opacity: 1, x: 0 } : { opacity: 0, x: "-120%" }}
      transition={revealSpring}
    >
      <button
        {...buttonProps}
        className={`${fabClassName} ${pastHero ? "" : "pointer-events-none"}`}
      >
        {content}
      </button>
    </m.div>
  );
}
