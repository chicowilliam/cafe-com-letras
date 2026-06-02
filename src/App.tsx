import { lazy, Suspense } from "react";
import { ExperienceCheckoutModal } from "@/components/ExperienceCheckoutModal";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ReservationFab } from "@/components/ReservationFab";
import { ReservationModal } from "@/components/ReservationModal";
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
            <CuradoriaSemanal />
            <About />
            <ImageMarquee />
          </Suspense>
        </main>
        <Footer />
        <ReservationFab />
        <ReservationModal />
        <ExperienceCheckoutModal />
      </ExperienceCheckoutProvider>
    </ReservationProvider>
  );
}
