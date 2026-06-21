import {
  scrollToCardapioSection,
  type CardapioSection,
} from "@/lib/cardapio-images";

type CardapioSectionNavProps = {
  sections: CardapioSection[];
  activeId: string;
  variant: "desktop" | "mobile";
};

function NavButton({
  section,
  isActive,
  variant,
}: {
  section: CardapioSection;
  isActive: boolean;
  variant: "desktop" | "mobile";
}) {
  const baseClass =
    variant === "desktop"
      ? "focus-ring block w-full rounded-md border-l-2 py-2 pl-3 pr-2 text-left text-sm transition-colors duration-200 motion-reduce:transition-none"
      : "focus-ring inline-flex min-h-11 shrink-0 items-center rounded-full border px-3.5 py-2 text-sm transition-colors duration-200 motion-reduce:transition-none";

  const stateClass =
    variant === "desktop"
      ? isActive
        ? "border-accent bg-accent/8 font-medium text-accent"
        : "border-transparent text-foreground-muted hover:border-accent/25 hover:text-foreground"
      : isActive
        ? "border-accent/40 bg-accent/12 font-medium text-accent"
        : "border-hairline bg-surface text-foreground-muted hover:border-accent/25 hover:text-foreground";

  return (
    <button
      type="button"
      aria-current={isActive ? "true" : undefined}
      onClick={() => scrollToCardapioSection(section.id)}
      className={`${baseClass} ${stateClass}`}
    >
      {section.label}
    </button>
  );
}

export function CardapioSectionNav({
  sections,
  activeId,
  variant,
}: CardapioSectionNavProps) {
  if (variant === "mobile") {
    return (
      <nav
        aria-label="Seções do cardápio"
        className="border-b border-hairline bg-background/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[700px] gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <NavButton
              key={section.id}
              section={section}
              isActive={activeId === section.id}
              variant="mobile"
            />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Seções do cardápio" className="sticky top-[4.5rem] pt-2">
      <p className="section-eyebrow mb-3 !text-[10px]">Seções</p>
      <ul className="flex flex-col gap-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            <NavButton
              section={section}
              isActive={activeId === section.id}
              variant="desktop"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
