import { useEffect, useRef } from "react";
import { ExperienceHub } from "@/components/experiencias/ExperienceHub";
import { ExperiencePageShell } from "@/components/experiencias/ExperiencePageShell";
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
        <ExperienceHub />
      </main>
    </ExperiencePageShell>
  );
}
