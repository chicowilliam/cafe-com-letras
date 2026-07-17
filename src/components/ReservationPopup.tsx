import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useReservation } from "@/hooks/useReservation";
import { CTA_LABELS } from "@/lib/cta-labels";

export function ReservationPopup() {
  const { open } = useReservation();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.4);
      },
      { threshold: [0, 0.4, 0.7, 1] },
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      aria-label={CTA_LABELS.reserve}
      aria-hidden={!pastHero}
      className={`btn-primary focus-ring fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-contact transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
        pastHero
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-[120%] opacity-0"
      }`}
    >
      <CalendarDays size={18} strokeWidth={1.75} className="shrink-0" />
      <span className="whitespace-nowrap">{CTA_LABELS.reserve}</span>
    </button>
  );
}
