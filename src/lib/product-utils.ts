import type { Product } from "@/types/product";

export function sortByConversionScore(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.score_conversao - a.score_conversao);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
