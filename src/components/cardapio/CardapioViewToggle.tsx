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
  const printLabel = lang === "pt" ? "Cardápio" : "Menu";
  const sheetLabel = lang === "pt" ? "Scan original" : "Original scan";

  return (
    <div
      className="cardapio-view-toggle"
      role="tablist"
      aria-label={
        lang === "pt" ? "Modo de visualização do cardápio" : "Menu view mode"
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
        {printLabel}
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
        {sheetLabel}
      </button>
    </div>
  );
}
