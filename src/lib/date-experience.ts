import { DATE_PACKAGE_IMAGES } from "@/lib/gallery-images";

export type DatePackageId = "complete" | "vegan";

export const DATE_PACKAGES = [
  {
    id: "complete" as const,
    title: "Experiência Completa",
    badge: "Não Vegana",
    subtitle: "Para 2 pessoas · 4 tempos",
    description:
      "Menu degustação em quatro tempos, harmonização com vinhos, sobremesa compartilhada e brinde de boas-vindas.",
    price: "R$ 289",
    priceNote: "por casal",
    image: DATE_PACKAGE_IMAGES.complete,
    imageAlt: "Prato da experiência completa — menu degustação não vegano da Noite dos Dates",
    highlights: [
      "Entrada & prato principal",
      "Harmonização com vinhos",
      "Sobremesa para compartilhar",
    ],
  },
  {
    id: "vegan" as const,
    title: "Experiência Vegana",
    badge: "100% Plant-based",
    subtitle: "Para 2 pessoas · 4 tempos",
    description:
      "Composição totalmente vegetal com ingredientes sazonais, técnicas refinadas e sabores que celebram o encontro.",
    price: "R$ 269",
    priceNote: "por casal",
    image: DATE_PACKAGE_IMAGES.vegan,
    imageAlt: "Prato da experiência vegana — menu plant-based da Noite dos Dates",
    highlights: [
      "Menu degustação vegano",
      "Harmonização sem álcool ou vinho",
      "Sobremesa artesanal",
    ],
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
