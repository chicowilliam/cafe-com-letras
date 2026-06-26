import { lazy, Suspense } from "react";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ReservationPopup } from "@/components/ReservationPopup";
import { SectionSkeleton } from "@/components/SectionSkeleton";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// PaletteSwitcher é ferramenta de preview: só carrega em desenvolvimento.
const PaletteSwitcher = import.meta.env.DEV
  ? lazy(() =>
      import("@/components/PaletteSwitcher").then((module) => ({
        default: module.PaletteSwitcher,
      })),
    )
  : null;

const About = lazy(() =>
  import("@/components/About").then((module) => ({ default: module.About })),
);
const Reconhecimentos = lazy(() =>
  import("@/components/Reconhecimentos").then((module) => ({
    default: module.Reconhecimentos,
  })),
);
const NoiteDosDates = lazy(() =>
  import("@/components/NoiteDosDates").then((module) => ({
    default: module.NoiteDosDates,
  })),
);
const Cardapio = lazy(() =>
  import("@/components/Cardapio").then((module) => ({ default: module.Cardapio })),
);
const Delivery = lazy(() =>
  import("@/components/Delivery").then((module) => ({ default: module.Delivery })),
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
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<SectionSkeleton className="min-h-[80vh]" />}>
          <NoiteDosDates />
        </Suspense>
        <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
          <Cardapio />
        </Suspense>
        <Suspense fallback={<SectionSkeleton className="min-h-[50vh]" />}>
          <Delivery />
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
        <Suspense fallback={<SectionSkeleton className="min-h-[5rem]" />}>
          <Reconhecimentos />
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
      {PaletteSwitcher ? (
        <Suspense fallback={null}>
          <PaletteSwitcher />
        </Suspense>
      ) : null}
    </>
  );
}
