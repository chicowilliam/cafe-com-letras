import img01 from "@/assets/images/blue-moon/01.jpg";
import img02 from "@/assets/images/blue-moon/02.jpg";

export type HappyHourItem = {
  name: string;
  description: string;
  image?: string;
  price?: string;
  /** Selo curto, ex.: "Especial da casa", "Blue Moon". */
  badge?: string;
};

export type HappyHourCategoria = {
  id: string;
  label: string;
  sublabel?: string;
  items: HappyHourItem[];
};

export const HAPPY_HOUR_CATEGORIAS: HappyHourCategoria[] = [
  {
    id: "drinks",
    label: "Drinks & Chopps",
    sublabel: "Preços especiais toda quinta a partir das 17h",
    items: [
      {
        name: "Blue Moon Belgian White",
        description:
          "Cerveja de trigo belga com notas cítricas e um toque de coentro. " +
          "Servida com fatia de laranja, do jeito que a Blue Moon pede.",
        image: img01,
        badge: "Blue Moon",
      },
      {
        name: "Blue Moon Light Sky",
        description:
          "Versão leve e refrescante, com menos calorias e todo o sabor " +
          "cítrico característico da Blue Moon.",
        image: img02,
        badge: "Blue Moon",
      },
      {
        name: "Chope Pilsen",
        description: "Gelado, cremoso e na medida certa para começar a quinta. 300ml.",
        price: "R$ 15,00",
      },
      {
        name: "Aperol Spritz",
        description: "Aperol, espumante e água com gás — o clássico do entardecer.",
        price: "R$ 35,00",
      },
      {
        name: "Negroni",
        description: "Gin, Campari e vermute tinto, com casca de laranja.",
        price: "R$ 25,00",
      },
    ],
  },
  {
    id: "petiscos",
    label: "Para petiscar",
    sublabel: "Clássicos da casa para acompanhar",
    items: [
      {
        name: "Dupla de pão de queijo",
        description: "Tradição mineira, quentinho. 2 unidades.",
        price: "R$ 5,50",
      },
      {
        name: "Bruschettas clássicas",
        description: "Mussarela de búfala e tomate italiano. 6 unidades.",
        price: "R$ 42,00",
      },
      {
        name: "Carpaccio de carne clássico",
        description: "Molho de alcaparras, parmesão e rúcula, com baguete.",
        price: "R$ 48,00",
      },
      {
        name: "Fish and chips",
        description: "Peixe do dia empanado na farinha panko, chips e molho aioli.",
        price: "R$ 57,00",
      },
    ],
  },
];

export const HAPPY_HOUR_INFO = {
  diaSemana: "Toda quinta-feira",
  horario: "A partir das 17h",
  descricao:
    "Uma quinta diferente no coração da Savassi. Blue Moon gelada, " +
    "petiscos da casa e o ambiente único do Café com Letras.",
};
