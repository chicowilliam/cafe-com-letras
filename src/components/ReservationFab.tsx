import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useReservation } from "@/hooks/useReservation";

export function ReservationFab() {
  const { open } = useReservation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("inicio");
      const dates = document.getElementById("noite-dos-dates");
      if (!hero || !dates) {
        setVisible(false);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      const datesTop = dates.getBoundingClientRect().top;
      const leftHero = heroBottom < window.innerHeight * 0.15;
      const reachedContent = datesTop < window.innerHeight * 0.9;
      setVisible(leftHero && reachedContent);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const poll = window.setInterval(update, 250);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className={`fixed z-50 flex !cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-[#12110f] shadow-lg shadow-black/40 transition-[transform,opacity] duration-300 ease-out active:scale-[0.98] hover:opacity-90 motion-reduce:transition-none bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] md:gap-2.5 md:px-5 md:py-3.5 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <CalendarDays size={18} strokeWidth={1.75} className="shrink-0 md:hidden" />
      <CalendarDays size={20} strokeWidth={1.75} className="hidden shrink-0 md:block" />
      <span className="whitespace-nowrap">Fazer reserva</span>
    </button>
  );
}
