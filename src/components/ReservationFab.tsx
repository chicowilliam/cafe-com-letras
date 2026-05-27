import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useReservation } from "@/hooks/useReservation";

export function ReservationFab() {
  const { open } = useReservation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("inicio");
      const sobre = document.getElementById("sobre");
      if (!hero || !sobre) {
        setVisible(false);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      const sobreTop = sobre.getBoundingClientRect().top;
      const leftHero = heroBottom < window.innerHeight * 0.15;
      const reachedHistory = sobreTop < window.innerHeight * 0.9;
      setVisible(leftHero && reachedHistory);
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
      aria-label="Fazer uma reserva"
      className={`fab-expand group fixed z-50 flex h-14 w-14 items-center overflow-hidden rounded-full bg-accent text-[#12110f] shadow-lg shadow-black/40 motion-reduce:transition-none bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <CalendarDays size={22} strokeWidth={1.5} />
      </span>
      <span className="fab-expand-label whitespace-nowrap pr-4 text-sm font-medium">
        Fazer uma reserva
      </span>
    </button>
  );
}
