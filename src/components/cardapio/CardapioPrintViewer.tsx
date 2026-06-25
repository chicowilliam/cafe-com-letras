import { useEffect, useMemo, useState } from "react";
import { CardapioDiscreetSearch } from "@/components/cardapio/CardapioDiscreetSearch";
import { CardapioPrintSection } from "@/components/cardapio/CardapioPrintSection";
import { getCatalog } from "@/lib/cardapio-catalog";
import { countCatalogItems, searchCatalog } from "@/lib/cardapio-search";
import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioPrintViewerProps = {
  lang: CardapioLang;
  onChangeLang: () => void;
};

export function CardapioPrintViewer({
  lang,
  onChangeLang,
}: CardapioPrintViewerProps) {
  const [query, setQuery] = useState("");
  const [highlightItemId, setHighlightItemId] = useState<string | null>(null);

  const baseCatalog = useMemo(() => getCatalog(lang), [lang]);
  const filteredCatalog = useMemo(
    () => searchCatalog(baseCatalog, query),
    [baseCatalog, query],
  );

  const totalCount = countCatalogItems(baseCatalog);
  const resultCount = countCatalogItems(filteredCatalog);
  const visibleSections = filteredCatalog.sections.filter(
    (section) =>
      (section.items?.length ?? 0) > 0 ||
      (section.introBlocks?.length ?? 0) > 0 ||
      (section.infoBlocks?.length ?? 0) > 0,
  );

  useEffect(() => {
    if (!query.trim()) {
      setHighlightItemId(null);
      return;
    }

    const firstItem = filteredCatalog.sections.find((s) => s.items.length > 0)
      ?.items[0];
    if (!firstItem) return;

    setHighlightItemId(firstItem.id);
    const target = document.getElementById(`cardapio-item-${firstItem.id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [query, filteredCatalog]);

  return (
    <div className="cardapio-print-viewer">
      <CardapioDiscreetSearch
        lang={lang}
        query={query}
        onQueryChange={setQuery}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      <div className="cardapio-print-viewer__sheet">
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => (
            <CardapioPrintSection
              key={section.id}
              section={section}
              lang={lang}
              query={query}
              highlightItemId={highlightItemId}
            />
          ))
        ) : (
          <p className="cardapio-print-viewer__empty">
            {lang === "pt"
              ? `Nenhum prato encontrado para «${query.trim()}».`
              : `No dishes found for “${query.trim()}”.`}
          </p>
        )}
      </div>

      <p className="cardapio-print-viewer__meta">
        {lang === "pt" ? "Atualizado em " : "Updated on "}
        {new Date(filteredCatalog.updatedAt).toLocaleDateString(
          lang === "pt" ? "pt-BR" : "en-US",
          { day: "2-digit", month: "long", year: "numeric" },
        )}
      </p>

      <p className="cardapio-print-viewer__disclaimer">
        {lang === "pt"
          ? "Valores sujeitos a alteração — consulte no café."
          : "Prices subject to change — please check at the café."}
      </p>

      <div className="cardapio-print-viewer__footer">
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
