import { FadeIn } from "@/components/FadeIn";
import { cloudinaryVideoUrl, PRATOS_DA_SEMANA } from "@/lib/curadoria-semanal";

export function CuradoriaSemanal() {
  return (
    <section id="curadoria-da-semana" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-10 text-center md:mb-14 md:text-left">
          <p className="section-eyebrow">Menu em movimento</p>
          <h2 className="section-title">Curadoria da Semana</h2>
        </FadeIn>
      </div>
    </section>
  );
}