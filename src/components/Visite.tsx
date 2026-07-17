import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { CardAccent } from "@/components/CardAccent";
import { SectionReveal, StaggerItem } from "@/components/SectionReveal";

const ADDRESS = "Rua Antônio de Albuquerque, 781 · Savassi · Belo Horizonte — MG";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9%20com%20Letras%20Savassi%20Belo%20Horizonte";

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Caf%C3%A9+com+Letras+Savassi+Belo+Horizonte&output=embed&hl=pt-BR&z=16";

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Precisa reservar mesa?",
    answer:
      "Recomendamos reserva para jantares e noites com música ao vivo. Você pode reservar pelo site ou pelo nosso WhatsApp.",
  },
  {
    question: "Tem couvert artístico?",
    answer:
      "Sim, há couvert artístico nas noites com apresentações musicais. O valor varia conforme a atração e é informado na entrada.",
  },
  {
    question: "Há taxa de serviço?",
    answer:
      "Sim. Cobramos 12% de taxa de serviço por comanda ou por mesa, conforme o atendimento. O valor remunera nossa equipe e não está incluso nos preços do cardápio.",
  },
  {
    question: "Aceita pets?",
    answer:
      "Sim! Pets de pequeno e médio porte são bem-vindos nas áreas abertas do café.",
  },
  {
    question: "Tem estacionamento próximo?",
    answer:
      "Há estacionamentos rotativos e vagas na Savassi nas redondezas. Nos finais de semana, recomendamos chegar com antecedência.",
  },
];

function FaqRow({ item, isOpen, onToggle, id }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className="focus-ring flex w-full items-center justify-between gap-4 rounded-md py-4 text-left"
      >
        <span className="font-display text-base text-foreground md:text-lg">
          {item.question}
        </span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-300 motion-reduce:transition-none ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>
      <div
        id={id}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose pb-4 text-sm leading-relaxed text-foreground-muted">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Visite() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="visite" className="section-canvas section-canvas--shift section-padding">
      <div className="mx-auto max-w-6xl">
        <AnimatedSectionHeading
          className="mb-8 md:mb-10"
          eyebrow="Visite"
          title="Onde nos encontrar"
          kicker="Rua Antônio de Albuquerque — no coração da Savassi, entre estacionamentos rotativos e a vida cultural do bairro."
          editorial
        />

        <SectionReveal variant="stagger">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <StaggerItem index={0} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)] border border-hairline">
                <iframe
                  src={MAPS_EMBED_URL}
                  title="Localização do Café com Letras na Savassi, Belo Horizonte"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="map-iframe h-full w-full border-0"
                />
              </div>

              <div className="mt-5">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {ADDRESS}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary focus-ring mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none"
                >
                  <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
                  Abrir no Google Maps
                </a>
              </div>
            </StaggerItem>

            <StaggerItem index={1}>
              <div className="editorial-inset-panel editorial-inset-panel--soft relative px-5 py-6 md:px-6 md:py-7">
                <CardAccent variant="sprig-b" />
                <div className="relative z-[2]">
                <p className="section-caption">Perguntas frequentes</p>
                <div className="mt-3">
                  {FAQ_ITEMS.map((item, index) => (
                    <FaqRow
                      key={item.question}
                      id={`faq-${index}`}
                      item={item}
                      isOpen={openIndex === index}
                      onToggle={() =>
                        setOpenIndex((current) => (current === index ? null : index))
                      }
                    />
                  ))}
                </div>
                </div>
              </div>
            </StaggerItem>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
