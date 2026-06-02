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
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-foreground-muted md:mx-0 md:text-left md:text-base">
          Tres escolhas da cozinha e do bar, capturadas em video.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRATOS_DA_SEMANA.map((prato, index) => (
            <FadeIn key={prato.id} delay={0.08 + index * 0.06}>
              <article className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline bg-surface">
                <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                  <source src={cloudinaryVideoUrl(prato.cloudinaryPublicId)} type="video/mp4" />
                </video>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}