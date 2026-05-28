import { FadeIn } from "@/components/FadeIn";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { DATE_PACKAGES } from "@/lib/date-experience";

export function NoiteDosDates() {
  const { openWithPackage } = useExperienceCheckout();

  return (
    <section id="noite-dos-dates" className="bg-background px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-6 text-center md:mb-7 md:text-left">
          <p className="label-caps-wide mb-2 text-accent/80">Experiência exclusiva</p>
          <h2 className="font-serif text-2xl font-normal tracking-[-0.02em] text-foreground md:text-3xl">
            Noite dos Dates
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mb-8 max-w-3xl text-center font-serif text-base leading-relaxed text-foreground-muted md:mb-9 md:text-left md:text-[1.0625rem] md:leading-[1.65]">
            Há noites que pedem silêncio, presença e um lugar que saiba receber o
            romance sem exageros. Luzes amenas, jazz suave, café fresco e prateleiras
            de livros criam a atmosfera intimista para essa noite memorável a dois.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {DATE_PACKAGES.map((pkg, index) => (
            <FadeIn key={pkg.id} delay={0.1 + index * 0.06}>
              <article className="card-experience group flex h-full flex-col overflow-hidden md:flex-row">
                <div className="relative aspect-[2/1] shrink-0 overflow-hidden md:aspect-auto md:w-[38%] md:min-h-[220px]">
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                    {pkg.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 md:p-4 md:pl-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-normal text-foreground">
                        {pkg.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-foreground-muted">{pkg.subtitle}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-serif text-lg text-accent">{pkg.price}</p>
                      <p className="text-[10px] text-foreground-soft">{pkg.priceNote}</p>
                    </div>
                  </div>

                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-foreground-muted">
                    {pkg.description}
                  </p>

                  <ul className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
                    {pkg.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-[11px] text-foreground-soft"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openWithPackage(pkg.id)}
                    className="btn-primary mt-auto w-full py-2.5 text-[13px]"
                  >
                    Selecionar Pacote
                  </button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
