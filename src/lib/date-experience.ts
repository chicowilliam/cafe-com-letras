export type DatePackageId = "complete" | "vegan";

export const DATE_PACKAGES = [
  {
    id: "complete" as const,
    title: "Experiência Completa",
    badge: "Não Vegana",
    description:
      "Menu degustação em quatro tempos, harmonização com vinhos selecionados, sobremesa compartilhada e brinde de boas-vindas — pensado para uma noite inesquecível a dois.",
    price: "R$ 289",
    highlights: ["Entrada & prato principal", "Harmonização com vinhos", "Sobremesa para compartilhar"],
  },
  {
    id: "vegan" as const,
    title: "Experiência Vegana",
    badge: "100% Plant-based",
    description:
      "A mesma poesia da noite, em uma composição totalmente vegetal: ingredientes sazonais, técnicas refinadas e sabores que celebram o encontro sem comprometer a experiência.",
    price: "R$ 269",
    highlights: ["Menu degustação vegano", "Harmonização sem álcool ou vinho", "Sobremesa artesanal"],
  },
] as const;

export const PAYMENT_METHODS = [
  { id: "pix", label: "PIX" },
  { id: "credit", label: "Cartão de Crédito" },
  { id: "apple", label: "Apple Pay" },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export function getPackageById(id: DatePackageId) {
  return DATE_PACKAGES.find((pkg) => pkg.id === id)!;
}
