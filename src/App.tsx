import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageMarquee } from "@/components/ImageMarquee";
import { Navbar } from "@/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ImageMarquee />
      </main>
      <Footer />
    </>
  );
}
