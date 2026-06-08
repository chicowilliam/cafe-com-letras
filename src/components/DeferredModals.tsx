import { lazy, Suspense } from "react";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";

const ReservationModal = lazy(() =>
  import("@/components/ReservationModal").then((module) => ({
    default: module.ReservationModal,
  })),
);

const ExperienceCheckoutModal = lazy(() =>
  import("@/components/ExperienceCheckoutModal").then((module) => ({
    default: module.ExperienceCheckoutModal,
  })),
);

export function DeferredModals() {
  const { isOpen: reservationOpen } = useReservation();
  const { isOpen: checkoutOpen } = useExperienceCheckout();

  if (!reservationOpen && !checkoutOpen) return null;

  return (
    <Suspense fallback={null}>
      {reservationOpen ? <ReservationModal /> : null}
      {checkoutOpen ? <ExperienceCheckoutModal /> : null}
    </Suspense>
  );
}
