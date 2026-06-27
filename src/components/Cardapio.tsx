import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function Cardapio() {
  return (
    <section id="cardapio" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn className="mb-8 md:mb-10">
          <SectionHeading
            index="02"
            eyebrow="Sabores da casa"
            title="Cardápio"
            kicker="da cozinha mineira ao café autoral"
          />
        </FadeIn>

        <FadeIn className="mx-auto max-w-md">
          <p className="font-garamond text-lg italic leading-relaxed text-foreground-muted">
            Cada prato foi pensado para durar mais do que a refeição. Como um bom livro.
          </p>
          <AppLink
            to="/cardapio"
            className="btn-ghost focus-ring mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
          >
            Ver cardápio completo
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </AppLink>
        </FadeIn>
      </div>
    </section>
  );
}
