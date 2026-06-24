import { useEffect, useRef } from "react";
import { ExperienciasHubHero } from "@/components/experiencias/ExperienciasHubHero";
import { ExperienceHubPanel } from "@/components/experiencias/ExperienceHubPanel";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
import { FadeIn } from "@/components/FadeIn";
import { EXPERIENCIAS_CATALOG } from "@/lib/experiencias";
import "@/styles/experiencias-hub.css";

export default function ExperienciasPage() {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperiencePageShell title="Experiências" backHref="/" backLabel="Voltar">
      <main ref={contentRef} data-page="experiencias-hub">
        <ExperienciasHubHero />

        <section className="section-padding border-t border-hairline bg-background">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <div className="exp-hub-timeline">
              {EXPERIENCIAS_CATALOG.map((entry, index) => (
                <FadeIn key={entry.id} delay={0.08 * index}>
                  <ExperienceHubPanel
                    entry={entry}
                    index={index}
                    reverse={index % 2 === 1}
                  />
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.28}>
              <p className="exp-hub-footer mx-auto mt-12 max-w-2xl text-center md:mt-16">
                Jazz, piano bar, saraus e lançamentos continuam na{" "}
                <a href="/#programacao">agenda do site</a>. Aqui você encontra
                as experiências gastronômicas recorrentes da casa.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
    </ExperiencePageShell>
  );
}
