import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { DATE_PACKAGES, type DatePackageId } from "@/lib/date-experience";

const BADGE_STYLES: Record<DatePackageId, string> = {
  complete: "border-accent/30 bg-black/65 text-accent",
  vegan: "border-accent-2/30 bg-black/65 text-accent-2",
};

export function NoiteDosDates() {
  const { openWithPackage } = useExperienceCheckout();

  return (
    <section id="noite-dos-dates" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-8 md:mb-10">
          <SectionHeading
            index="01"
            eyebrow="Experiência exclusiva"
            title="Noite dos Dates"
          />
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
              <article className="card-experience group flex h-full flex-col overflow-hidden md:flex-row">
                <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-1/3 md:min-h-[168px]">
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="h-48 w-full object-cover object-center transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105 motion-reduce:transition-none md:h-full md:w-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className={`absolute left-2.5 top-2.5 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-tight backdrop-blur-md ${BADGE_STYLES[pkg.id]}`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                <div className="flex min-w-0 w-full flex-1 flex-col p-3.5 md:p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-display text-base text-foreground">{pkg.title}</h3>
                      <p className="mt-0.5 text-[11px] text-foreground-muted">{pkg.subtitle}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base leading-none text-accent">{pkg.price}</p>
                      <p className="mt-0.5 text-[11px] text-foreground-muted">{pkg.priceNote}</p>
                    </div>
                  </div>

                  <p className="mb-2.5 line-clamp-2 text-[13px] leading-relaxed text-foreground-muted">
                    {pkg.description}
                  </p>

                  <ul className="mb-3 flex flex-wrap gap-x-2.5 gap-y-1">
                    {pkg.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1 text-[11px] text-foreground-muted"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openWithPackage(pkg.id)}
                    className="btn-primary focus-ring mt-auto w-full py-2.5 text-[13px]"
                  >
                    Selecionar pacote
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
