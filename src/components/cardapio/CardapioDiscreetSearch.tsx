import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { CardapioLang } from "@/lib/cardapio-images";
import { getSearchPlaceholders } from "@/lib/cardapio-premium";

type CardapioDiscreetSearchProps = {
  lang: CardapioLang;
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export function CardapioDiscreetSearch({
  lang,
  query,
  onQueryChange,
  resultCount,
  totalCount,
}: CardapioDiscreetSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const hasQuery = query.trim().length > 0;
  const placeholders = getSearchPlaceholders(lang);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open || hasQuery) return;
    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [open, hasQuery, placeholders.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        if (hasQuery) onQueryChange("");
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hasQuery, onQueryChange]);

  return (
    <div className="cardapio-discreet-search">
      {open ? (
        <div className="cardapio-discreet-search__panel">
          <div className="cardapio-discreet-search__field">
            <label htmlFor={inputId} className="sr-only">
              {lang === "pt" ? "Buscar no cardápio" : "Search menu"}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="cardapio-discreet-search__input focus-ring"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => {
                if (hasQuery) onQueryChange("");
                else setOpen(false);
              }}
              aria-label={lang === "pt" ? "Fechar busca" : "Close search"}
              className="cardapio-discreet-search__toggle focus-ring"
            >
              <X size={16} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <p className="cardapio-discreet-search__status" aria-live="polite">
            {hasQuery
              ? lang === "pt"
                ? `${resultCount} de ${totalCount} itens`
                : `${resultCount} of ${totalCount} items`
              : lang === "pt"
                ? `${totalCount} itens na carta`
                : `${totalCount} items on the menu`}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={lang === "pt" ? "Buscar no cardápio" : "Search menu"}
          className="cardapio-discreet-search__toggle focus-ring"
        >
          <Search size={16} strokeWidth={1.75} aria-hidden />
        </button>
      )}
    </div>
  );
}
