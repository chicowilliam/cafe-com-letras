import { lazy, Suspense } from "react";

import { BackToTop } from "@/components/BackToTop";
import { ExecutiveLunchFab } from "@/components/ExecutiveLunchFab";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HomeBotanicalSheet } from "@/components/HomeBotanicalSheet";
import { HomeTodayRibbon } from "@/components/HomeTodayRibbon";
import { Programacao } from "@/components/Programacao";
import { SectionHandoff } from "@/components/SectionBridge";
import { SectionSkeleton } from "@/components/SectionSkeleton";
import { SiteWallpaper } from "@/components/SiteWallpaper";
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
const TemporadaFestival = lazy(() =>
  import("@/components/TemporadaFestival").then((module) => ({
    default: module.TemporadaFestival,
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
      <div className="home-shell">
        {/* Folha contínua (absolute + repeat-y): mesma origem em seções e handoffs */}
        <HomeBotanicalSheet />
        <SiteWallpaper mode="absolute" />
        <main id="main" className="section-stack">
          <Hero />
          <HomeTodayRibbon />
          <SectionHandoff variant="breath" from="background" to="background" overlap="sm" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[36vh]" />}>
              <NoiteDosDates />
            </Suspense>
          </div>

          <SectionHandoff variant="wash" from="background" to="background" overlap="sm" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
              <Cardapio />
            </Suspense>
          </div>

          <SectionHandoff variant="wash" from="background" to="surface" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[50vh]" />}>
              <Delivery />
            </Suspense>
          </div>

          {/* Temporada entre Delivery e Curadoria: comida em cartaz sem roubar o hub de experiências */}
          <SectionHandoff variant="breath" from="background" to="background" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[40vh]" />}>
              <TemporadaFestival />
            </Suspense>
          </div>

          <SectionHandoff variant="wave" from="surface" to="background" overlap="sm" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[80vh]" />}>
              <CuradoriaSemanal />
            </Suspense>
          </div>

          <SectionHandoff
            variant="chapter"
            from="background"
            to="background"
            chapterIndex="04"
            chapterLabel="Programação"
            overlap="sm"
            className="home-programacao-chapter"
          />

          <div className="section-below-fold home-programacao-block">
            <Programacao />
          </div>

          <SectionHandoff
            variant="chapter"
            from="background"
            to="background"
            chapterIndex="05"
            chapterLabel="A História"
            overlap="sm"
          />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
              <About />
            </Suspense>
          </div>

          <SectionHandoff
            variant="wash"
            from="background"
            to="background"
            overlap="sm"
          />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[5rem]" />}>
              <Reconhecimentos />
            </Suspense>
          </div>

          <SectionHandoff variant="accent-band" from="background" to="background" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[40vh]" />}>
              <Quotes />
            </Suspense>
          </div>

          <SectionHandoff
            variant="chapter"
            from="surface"
            to="surface"
            chapterIndex="06"
            chapterLabel="Galeria"
            overlap="sm"
          />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[40vh]" />}>
              <ImageMarquee />
            </Suspense>
          </div>

          <SectionHandoff
            variant="chapter"
            from="surface"
            to="background"
            chapterIndex="07"
            chapterLabel="Visite"
          />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[60vh]" />}>
              <Visite />
            </Suspense>
          </div>

          <SectionHandoff variant="breath" from="background" to="background" />

          <div className="section-below-fold">
            <Suspense fallback={<SectionSkeleton className="min-h-[30vh]" />}>
              <Newsletter />
            </Suspense>
          </div>

          <SectionHandoff variant="accent-band" from="background" to="background" />
        </main>

        <Footer />
      </div>

      <ExecutiveLunchFab />
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
