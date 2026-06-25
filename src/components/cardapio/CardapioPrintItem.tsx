import { getItemPriceLabel } from "@/lib/cardapio-format";
import type { CardapioCatalogItem } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";
import { HighlightText } from "@/components/cardapio/HighlightText";

type CardapioPrintItemProps = {
  item: CardapioCatalogItem;
  lang: CardapioLang;
  query: string;
  highlighted?: boolean;
};

export function CardapioPrintItem({
  item,
  lang,
  query,
  highlighted = false,
}: CardapioPrintItemProps) {
  if (item.available === false) return null;

  return (
    <li
      id={`cardapio-item-${item.id}`}
      className={`cardapio-print-item ${highlighted ? "is-highlighted" : ""}`}
    >
      <div className="cardapio-print-item__copy">
        <p className="cardapio-print-item__name">
          <HighlightText text={item.name} query={query} />
        </p>
        {item.description ? (
          <p className="cardapio-print-item__description">
            <HighlightText text={item.description} query={query} />
          </p>
        ) : null}
      </div>
      <span aria-hidden className="cardapio-print-item__leader" />
      <span className="cardapio-print-item__price">
        {getItemPriceLabel(item, lang)}
      </span>
    </li>
  );
}
