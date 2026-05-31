import { FadeIn } from "@/components/FadeIn";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { DATE_PACKAGES, type DatePackageId } from "@/lib/date-experience";

const BADGE_STYLES: Record<DatePackageId, string> = {
  complete: "border-accent/30 bg-black/65 text-accent",
  vegan: "border-emerald-400/30 bg-black/65 text-emerald-200",
};

export function NoiteDosDates() {
  const { openWithPackage } = useExperienceCheckout();

  return (
    <section id="noite-dos-dates" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-6 text-center md:mb-7 md:text-left">
          <p className="section-eyebrow">Experiência exclusiva</p>
          <h2 className="section-title">
            Noite dos Dates
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="mb-10 max-w-3xl text-center text-sm leading-relaxed text-foreground-muted md:mb-12 md:text-left md:text-base">
            Conheça a Noite dos Dates, uma experiência imersiva feita para quem busca
            um romance autêntico e sem pressa na Savassi. Enquanto o jazz ao vivo dita
            o ritmo sob luzes baixas, vocês desfrutam de um menu degustação exclusivo
            e alta coquetelaria desenhada para compartilhar. O refúgio perfeito para se
            desconectar do mundo exterior e viver uma noite memorável a dois.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {DATE_PACKAGES.map((pkg, index) => (
            <FadeIn key={pkg.id} delay={0.1 + index * 0.06}>
              <article className="card-experience group flex h-full overflow-hidden md:flex-row">
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-auto md:h-auto md:w-[34%] md:min-h-[168px]">
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className={`absolute left-2.5 top-2.5 rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide backdrop-blur-md ${BADGE_STYLES[pkg.id]}`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-3.5 md:p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-normal text-foreground">
                        {pkg.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-foreground-muted">{pkg.subtitle}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-serif text-base leading-none text-accent">{pkg.price}</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-wide text-foreground-soft">
                        {pkg.priceNote}
                      </p>
                    </div>
                  </div>

                  <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-foreground-muted">
                    {pkg.description}
                  </p>

                  <ul className="mb-3 flex flex-wrap gap-x-2.5 gap-y-1">
                    {pkg.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1 text-[10px] text-foreground-soft"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openWithPackage(pkg.id)}
                    className="btn-primary mt-auto w-full py-2 text-[11px] font-medium uppercase tracking-[0.1em]"
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
