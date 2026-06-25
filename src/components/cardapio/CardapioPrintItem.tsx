import { getItemPriceLabel } from "@/lib/cardapio-format";
import type { CardapioCatalogItem } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";
import { getItemBadges } from "@/lib/cardapio-premium";
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

  const badges = getItemBadges(item, lang);

  return (
    <li
      id={`cardapio-item-${item.id}`}
      className={`cardapio-print-item ${highlighted ? "is-highlighted" : ""}`}
    >
      <div className="cardapio-print-item__copy">
        <p className="cardapio-print-item__name-row">
          {badges.length > 0 ? (
            <span className="cardapio-print-item__badges" aria-hidden>
              {badges.map((badge) => (
                <span
                  key={badge.key}
                  className={`cardapio-print-item__badge cardapio-print-item__badge--${badge.key}`}
                  title={badge.title}
                >
                  {badge.label}
                </span>
              ))}
            </span>
          ) : null}
          <span className="cardapio-print-item__name">
            <HighlightText text={item.name} query={query} />
          </span>
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
