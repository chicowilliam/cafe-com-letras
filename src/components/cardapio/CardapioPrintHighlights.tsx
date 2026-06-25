import { CardapioPrintItem } from "@/components/cardapio/CardapioPrintItem";
import highlightsEn from "@/data/cardapio/highlights.en.json";
import highlightsPt from "@/data/cardapio/highlights.pt.json";
import type { CardapioCatalog } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioPrintHighlightsProps = {
  catalog: CardapioCatalog;
  lang: CardapioLang;
  query: string;
  highlightItemId?: string | null;
};

const HIGHLIGHTS = {
  pt: highlightsPt,
  en: highlightsEn,
} as const;

export function CardapioPrintHighlights({
  catalog,
  lang,
  query,
  highlightItemId,
}: CardapioPrintHighlightsProps) {
  if (query.trim()) return null;

  const copy = HIGHLIGHTS[lang];
  const entries = copy.items
    .map((entry) => {
      for (const section of catalog.sections) {
        const item = section.items.find((candidate) => candidate.id === entry.itemId);
        if (item) return { ...entry, item, sectionId: section.id };
      }
      return null;
    })
    .filter(Boolean);

  if (!entries.length) return null;

  return (
    <section className="cardapio-print-highlights" aria-label={copy.title}>
      <header className="cardapio-print-highlights__head">
        <p className="cardapio-print-highlights__eyebrow">{copy.title}</p>
        <h2 className="cardapio-print-highlights__title">{copy.subtitle}</h2>
      </header>
      <ul className="cardapio-print-highlights__list">
        {entries.map((entry) =>
          entry ? (
            <li key={entry.itemId} className="cardapio-print-highlights__card">
              <CardapioPrintItem
                item={{ ...entry.item, tags: [...(entry.item.tags ?? []), "destaque"] }}
                lang={lang}
                query={query}
                highlighted={highlightItemId === entry.itemId}
              />
              <p className="cardapio-print-highlights__note">{entry.note}</p>
            </li>
          ) : null,
        )}
      </ul>
    </section>
  );
}
