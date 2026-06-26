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
          </AppLink>
        </FadeIn>
      </div>
    </section>
  );
}
