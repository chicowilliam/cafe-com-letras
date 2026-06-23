import {
  getBlueMoonImageBySlug,
  type BlueMoonImage,
} from "@/lib/blue-moon-images";

export type SpreadVariant = "grid-2x2" | "grid-asymmetric" | "duo";

export type HappyHourMenuItem = {
  name: string;
  price?: string;
  description: string;
  badge?: string;
};

export type HappyHourSpreadConfig = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  itemNames: string[];
  imageSlugs: BlueMoonImage["slug"][];
  variant: SpreadVariant;
  tone?: "default" | "beer";
};

export const HAPPY_HOUR_PETISCOS: HappyHourMenuItem[] = [
  {
    name: "Pastel aberto de camarão",
    price: "R$ 32",
    description: "Quatro unidades",
  },
  {
    name: "Pastel aberto de queijo provolone com salaminho",
    price: "R$ 32",
    description: "Quatro unidades",
  },
  {
    name: "Batatas rústicas",
    price: "R$ 38",
    description: "Com lâminas de bacon e fonduta de requeijão de raspa",
  },
  {
    name: "Croquetes de carne",
    price: "R$ 42",
    description: "Com fonduta de requeijão de raspa — seis unidades",
  },
  {
    name: "Choripan",
    price: "R$ 37",
    description: "Acompanha baguete",
  },
];

export const HAPPY_HOUR_DRINKS: HappyHourMenuItem[] = [
  {
    name: "Blue Moon Belgian White",
    description:
      "Cerveja de trigo belga com notas cítricas — servida com fatia de laranja, do jeito que a Blue Moon pede",
    badge: "Blue Moon",
  },
  {
    name: "Blue Moon Light Sky",
    description: "Versão leve e refrescante, com todo o sinal cítrico característico",
    badge: "Blue Moon",
  },
  {
    name: "Chope Pilsen",
    price: "R$ 15",
    description: "Gelado, cremoso e na medida certa para começar — 300ml",
  },
  {
    name: "Aperol Spritz",
    price: "R$ 35",
    description: "Aperol, espumante e água com gás — o clássico do entardecer",
  },
  {
    name: "Negroni",
    price: "R$ 25",
    description: "Gin, Campari e vermute tinto, com casca de laranja",
  },
];

export const HAPPY_HOUR_SPREADS: HappyHourSpreadConfig[] = [
  {
    id: "abrir",
    eyebrow: "Para abrir",
    title: "Pastéis da casa",
    subtitle: "Massa fina, recheio generoso — o primeiro brinde do entardecer",
    itemNames: [
      "Pastel aberto de camarão",
      "Pastel aberto de queijo provolone com salaminho",
    ],
    imageSlugs: ["mesa-entardecer", "laranja-no-copo", "petiscos-mesa", "chopp-espuma"],
    variant: "grid-2x2",
  },
  {
    id: "na-mesa",
    eyebrow: "Na mesa",
    title: "Para compartilhar",
    subtitle: "Porções fartas para dividir entre amigos na Savassi",
    itemNames: ["Batatas rústicas", "Croquetes de carne", "Choripan"],
    imageSlugs: ["petiscos-mesa", "mesa-entardecer", "chopp-espuma"],
    variant: "grid-asymmetric",
    tone: "default",
  },
  {
    id: "drinks",
    eyebrow: "Blue Moon",
    title: "Chopp & drinks",
    subtitle: "Belgian White com fatia de laranja, chopps gelados e coquetelaria do entardecer",
    itemNames: [
      "Blue Moon Belgian White",
      "Blue Moon Light Sky",
      "Chope Pilsen",
      "Aperol Spritz",
      "Negroni",
    ],
    imageSlugs: ["laranja-no-copo"],
    variant: "duo",
    tone: "beer",
  },
];

const MENU_BY_NAME = new Map<string, HappyHourMenuItem>([
  ...HAPPY_HOUR_PETISCOS.map((item) => [item.name, item] as const),
  ...HAPPY_HOUR_DRINKS.map((item) => [item.name, item] as const),
]);

function getMenuItemByName(name: string) {
  const item = MENU_BY_NAME.get(name);
  if (!item) {
    throw new Error(`Happy hour menu item not found: ${name}`);
  }
  return item;
}

export function getHappyHourSpreads() {
  return HAPPY_HOUR_SPREADS.map((spread) => ({
    ...spread,
    items: spread.itemNames.map(getMenuItemByName),
    images: spread.imageSlugs.map((slug) => getBlueMoonImageBySlug(slug)),
  }));
}

export const HAPPY_HOUR_PRICE_FOOTNOTE =
  "Petiscos podem variar — consulte no dia. Valores sujeitos a alteração.";
