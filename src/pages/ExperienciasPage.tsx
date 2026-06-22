import { useEffect, useRef } from "react";
import { Clock3 } from "lucide-react";
import { ExperienceHubCard } from "@/components/experiencias/ExperienceHubCard";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { FadeIn } from "@/components/FadeIn";
import { EXPERIENCIAS_CATALOG } from "@/lib/experiencias";

export default function ExperienciasPage() {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell
      title="Experiências · Café com Letras"
      backHref="/"
      backLabel="Voltar"
    >
      <main ref={contentRef}>
        <section className="section-padding border-b border-hairline bg-surface">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <span className="section-eyebrow">Como viver a casa</span>
              <h1 className="section-title mt-2 text-foreground">Experiências</h1>
              <p className="mx-auto mt-4 max-w-xl font-garamond text-xl italic leading-relaxed text-foreground-muted">
                Da tarde descontraída ao romance da noite — três momentos com horários,
                cardápios e atmosferas próprios.
              </p>
              <p className="mx-auto mt-4 flex max-w-lg items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] text-foreground-muted/70">
                <Clock3 size={14} strokeWidth={1.5} aria-hidden />
                Horários claros · sem confusão
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3 md:gap-6">
            {EXPERIENCIAS_CATALOG.map((entry, index) => (
              <FadeIn key={entry.id} delay={0.06 * index}>
                <ExperienceHubCard entry={entry} index={index} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-foreground-muted">
              A programação cultural — jazz, piano bar, saraus e lançamentos — continua na{" "}
              <a href="/#programacao" className="text-accent underline-offset-2 hover:underline">
                agenda do site
              </a>
              . Aqui você encontra só as experiências gastronômicas recorrentes da casa.
            </p>
          </FadeIn>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
