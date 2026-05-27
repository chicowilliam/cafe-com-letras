import { lazy, Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ReservationModal } from "@/components/ReservationModal";
import { ReservationProvider } from "@/hooks/useReservation";

const About = lazy(() =>
  import("@/components/About").then((module) => ({ default: module.About })),
);
const ImageMarquee = lazy(() =>
  import("@/components/ImageMarquee").then((module) => ({
    default: module.ImageMarquee,
  })),
);

export default function App() {
  return (
    <ReservationProvider>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <ImageMarquee />
        </Suspense>
      </main>
      <Footer />
      <ReservationModal />
    </ReservationProvider>
  );
}
