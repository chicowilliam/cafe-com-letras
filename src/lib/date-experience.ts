import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";

export type DatePackageId = "movimento" | "casa" | "vegan";

/**
 * Pacotes oficiais da Noite dos Dates — nomes e taxas alinhados ao Get In.
 * Preços: taxa da reserva por pessoa.
 */
export const DATE_PACKAGES = [
  {
    id: "movimento" as const,
    title: "Casal Movimento",
    badge: "Leve",
    subtitle: "Date leve, fresco e equilibrado",
    description:
      "Tempos mais leves e ritmo do jazz — para quem quer a noite a dois sem pesar a mesa.",
    price: "R$ 145",
    priceNote: "por pessoa",
    image: DATE_PACKAGE_IMAGES.movimento,
    imageAlt:
      "Prato do Casal Movimento — date leve da Noite dos Dates no Café com Letras",
    /** Crop distinto enquanto Movimento e Casa compartilham a mesma arte */
    imagePosition: "center 35%",
    featured: false,
    highlights: ["Quatro tempos", "Tom fresco", "Para dois"],
  },
  {
    id: "casa" as const,
    title: "Casal da Casa",
    badge: "Da casa",
    subtitle: "Uma noite especial no Café",
    description:
      "A leitura clássica da Noite dos Dates: degustação, harmonização e a mesa da Savassi.",
    price: "R$ 155",
    priceNote: "por pessoa",
    image: DATE_PACKAGE_IMAGES.casa,
    imageAlt:
      "Prato do Casal da Casa — noite especial da Noite dos Dates no Café com Letras",
    imagePosition: "center 55%",
    featured: true,
    highlights: ["Degustação", "Harmonização", "Sobremesa a dois"],
  },
  {
    id: "vegan" as const,
    title: "Casal Vegano",
    badge: "Vegetal",
    subtitle: "Uma noite vegana no Café",
    description:
      "Menu 100% vegetal com ingredientes sazonais — o mesmo ritual da noite, sem origem animal.",
    price: "R$ 115",
    priceNote: "por pessoa",
    image: DATE_PACKAGE_IMAGES.vegan,
    imageAlt:
      "Prato do Casal Vegano — menu plant-based da Noite dos Dates no Café com Letras",
    imagePosition: "center 45%",
    featured: false,
    highlights: ["100% vegetal", "Quatro tempos", "Sobremesa artesanal"],
  },
] as const;

export function getPackageById(id: DatePackageId) {
  return DATE_PACKAGES.find((pkg) => pkg.id === id)!;
}

/** Pacote âncora para CTAs de hero / home. */
export const DATE_PACKAGE_ANCHOR_ID: DatePackageId = "casa";
