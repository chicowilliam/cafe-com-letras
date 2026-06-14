import { FadeIn } from "@/components/FadeIn";

type Quote = { text: string; source: string };

const QUOTES: Quote[] = [
  {
    text: "Um patrimônio da vida artística de Belo Horizonte desde 1996.",
    source: "Savassi · Belo Horizonte",
  },
  {
    text: "Berço do Savassi Festival e do Jazz Com Todas as Letras.",
    source: "Cena cultural mineira",
  },
  {
    text: "Onde a literatura encontra o jazz, a arte e a boa mesa.",
    source: "Café com Letras",
  },
];

export function Quotes() {
  return (
    <section className="section-padding border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-10 md:mb-12">
          <p className="section-eyebrow">Reconhecimento</p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {QUOTES.map((quote, index) => (
            <FadeIn key={quote.text} delay={0.06 * index}>
              <figure className="flex h-full flex-col">
                <span
                  aria-hidden
                  className="font-display text-4xl leading-none text-accent/50"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-garamond text-xl italic leading-relaxed text-foreground md:text-2xl">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  {quote.source}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
