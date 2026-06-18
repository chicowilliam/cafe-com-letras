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

// Seleção curada conforme cardápio geral (Jun/2026). Nomes e preços oficiais do PDF.
export const CARDAPIO: CardapioCategoria[] = [
  {
    id: "compartilhar",
    label: "Para compartilhar",
    items: [
      { name: "Dupla de pão de queijo", description: "2 unidades", price: "R$ 5,50" },
      {
        name: "Bruschettas clássicas",
        description: "Mussarela de búfala e tomate italiano · 6 unidades",
        price: "R$ 42,00",
      },
      {
        name: "Carpaccio de carne clássico",
        description: "Molho de alcaparras, parmesão e rúcula · acompanha baguete",
        price: "R$ 48,00",
      },
      {
        name: "Fish and chips",
        description: "Peixe do dia empanado na farinha panko · chips e molho aioli",
        price: "R$ 57,00",
      },
    ],
  },
  {
    id: "saladas",
    label: "Saladas",
    items: [
      {
        name: "Salada de pêra e gorgonzola",
        description: "Mix de folhas, pêra caramelizada, gorgonzola e castanha de caju",
        price: "R$ 45,00",
      },
      {
        name: "Salada Caesar",
        description: "Alface americana, peito de frango grelhado e molho caesar do Café",
        price: "R$ 57,00",
      },
      {
        name: "Salada de salmão curado",
        description: "Maçã verde, folhas e caviar de mostarda",
        price: "R$ 66,00",
      },
    ],
  },
  {
    id: "pratos",
    label: "Pratos",
    items: [
      {
        name: "Ravioli de mussarela de búfala",
        description: "Molho de pomodoro e manjericão",
        price: "R$ 55,00",
      },
      {
        name: "Fettuccine trifolati",
        description: "Massa artesanal ao molho branco trufado de cogumelos",
        price: "R$ 59,00",
      },
      {
        name: "Filé com fritas do Café",
        description: "Filé mignon 200g sobre molho gorgonzola · batatas fritas",
        price: "R$ 75,00",
      },
      {
        name: "Filé à parmegiana",
        description: "Filé mignon com fettuccine fresco na manteiga e sálvia",
        price: "R$ 85,00",
      },
      {
        name: "Bobó de camarão",
        description: "Acompanha arroz de coco",
        price: "R$ 96,00",
      },
      {
        name: "Risoto de camarões",
        description: "Molho pomodoro com azeitonas pretas",
        price: "R$ 115,00",
      },
    ],
  },
  {
    id: "cafes",
    label: "Cafés & bebidas",
    items: [
      { name: "Café espresso gourmet do dia", price: "R$ 5,90" },
      { name: "Latte", description: "Tradicional ou vegano", price: "R$ 10,50" },
      { name: "Cappuccino", description: "Tradicional ou vegano", price: "R$ 10,90" },
      {
        name: "Café mocha",
        description: "Espresso, leite vaporizado e calda de chocolate",
        price: "R$ 15,00",
      },
      {
        name: "Suco do dia",
        description: "300ml · consulte opções com a equipe",
        price: "R$ 16,50",
      },
      { name: "Limonada suíça", description: "300ml", price: "R$ 10,90" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks & cervejas",
    items: [
      { name: "Chope Pilsen", description: "300ml", price: "R$ 15,00" },
      { name: "Caipirinha", price: "R$ 19,00" },
      { name: "Gin tônica", price: "R$ 31,00" },
      { name: "Negroni", price: "R$ 25,00" },
      { name: "Aperol Spritz", price: "R$ 35,00" },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      { name: "Pudim da vovó", description: "Leite condensado com leite de coco", price: "R$ 15,00" },
      {
        name: "Petit gâteau de chocolate",
        description: "Creme inglês e sorvete de creme",
        price: "R$ 37,00",
      },
      { name: "Torta de limão", description: "Com merengue", price: "R$ 20,00" },
      { name: "Tiramisù", description: "Mascarpone, café, Amaretto e biscoito champagne", price: "R$ 30,00" },
      {
        name: "Brownie mix",
        description: "Gotas branco, meio amargo e nozes · sorvete de creme",
        price: "R$ 35,00",
      },
    ],
  },
];
