import { lazy, Suspense } from "react";
import { BackToTop } from "@/components/BackToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { DeferredModals } from "@/components/DeferredModals";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { ReservationPopup } from "@/components/ReservationPopup";
import { SectionSkeleton } from "@/components/SectionSkeleton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
const Quotes = lazy(() =>
  import("@/components/Quotes").then((module) => ({ default: module.Quotes })),
);
const Visite = lazy(() =>
  import("@/components/Visite").then((module) => ({ default: module.Visite })),
);
const Newsletter = lazy(() =>
  import("@/components/Newsletter").then((module) => ({
    default: module.Newsletter,
  })),
);

export default function App() {
  return (
    <ReservationProvider>
      <ExperienceCheckoutProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Suspense fallback={<SectionSkeleton className="min-h-[80vh]" />}>
            <NoiteDosDates />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[80vh]" />}>
            <CuradoriaSemanal />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[80vh]" />}>
            <Programacao />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[40vh]" />}>
            <Quotes />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[40vh]" />}>
            <ImageMarquee />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
            <Visite />
          </Suspense>
          <Suspense fallback={<SectionSkeleton className="min-h-[30vh]" />}>
            <Newsletter />
          </Suspense>
        </main>
        <Footer />
        <ReservationPopup />
        <WhatsAppButton />
        <BackToTop />
        <PaletteSwitcher />
        <CookieConsent />
        <DeferredModals />
      </ExperienceCheckoutProvider>
    </ReservationProvider>
  );
}
