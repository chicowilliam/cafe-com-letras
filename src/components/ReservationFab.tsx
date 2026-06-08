import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useReservation } from "@/hooks/useReservation";

function observeDatesSection(
  onChange: (reached: boolean) => void,
): () => void {
  let observer: IntersectionObserver | null = null;

  const attach = () => {
    const dates = document.getElementById("noite-dos-dates");
    if (!dates || observer) return true;

    observer = new IntersectionObserver(
      ([entry]) => onChange(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observer.observe(dates);
    return true;
  };

  if (attach()) return () => observer?.disconnect();

  const mutation = new MutationObserver(() => {
    if (attach()) mutation.disconnect();
  });
  mutation.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutation.disconnect();
    observer?.disconnect();
  };
}

export function ReservationFab() {
  const { open } = useReservation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    let pastHero = false;
    let reachedDates = false;

    const sync = () => setVisible(pastHero && reachedDates);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting || entry.intersectionRatio < 0.15;
        sync();
      },
      { threshold: [0, 0.15, 0.5, 1] },
    );
    heroObserver.observe(hero);

    const detachDates = observeDatesSection((reached) => {
      reachedDates = reached;
      sync();
    });

    return () => {
      heroObserver.disconnect();
      detachDates();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className={`focus-ring fixed z-50 flex !cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-ink shadow-lg shadow-black/40 transition-[transform,opacity] duration-300 ease-out active:scale-[0.98] hover:opacity-90 motion-reduce:transition-none bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] md:gap-2.5 md:px-5 md:py-3.5 ${
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
