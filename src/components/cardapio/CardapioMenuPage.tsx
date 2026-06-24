import type { CardapioSection } from "@/lib/cardapio-images";

type CardapioMenuPageProps = {
  section: CardapioSection;
  index: number;
  isActive: boolean;
  onOpenZoom: () => void;
};

export function CardapioMenuPage({
  section,
  index,
  isActive,
  onOpenZoom,
}: CardapioMenuPageProps) {
  const alt =
    index === 0
      ? `Cardápio do Café com Letras — ${section.label}`
      : section.label;

  return (
    <article
      id={section.id}
      aria-label={section.label}
      className={`cardapio-sheet scroll-mt-[7.5rem] lg:scroll-mt-20 ${
        isActive ? "cardapio-sheet--active" : "cardapio-sheet--inactive"
      }`}
    >
      <button
        type="button"
        onClick={onOpenZoom}
        aria-label={`Ampliar ${section.label}`}
        className="cardapio-sheet__trigger focus-ring"
      >
        <div className="cardapio-sheet__frame">
          <img
            src={section.src}
            alt={alt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="cardapio-sheet__image"
          />
        </div>
      </button>
    </article>
  );
}
