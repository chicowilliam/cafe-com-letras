import type { CafeDaTardeImage } from "@/lib/cafe-da-tarde-images";

export type CafeDaTardeMenuGroup = "salgados" | "sucos";

export type CafeDaTardeMenuItem = {
  name: string;
  price: string;
  description: string;
  group: CafeDaTardeMenuGroup;
  imageSlug?: CafeDaTardeImage["slug"];
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

export function getCafeDaTardeMenuByGroup(group: CafeDaTardeMenuGroup) {
  return CAFE_DA_TARDE_MENU.filter((item) => item.group === group);
}
