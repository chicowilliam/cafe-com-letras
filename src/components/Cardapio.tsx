import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { ExecutiveLunchSpotlight } from "@/components/ExecutiveLunchSpotlight";
import { SectionReveal } from "@/components/SectionReveal";

export function Cardapio() {
  return (
    <section id="cardapio" className="section-canvas section-canvas--shift section-padding">
      <div className="mx-auto max-w-6xl text-center">
        <AnimatedSectionHeading
          className="mb-8 md:mb-10"
          index="02"
          eyebrow="Sabores da casa"
          title="Cardápio"
          kicker="da cozinha mineira ao café autoral"
          editorial
        />

        <ExecutiveLunchSpotlight />

        <SectionReveal variant="line-mask" className="mx-auto mt-8 max-w-md md:mt-10">
          <p className="text-lead leading-relaxed">
            Cada prato foi pensado para durar mais do que a refeição. Como um bom livro.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-8 max-w-md md:mt-10">
          <AppLink
            to="/cardapio"
            className="btn-ghost focus-ring inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
          >
            Ver cardápio completo
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </AppLink>
        </div>
      </div>
    </section>
  );
}
