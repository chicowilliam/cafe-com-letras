import { useEffect, useMemo, useState } from "react";
import { CardapioDiscreetSearch } from "@/components/cardapio/CardapioDiscreetSearch";
import { CardapioPrintCover } from "@/components/cardapio/CardapioPrintCover";
import { CardapioPrintFooter } from "@/components/cardapio/CardapioPrintFooter";
import { CardapioPrintHighlights } from "@/components/cardapio/CardapioPrintHighlights";
import { CardapioPrintSection } from "@/components/cardapio/CardapioPrintSection";
import catalogMetaEn from "@/data/cardapio/catalog-meta.en.json";
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
  const hasQuery = query.trim().length > 0;

  const visibleSections = filteredCatalog.sections.filter(
    (section) =>
      (section.items?.length ?? 0) > 0 ||
      (section.introBlocks?.length ?? 0) > 0 ||
      (section.infoBlocks?.length ?? 0) > 0,
  );

  const infoSection = visibleSections.find((section) => section.infoLayout === "groups");
  const menuSections = visibleSections.filter((section) => section.id !== infoSection?.id);

  useEffect(() => {
    if (!hasQuery) {
      setHighlightItemId(null);
      return;
    }

    const firstItem = filteredCatalog.sections.find((s) => s.items.length > 0)
      ?.items[0];
    if (!firstItem) return;

    setHighlightItemId(firstItem.id);
    const target = document.getElementById(`cardapio-item-${firstItem.id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [query, filteredCatalog, hasQuery]);

  return (
    <div className="cardapio-print-viewer">
      <CardapioDiscreetSearch
        lang={lang}
        query={query}
        onQueryChange={setQuery}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      <div className="cardapio-print-viewer__folio">
        <div className="cardapio-print-viewer__sheet">
          {!hasQuery ? (
            <CardapioPrintCover
              lang={lang}
              updatedAt={filteredCatalog.updatedAt}
            />
          ) : null}

          {visibleSections.length > 0 ? (
            <>
              {infoSection ? (
                <CardapioPrintSection
                  key={infoSection.id}
                  section={infoSection}
                  lang={lang}
                  query={query}
                  highlightItemId={highlightItemId}
                />
              ) : null}

              {!hasQuery ? (
                <CardapioPrintHighlights
                  catalog={baseCatalog}
                  lang={lang}
                  query={query}
                  highlightItemId={highlightItemId}
                />
              ) : null}

              {menuSections.map((section) => (
                <CardapioPrintSection
                  key={section.id}
                  section={section}
                  lang={lang}
                  query={query}
                  highlightItemId={highlightItemId}
                />
              ))}
            </>
          ) : (
            <p className="cardapio-print-viewer__empty">
              {lang === "pt"
                ? `Não achamos «${query.trim()}» na carta — tente «vegano», «café» ou «bruschetta».`
                : `Nothing matched “${query.trim()}” — try “vegetarian”, “espresso” or “tiramisù”.`}
            </p>
          )}
        </div>
      </div>

      <p className="cardapio-print-viewer__meta">
        {lang === "pt" ? "Atualizado em " : "Updated "}
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

      <CardapioPrintFooter
        lang={lang}
        onChangeLang={onChangeLang}
        enNotice={lang === "en" ? catalogMetaEn.notice : undefined}
      />
    </div>
  );
}
