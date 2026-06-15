export type CardapioItem = {
  name: string;
  description?: string;
  price: string;
};

export type CardapioCategoria = {
  id: string;
  label: string;
  items: CardapioItem[];
};

// Seleção do cardápio real do Café com Letras (destaques por categoria).
export const CARDAPIO: CardapioCategoria[] = [
  {
    id: "compartilhar",
    label: "Para compartilhar",
    items: [
      { name: "Pães de queijo", price: "R$ 5,50" },
      { name: "Bruschettas clássicas", price: "R$ 42,00" },
      { name: "Carpaccio de carne", price: "R$ 48,00" },
      { name: "Fish and chips", price: "R$ 57,00" },
    ],
  },
  {
    id: "saladas",
    label: "Saladas",
    items: [
      { name: "Pêra e gorgonzola", price: "R$ 45,00" },
      { name: "Caesar", price: "R$ 57,00" },
      { name: "Salmão curado", price: "R$ 66,00" },
    ],
  },
  {
    id: "pratos",
    label: "Pratos",
    items: [
      { name: "Ravióli de mussarela de búfala", price: "R$ 55,00" },
      { name: "Fettuccine trifolati", price: "R$ 59,00" },
      { name: "Filé com fritas do Café", price: "R$ 75,00" },
      { name: "Filé à parmegiana", price: "R$ 85,00" },
      { name: "Bobó de camarão", price: "R$ 96,00" },
      { name: "Risoto de camarões", price: "R$ 115,00" },
    ],
  },
  {
    id: "cafes",
    label: "Cafés & bebidas",
    items: [
      { name: "Espresso", price: "R$ 5,90" },
      { name: "Latte", price: "R$ 10,50" },
      { name: "Cappuccino", price: "R$ 10,90" },
      { name: "Café mocha", price: "R$ 15,00" },
      { name: "Suco do dia", price: "R$ 16,50" },
      { name: "Limonada suíça", price: "R$ 22,00" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks & cervejas",
    items: [
      { name: "Chope Pilsen", price: "R$ 15,00" },
      { name: "Caipirinha", price: "R$ 19,00" },
      { name: "Gin tônica", price: "R$ 25,00" },
      { name: "Negroni", price: "R$ 25,00" },
      { name: "Aperol Spritz", price: "R$ 35,00" },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      { name: "Pudim da vovó", price: "R$ 15,00" },
      { name: "Petit gâteau de chocolate", price: "R$ 17,00" },
      { name: "Torta de limão", price: "R$ 20,00" },
      { name: "Tiramisù", price: "R$ 30,00" },
      { name: "Brownie mix", price: "R$ 35,00" },
    ],
  },
];
