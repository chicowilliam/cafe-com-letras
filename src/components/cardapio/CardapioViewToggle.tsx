import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioViewToggleProps = {
  lang: CardapioLang;
  mode: "sheet" | "list";
  onChange: (mode: "sheet" | "list") => void;
};

export function CardapioViewToggle({
  lang,
  mode,
  onChange,
}: CardapioViewToggleProps) {
  const sheetLabel = lang === "pt" ? "Cardápio impresso" : "Printed menu";
  const listLabel = lang === "pt" ? "Lista interativa" : "Interactive list";

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
        aria-selected={mode === "sheet"}
        onClick={() => onChange("sheet")}
        className={`cardapio-view-toggle__btn focus-ring ${
          mode === "sheet" ? "is-active" : ""
        }`}
      >
        {sheetLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "list"}
        onClick={() => onChange("list")}
        className={`cardapio-view-toggle__btn focus-ring ${
          mode === "list" ? "is-active" : ""
        }`}
      >
        {listLabel}
      </button>
    </div>
  );
}
