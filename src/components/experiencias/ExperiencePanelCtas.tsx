import { AppLink } from "@/components/AppLink";
import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";

type ExperiencePanelCtasProps = {
  entry: ExperienciaCatalogEntry;
  className?: string;
  primaryClassName?: string;
  ghostClassName?: string;
};

export function ExperiencePanelCtas({
  entry,
  className = "exp-hub-editorial__cta-row",
  primaryClassName = "exp-hub-editorial__cta btn-primary focus-ring",
  ghostClassName = "exp-hub-editorial__cta-ghost btn-ghost-minimal focus-ring",
}: ExperiencePanelCtasProps) {
  const { open: openReservation } = useReservation();
  const { open: openCheckout } = useExperienceCheckout();

  const reserveLabel =
    entry.id === "noite-dos-dates" ? "Garantir experiência" : "Reservar";

  const handleReserve = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (entry.id === "noite-dos-dates") {
      openCheckout({ theme: "dates" });
      return;
    }
    openReservation();
  };

  return (
    <div className={className}>
      <AppLink
        to={entry.href}
        className={primaryClassName}
        onClick={(event) => event.stopPropagation()}
      >
        Explorar experiência
        <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
      </AppLink>
      <button type="button" onClick={handleReserve} className={ghostClassName}>
        {reserveLabel}
      </button>
    </div>
  );
}
