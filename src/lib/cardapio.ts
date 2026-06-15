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

// TODO: substituir pelo cardápio real do Café com Letras (itens e preços).
export const CARDAPIO: CardapioCategoria[] = [
  {
    id: "entradas",
    label: "Entradas",
    items: [
      {
        name: "Bruschetta da casa",
        description: "Pão artesanal, tomate confitado e manjericão",
        price: "R$ 32",
      },
      {
        name: "Tábua de queijos",
        description: "Seleção de queijos mineiros e geleia da estação",
        price: "R$ 58",
      },
      {
        name: "Bolinho de feijoada",
        description: "Servido com geleia de pimenta",
        price: "R$ 38",
      },
    ],
  },
  {
    id: "pratos",
    label: "Pratos",
    items: [
      {
        name: "Risoto de cogumelos",
        description: "Arroz arbóreo, mix de cogumelos e parmesão",
        price: "R$ 64",
      },
      {
        name: "Filé ao café",
        description: "Filé-mignon com molho de café e purê rústico",
        price: "R$ 78",
      },
      {
        name: "Nhoque da nonna",
        description: "Nhoque artesanal ao sugo ou quatro queijos",
        price: "R$ 56",
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    items: [
      {
        name: "Espresso",
        description: "Grãos especiais torrados na casa",
        price: "R$ 9",
      },
      {
        name: "Café com Letras autoral",
        description: "Drink de assinatura da casa",
        price: "R$ 34",
      },
      {
        name: "Taça de vinho",
        description: "Tinto, branco ou rosé da seleção da semana",
        price: "R$ 29",
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      {
        name: "Petit gâteau",
        description: "Bolo quente de chocolate com sorvete de creme",
        price: "R$ 36",
      },
      {
        name: "Cheesecake de frutas vermelhas",
        price: "R$ 32",
      },
      {
        name: "Pudim de doce de leite",
        price: "R$ 26",
      },
    ],
  },
];
