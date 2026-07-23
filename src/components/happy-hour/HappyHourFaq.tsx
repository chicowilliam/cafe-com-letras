import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Precisa reservar mesa?",
    answer:
      "No happy hour o terraço enche rápido — recomendamos reservar, sobretudo de sexta a domingo. Você reserva pelo site em poucos minutos.",
  },
  {
    question: "O happy hour vale o cardápio inteiro?",
    answer:
      "Não. A promoção cobre petiscos e drinks do happy hour Blue Moon. O restante do cardápio segue os preços regulares da casa.",
  },
  {
    question: "Tem opção vegana?",
    answer:
      "Sim. O choripan vegano está no spread de petiscos, e a cozinha pode orientar outras opções no dia.",
  },
];

function FaqRow({
  item,
  isOpen,
  onToggle,
  id,
}: {
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

export function HappyHourFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="hh-faq hh-section-bridge relative">
      <div className="hh-rail hh-rail--readable">
        <FadeIn>
          <p className="hh-faq-eyebrow">Antes de ir</p>
          <h2 className="hh-faq-title mt-2">Dúvidas do happy hour</h2>
          <div className="mt-6">
            {FAQ_ITEMS.map((item, index) => (
              <FaqRow
                key={item.question}
                item={item}
                id={`hh-faq-${index}`}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
