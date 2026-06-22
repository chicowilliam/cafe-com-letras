import {
  getCafeDaTardeImageBySlug,
  type CafeDaTardeImage,
} from "@/lib/cafe-da-tarde-images";

export type CafeDaTardeMenuGroup = "salgados" | "sucos";

export type CafeDaTardeMenuItem = {
  name: string;
  price: string;
  description: string;
  group: CafeDaTardeMenuGroup;
  imageSlug?: CafeDaTardeImage["slug"];
};

export type SpreadVariant = "grid-2x2" | "grid-asymmetric" | "duo";

export type CafeDaTardeSpreadConfig = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  itemNames: CafeDaTardeMenuItem["name"][];
  imageSlugs: CafeDaTardeImage["slug"][];
  variant: SpreadVariant;
};

export const CAFE_DA_TARDE_MENU_GROUP_LABELS: Record<CafeDaTardeMenuGroup, string> = {
  salgados: "Salgados",
  sucos: "Sucos",
};

export const CAFE_DA_TARDE_MENU: CafeDaTardeMenuItem[] = [
  {
    name: "Bolo do dia",
    price: "R$ 14",
    description: "Consulte a opção disponível no dia",
    group: "salgados",
    imageSlug: "bolo-do-dia-01",
  },
  {
    name: "Cestinha de pães de queijo",
    price: "R$ 24",
    description: "Dez unidades, quentinhos",
    group: "salgados",
    imageSlug: "cesta-pao-de-queijo",
  },
  {
    name: "Quiche Lorraine com saladinha",
    price: "R$ 35",
    description: "Com saladinha da casa",
    group: "salgados",
    imageSlug: "quiche",
  },
  {
    name: "Quiche de alho-poró com saladinha",
    price: "R$ 35",
    description: "Com saladinha da casa",
    group: "salgados",
    imageSlug: "foco-quiche",
  },
  {
    name: "Samosa de grão-de-bico",
    price: "R$ 25",
    description: "Duas unidades",
    group: "salgados",
  },
  {
    name: "Empada de palmito",
    price: "R$ 25",
    description: "Duas unidades, massa amanteigada",
    group: "salgados",
    imageSlug: "empada-palmito",
  },
  {
    name: "Suco do dia",
    price: "R$ 16,50",
    description: "Pera com laranja",
    group: "sucos",
  },
  {
    name: "Suco detox",
    price: "R$ 18,50",
    description: "Laranja, couve, maçã e gengibre",
    group: "sucos",
  },
];

/** Blocos temáticos — grid de fotos + itens do cardápio (estilo revista gastronômica). */
export const CAFE_DA_TARDE_SPREADS: CafeDaTardeSpreadConfig[] = [
  {
    id: "doces-paes",
    eyebrow: "Para começar",
    title: "Doces & pães",
    subtitle: "O bolo do dia e a cestinha quente para abrir a tarde",
    itemNames: ["Bolo do dia", "Cestinha de pães de queijo"],
    imageSlugs: ["bolo-do-dia-01", "cesta-pao-de-queijo", "todas-as-refeicoes-foco-pao"],
    variant: "grid-asymmetric",
  },
  {
    id: "salgados",
    eyebrow: "Da cozinha",
    title: "Salgados da casa",
    subtitle: "Massa amanteigada, quiches dourados e recheios generosos",
    itemNames: [
      "Quiche Lorraine com saladinha",
      "Quiche de alho-poró com saladinha",
      "Samosa de grão-de-bico",
      "Empada de palmito",
    ],
    imageSlugs: ["empada-palmito", "quiche", "foco-quiche"],
    variant: "grid-asymmetric",
  },
  {
    id: "sucos",
    eyebrow: "Para acompanhar",
    title: "Sucos do dia",
    subtitle: "Frescos, naturais — o contraponto leve aos salgados",
    itemNames: ["Suco do dia", "Suco detox"],
    imageSlugs: ["quiche-com-suco"],
    variant: "duo",
  },
];

function getMenuItemByName(name: CafeDaTardeMenuItem["name"]) {
  const item = CAFE_DA_TARDE_MENU.find((entry) => entry.name === name);
  if (!item) {
    throw new Error(`Cafe da tarde menu item not found: ${name}`);
  }
  return item;
}

export function getCafeDaTardeMenuByGroup(group: CafeDaTardeMenuGroup) {
  return CAFE_DA_TARDE_MENU.filter((item) => item.group === group);
}

export function getCafeDaTardeSpreads() {
  return CAFE_DA_TARDE_SPREADS.map((spread) => ({
    ...spread,
    items: spread.itemNames.map(getMenuItemByName),
    images: spread.imageSlugs.map((slug) => getCafeDaTardeImageBySlug(slug)),
  }));
}

export const CAFE_DA_TARDE_PRICE_FOOTNOTE =
  "Valores sujeitos a alteração — consulte no café";
