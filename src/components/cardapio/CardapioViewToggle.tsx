import type { CardapioLang } from "@/lib/cardapio-images";
import type { CardapioViewMode } from "@/hooks/useCardapioViewMode";

type CardapioViewToggleProps = {
  lang: CardapioLang;
  mode: CardapioViewMode;
  onChange: (mode: CardapioViewMode) => void;
};

export function CardapioViewToggle({
  lang,
  mode,
  onChange,
}: CardapioViewToggleProps) {
  const printLabel = lang === "pt" ? "Ler" : "Read";
  const sheetLabel = lang === "pt" ? "Folhear" : "Browse sheets";

  return (
    <div
      className="cardapio-view-toggle"
      role="tablist"
      aria-label={
        lang === "pt" ? "Como ver o cardápio" : "How to view the menu"
      }
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "print"}
        onClick={() => onChange("print")}
        className={`cardapio-view-toggle__btn focus-ring ${
          mode === "print" ? "is-active" : ""
        }`}
      >
        <span className="cardapio-view-toggle__label">{printLabel}</span>
        <span className="cardapio-view-toggle__hint">
          {lang === "pt" ? "Busca e leitura" : "Search & read"}
        </span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "sheet"}
        onClick={() => onChange("sheet")}
        className={`cardapio-view-toggle__btn focus-ring ${
          mode === "sheet" ? "is-active" : ""
        }`}
      >
        <span className="cardapio-view-toggle__label">{sheetLabel}</span>
        <span className="cardapio-view-toggle__hint">
          {lang === "pt" ? "Como na mesa" : "Like at the table"}
        </span>
      </button>
    </div>
  );
}
