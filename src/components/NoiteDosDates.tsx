import { FadeIn } from "@/components/FadeIn";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { DATE_PACKAGES } from "@/lib/date-experience";

export function NoiteDosDates() {
  const { openWithPackage } = useExperienceCheckout();

  return (
    <section
      id="noite-dos-dates"
      className="bg-[#12110f] py-24 px-6 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center md:text-left">
          <p className="mb-3 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
            Experiência exclusiva
          </p>
          <h2 className="font-serif text-3xl font-light tracking-tight text-[#f5f0e6] md:text-4xl">
            Noite dos Dates
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mb-16 max-w-3xl text-center font-serif text-lg leading-relaxed text-gray-300 md:text-left md:text-xl">
            Há noites que pedem silêncio, presença e um lugar que saiba receber o
            romance sem exageros. O Café com Letras se transforma nesse refúgio
            perfeito: luzes amenas desenham sombras suaves sobre mesas reservadas,
            jazz suave pulsa ao fundo como trilha sonora de encontros, o aroma
            inconfundível de café fresco paira no ar e prateleiras de livros
            abraçam o ambiente, criando a atmosfera definitiva e intimista para
            essa noite memorável a dois.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {DATE_PACKAGES.map((pkg, index) => (
            <FadeIn key={pkg.id} delay={0.15 + index * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/50 p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl text-[#f5f0e6]">{pkg.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-accent/80">
                      {pkg.badge}
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-accent">{pkg.price}</p>
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300">
                  {pkg.description}
                </p>

                <ul className="mb-8 space-y-2">
                  {pkg.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-foreground-muted"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openWithPackage(pkg.id)}
                  className="w-full rounded-full border border-accent/40 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                >
                  Selecionar Pacote
                </button>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
