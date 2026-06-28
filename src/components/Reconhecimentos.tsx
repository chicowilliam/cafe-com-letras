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
      className="section-ribbon py-10 px-5 md:px-8 md:py-12"
    >
      <p className="mx-auto max-w-4xl text-center text-lead md:text-lg">
        {RECONHECIMENTOS.join(" · ")}
      </p>
    </section>
  );
}
