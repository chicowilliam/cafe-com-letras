import { getHomeCardapioBlocks } from "@/lib/cardapio-home-config";

/** @deprecated Import from cardapio-catalog / cardapio-home-config. */
export type CardapioItem = {
  name: string;
  description?: string;
  price: string;
};

/** @deprecated Import from cardapio-catalog / cardapio-home-config. */
export type CardapioCategoria = {
  id: string;
  label: string;
  items: CardapioItem[];
};

/** @deprecated Use getHomeCardapioBlocks("pt"). */
export const CARDAPIO: CardapioCategoria[] = getHomeCardapioBlocks("pt").map(
  (block) => ({
    id: block.id,
    label: block.label,
    items: block.items,
  }),
);
