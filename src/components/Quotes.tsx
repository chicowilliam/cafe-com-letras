import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal, StaggerItem } from "@/components/SectionReveal";

type Quote = { text: string; source: string; featured?: boolean };

const QUOTES: Quote[] = [
  {
    text: "Um patrimônio da vida artística de Belo Horizonte desde 1996.",
    source: "Savassi · Belo Horizonte",
  },
  {
    text: "Berço do Savassi Festival e do Jazz Com Todas as Letras.",
    source: "Cena cultural mineira",
    featured: true,
  },
  {
    text: "Onde a literatura encontra o jazz, a arte e a boa mesa.",
    source: "Café com Letras",
  },
];

function QuoteFigure({
  quote,
  className = "",
}: {
  quote: Quote;
  className?: string;
}) {
  return (
    <figure className={`flex h-full flex-col ${className}`.trim()}>
      <span aria-hidden className="quote-mark">
        &ldquo;
      </span>
      <blockquote className="quote-text mt-2">{quote.text}</blockquote>
      <figcaption className="section-caption mt-4">{quote.source}</figcaption>
    </figure>
  );
}

export function Quotes() {
  return (
    <section className="section-canvas section-canvas--surface section-padding">
      <div className="mx-auto max-w-6xl">
        <AnimatedSectionHeading
          eyebrow="Vozes"
          title="Quem fala da casa"
          align="left"
          kicker="Imprensa, público e cena cultural — o Café com Letras na memória coletiva de BH."
          editorial
          className="mb-10 md:mb-12"
        />

        <SectionReveal variant="stagger">
          <div className="quotes-editorial-grid">
            {QUOTES.map((quote, index) => (
              <StaggerItem
                key={quote.text}
                index={index}
                className={quote.featured ? "quotes-editorial-featured" : ""}
              >
                <QuoteFigure quote={quote} />
              </StaggerItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
