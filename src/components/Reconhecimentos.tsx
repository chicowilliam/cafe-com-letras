import { SectionReveal } from "@/components/SectionReveal";

const RECONHECIMENTOS = [
  "Jazz com Todas as Letras",
  "Savassi Festival",
  "Estado de Minas",
  "Encontro Gastrô",
  "Cultura BH",
] as const;

export function Reconhecimentos() {
  return (
    <section
      aria-label="Reconhecimentos culturais"
      className="section-ribbon relative z-[1] px-5 py-10 md:px-8 md:py-12"
    >
      <SectionReveal variant="subtle">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-caption">Na cena cultural</p>
          <p className="mx-auto mt-3 max-w-2xl text-lead md:text-lg">
            Três décadas entre festivais, imprensa e encontros que marcaram a Savassi.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:mt-7 md:gap-3">
            {RECONHECIMENTOS.map((name) => (
              <li key={name}>
                <span className="editorial-badge">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </section>
  );
}
