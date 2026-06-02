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
              <article className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 hover:scale-[1.015] hover:shadow-xl">
                <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                  <source src={cloudinaryVideoUrl(prato.cloudinaryPublicId)} type="video/mp4" />
                </video>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-accent/90">{prato.tag}</p>
                  <h3 className="font-display text-xl text-white">{prato.nome}</h3>
                  <p className="mt-2 text-sm text-stone-300">{prato.descricao}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}