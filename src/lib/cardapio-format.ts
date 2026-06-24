import type { CardapioLang } from "@/lib/cardapio-images";

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function formatPrice(value: number, lang: CardapioLang) {
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getItemPriceLabel(
  item: { price: number; priceLabel?: string },
  lang: CardapioLang,
) {
  return item.priceLabel ?? formatPrice(item.price, lang);
}
