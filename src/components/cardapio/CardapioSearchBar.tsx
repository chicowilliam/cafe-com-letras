import { Search, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioSearchBarProps = {
  lang: CardapioLang;
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export function CardapioSearchBar({
  lang,
  query,
  onQueryChange,
  resultCount,
  totalCount,
}: CardapioSearchBarProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="cardapio-search">
      <label htmlFor={inputId} className="sr-only">
        {lang === "pt" ? "Buscar no cardápio" : "Search menu"}
      </label>
      <div className="cardapio-search__field">
        <Search
          className="cardapio-search__icon"
          size={16}
          strokeWidth={1.75}
          aria-hidden
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={
            lang === "pt" ? "Buscar prato ou bebida…" : "Search dish or drink…"
          }
          className="cardapio-search__input focus-ring"
          autoComplete="off"
          enterKeyHint="search"
        />
        {hasQuery ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Limpar busca"
            className="cardapio-search__clear focus-ring"
          >
            <X size={16} strokeWidth={1.75} aria-hidden />
          </button>
        ) : null}
      </div>
      <p className="cardapio-search__status" aria-live="polite">
        {hasQuery
          ? lang === "pt"
            ? `${resultCount} de ${totalCount} itens encontrados`
            : `${resultCount} of ${totalCount} items found`
          : lang === "pt"
            ? `${totalCount} itens no cardápio`
            : `${totalCount} menu items`}
      </p>
    </div>
  );
}
