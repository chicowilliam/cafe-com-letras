import { SectionReveal, StaggerItem } from "@/components/SectionReveal";

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
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionReveal variant="stagger">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {QUOTES.map((quote, index) => (
              <StaggerItem key={quote.text} index={index}>
                <figure className="flex h-full flex-col">
                  <span aria-hidden className="quote-mark">
                    &ldquo;
                  </span>
                  <blockquote className="quote-text mt-2">{quote.text}</blockquote>
                  <figcaption className="section-caption mt-4">{quote.source}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
