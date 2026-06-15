import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { CARDAPIO } from "@/lib/cardapio";

export function Cardapio() {
  return (
    <section id="cardapio" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-8 md:mb-10">
          <SectionHeading
            index="02"
            eyebrow="Sabores da casa"
            title="Cardápio"
            kicker="da cozinha mineira ao café autoral"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {CARDAPIO.map((categoria, index) => (
            <FadeIn key={categoria.id} delay={0.05 * index}>
              <h3 className="section-eyebrow border-b border-hairline pb-3">
                {categoria.label}
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                {categoria.items.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-base text-foreground">
                        {item.name}
                      </p>
                      {item.description ? (
                        <p className="mt-0.5 text-sm leading-relaxed text-foreground-muted">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <span
                      aria-hidden
                      className="mb-1 min-w-3 flex-1 self-end border-b border-dotted border-hairline"
                    />
                    <span className="shrink-0 font-display text-sm text-accent">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        <p className="mt-10 text-xs text-foreground-muted/70">
          Valores e itens sujeitos a alteração. Consulte o cardápio completo no café.
        </p>
      </div>
    </section>
  );
}
