import { useMemo, useState } from "react";
import { CardapioListSection } from "@/components/cardapio/CardapioListSection";
import { CardapioSearchBar } from "@/components/cardapio/CardapioSearchBar";
import { getCatalog } from "@/lib/cardapio-catalog";
import { countCatalogItems, searchCatalog } from "@/lib/cardapio-search";
import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioListViewerProps = {
  lang: CardapioLang;
  onChangeLang: () => void;
};

export function CardapioListViewer({ lang, onChangeLang }: CardapioListViewerProps) {
  const [query, setQuery] = useState("");
  const baseCatalog = useMemo(() => getCatalog(lang), [lang]);
  const filteredCatalog = useMemo(
    () => searchCatalog(baseCatalog, query),
    [baseCatalog, query],
  );

  const totalCount = countCatalogItems(baseCatalog);
  const resultCount = countCatalogItems(filteredCatalog);
  const hasResults = filteredCatalog.sections.length > 0;

  return (
    <div className="cardapio-list-viewer">
      <CardapioSearchBar
        lang={lang}
        query={query}
        onQueryChange={setQuery}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      <div className="cardapio-list-viewer__stack">
        {hasResults ? (
          filteredCatalog.sections.map((section) => (
            <CardapioListSection
              key={section.id}
              section={section}
              lang={lang}
              query={query}
            />
          ))
        ) : (
          <p className="cardapio-list-viewer__empty">
            {lang === "pt"
              ? `Nenhum prato encontrado para «${query.trim()}».`
              : `No dishes found for “${query.trim()}”.`}
          </p>
        )}
      </div>

      <p className="cardapio-list-viewer__updated">
        {lang === "pt" ? "Atualizado em " : "Updated on "}
        {new Date(filteredCatalog.updatedAt).toLocaleDateString(
          lang === "pt" ? "pt-BR" : "en-US",
          { day: "2-digit", month: "long", year: "numeric" },
        )}
      </p>

      <p className="cardapio-list-viewer__disclaimer">
        {lang === "pt"
          ? "Valores sujeitos a alteração — consulte no café."
          : "Prices subject to change — please check at the café."}
      </p>

      <div className="cardapio-list-viewer__footer">
        <button
          type="button"
          onClick={onChangeLang}
          className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-hairline/60 px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          {lang === "pt" ? "Ver outro idioma" : "Switch language"}
        </button>
      </div>
    </div>
  );
}
