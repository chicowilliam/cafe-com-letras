import { lazy, Suspense } from "react";
import { DeferredModals } from "@/components/DeferredModals";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { ReservationPopup } from "@/components/ReservationPopup";
import { ExperienceCheckoutProvider } from "@/hooks/useExperienceCheckout";
import { ReservationProvider } from "@/hooks/useReservation";

const About = lazy(() =>
  import("@/components/About").then((module) => ({ default: module.About })),
);
const NoiteDosDates = lazy(() =>
  import("@/components/NoiteDosDates").then((module) => ({
    default: module.NoiteDosDates,
  })),
);
const CuradoriaSemanal = lazy(() =>
  import("@/components/CuradoriaSemanal").then((module) => ({
    default: module.CuradoriaSemanal,
  })),
);
const Programacao = lazy(() =>
  import("@/components/Programacao").then((module) => ({
    default: module.Programacao,
  })),
);
const ImageMarquee = lazy(() =>
  import("@/components/ImageMarquee").then((module) => ({
    default: module.ImageMarquee,
  })),
);

export default function App() {
  return (
    <ReservationProvider>
      <ExperienceCheckoutProvider>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <NoiteDosDates />
          </Suspense>
          <Suspense fallback={null}>
            <CuradoriaSemanal />
          </Suspense>
          <Suspense fallback={null}>
            <Programacao />
          </Suspense>
          <Suspense fallback={null}>
            <About />
          </Suspense>
          <Suspense fallback={null}>
            <ImageMarquee />
          </Suspense>
        </main>
        <Footer />
        <ReservationPopup />
        <PaletteSwitcher />
        <DeferredModals />
      </ExperienceCheckoutProvider>
    </ReservationProvider>
  );
}
