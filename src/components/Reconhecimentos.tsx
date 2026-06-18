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
      className="border-t border-b border-hairline bg-surface py-8 px-5 md:px-8"
    >
      <p className="mx-auto max-w-4xl text-center font-garamond text-sm italic text-foreground-muted">
        {RECONHECIMENTOS.join(" · ")}
      </p>
    </section>
  );
}
