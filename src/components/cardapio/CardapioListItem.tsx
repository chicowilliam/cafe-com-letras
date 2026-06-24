import { getItemPriceLabel } from "@/lib/cardapio-format";
import type { CardapioCatalogItem } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";
import { HighlightText } from "@/components/cardapio/HighlightText";

type CardapioListItemProps = {
  item: CardapioCatalogItem;
  lang: CardapioLang;
  query: string;
};

export function CardapioListItem({ item, lang, query }: CardapioListItemProps) {
  if (item.available === false) return null;

  return (
    <li className="cardapio-list-item">
      <div className="cardapio-list-item__copy">
        <p className="cardapio-list-item__name font-display">
          <HighlightText text={item.name} query={query} />
        </p>
        {item.description ? (
          <p className="cardapio-list-item__description">
            <HighlightText text={item.description} query={query} />
          </p>
        ) : null}
      </div>
      <span aria-hidden className="cardapio-list-item__leader" />
      <span className="cardapio-list-item__price font-display">
        {getItemPriceLabel(item, lang)}
      </span>
    </li>
  );
}
