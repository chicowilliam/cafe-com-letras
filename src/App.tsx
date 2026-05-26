import { lazy, Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const About = lazy(() =>
  import("@/components/About").then((module) => ({ default: module.About })),
);
const ImageMarquee = lazy(() =>
  import("@/components/ImageMarquee").then((module) => ({
    default: module.ImageMarquee,
  })),
);
const ProductGrid = lazy(() =>
  import("@/components/ProductGrid").then((module) => ({
    default: module.ProductGrid,
  })),
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <ProductGrid />
          <About />
          <ImageMarquee />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
