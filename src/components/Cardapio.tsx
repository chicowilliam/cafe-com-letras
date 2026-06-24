import { Link } from "react-router-dom";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { getHomeCardapioBlocks } from "@/lib/cardapio-home-config";

export function Cardapio() {
  const blocks = getHomeCardapioBlocks("pt");

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

        <FadeIn className="mt-4 mb-8 text-center md:mb-10">
          <p className="mx-auto max-w-md font-garamond text-lg italic leading-relaxed text-foreground-muted">
            Cada prato foi pensado para durar mais do que a refeição. Como um bom livro.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {blocks.map((block, index) => (
            <FadeIn key={block.id} delay={0.05 * index}>
              <h3 className="section-eyebrow border-b border-hairline pb-3">
                {block.label}
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                {block.items.map((item) => (
                  <li key={item.id} className="flex items-baseline gap-3">
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
              {block.hasMore ? (
                <p className="mt-4 font-garamond text-sm italic text-foreground-muted/50">
                  ...
                </p>
              ) : null}
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/cardapio"
            viewTransition
            className="btn-ghost focus-ring inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
          >
            Ver cardápio completo
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
