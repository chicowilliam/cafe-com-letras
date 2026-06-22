import imgHappyHour from "@/assets/images/blue-moon/01.jpg";
import {
  CAFE_DA_TARDE_HERO_ALT,
  CAFE_DA_TARDE_HERO_IMAGE,
  getCafeDaTardeGalleryImages,
} from "@/lib/cafe-da-tarde-images";
import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";
import { BLUE_MOON_IMAGES } from "@/lib/blue-moon-images";

/** 0 = domingo … 6 = sábado */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ExperienciaId = "cafe-da-tarde" | "happy-hour" | "noite-dos-dates";

export type ExperienciaMenuItem = {
  name: string;
  description: string;
  price?: string;
  image?: string;
  badge?: string;
};

export type ExperienciaCatalogEntry = {
  id: ExperienciaId;
  title: string;
  eyebrow: string;
  /** Faixa do dia — ordena o hub cronologicamente. */
  timeBand: "tarde" | "entardecer" | "noite";
  timeLabel: string;
  scheduleShort: string;
  scheduleLong: string;
  weekdays: readonly Weekday[];
  startsAt: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  theme: "cafe-da-tarde" | "happy-hour" | "noite-dos-dates";
};

/** Catálogo único — toda página e a programação leem daqui. */
export const EXPERIENCIAS_CATALOG: ExperienciaCatalogEntry[] = [
  {
    id: "cafe-da-tarde",
    title: "Café da Tarde",
    eyebrow: "Pausa elegante",
    timeBand: "tarde",
    timeLabel: "15h",
    scheduleShort: "Sábado e domingo · 15h às 17h",
    scheduleLong: "Sábados e domingos, das 15h às 17h",
    weekdays: [0, 6],
    startsAt: "15:00",
    description:
      "Uma pausa sofisticada entre o almoço e a noite: bolos do dia, quiches, empadas, " +
      "pão de queijo e sucos frescos em um ambiente de livraria e conversa tranquila.",
    href: "/cafe-da-tarde",
    image: CAFE_DA_TARDE_HERO_IMAGE,
    imageAlt: CAFE_DA_TARDE_HERO_ALT,
    theme: "cafe-da-tarde",
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    eyebrow: "Quinta a domingo",
    timeBand: "entardecer",
    timeLabel: "17h",
    scheduleShort: "Quinta a domingo · a partir das 17h",
    scheduleLong: "Quintas, sextas, sábados e domingos, a partir das 17h",
    weekdays: [0, 4, 5, 6],
    startsAt: "17:00",
    description:
      "Petiscos e drinks em preço especial, com cardápio que muda a cada dia. " +
      "Blue Moon gelada, coquetelaria e o clima descontraído da Savassi ao entardecer.",
    href: "/happy-hour",
    image: imgHappyHour,
    imageAlt: "Happy Hour com Blue Moon no Café com Letras",
    theme: "happy-hour",
  },
  {
    id: "noite-dos-dates",
    title: "Noite dos Dates",
    eyebrow: "Experiência exclusiva",
    timeBand: "noite",
    timeLabel: "Noite",
    scheduleShort: "Sob reserva · jazz ao vivo",
    scheduleLong: "Experiência sob reserva, com jazz ao vivo e menu degustação para dois",
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    startsAt: "19:00",
    description:
      "Romance autêntico sob luzes baixas: menu degustação em quatro tempos, " +
      "alta coquetelaria e jazz ao vivo — o refúgio perfeito para uma noite memorável a dois.",
    href: "/noite-dos-dates",
    image: DATE_PACKAGE_IMAGES.complete,
    imageAlt: "Experiência Noite dos Dates no Café com Letras",
    theme: "noite-dos-dates",
  },
] as const;

export const EXPERIENCIAS_BY_ID = Object.fromEntries(
  EXPERIENCIAS_CATALOG.map((entry) => [entry.id, entry]),
) as Record<ExperienciaId, ExperienciaCatalogEntry>;

export type HappyHourDayKey = "qui" | "sex" | "sab" | "dom";

export type HappyHourDay = {
  key: HappyHourDayKey;
  label: string;
  weekday: Weekday;
  headline: string;
  imageIndexes: number[];
  petiscos: ExperienciaMenuItem[];
};

export const HAPPY_HOUR_DAYS: HappyHourDay[] = [
  {
    key: "qui",
    label: "Quinta",
    weekday: 4,
    headline: "Blue Moon e petiscos da casa",
    imageIndexes: [0, 1, 2, 3],
    petiscos: [
      {
        name: "Dupla de pão de queijo",
        description: "Tradição mineira, quentinho e na medida para abrir a quinta. 2 unidades.",
        price: "R$ 5,50",
      },
      {
        name: "Bruschettas clássicas",
        description:
          "Pão italiano tostado com mussarela de búfala e tomate italiano. 6 unidades.",
        price: "R$ 42,00",
      },
      {
        name: "Carpaccio de carne clássico",
        description:
          "Finas fatias com molho de alcaparras, parmesão e rúcula, acompanhadas de baguete.",
        price: "R$ 48,00",
      },
      {
        name: "Fish and chips",
        description:
          "Peixe do dia empanado na farinha panko, com chips crocantes e molho aioli da casa.",
        price: "R$ 57,00",
      },
    ],
  },
  {
    key: "sex",
    label: "Sexta",
    weekday: 5,
    headline: "Entrada no fim de semana",
    imageIndexes: [1, 2, 3, 0],
    petiscos: [
      {
        name: "Tábua de frios",
        description: "Seleção de embutidos artesanais, queijos e geleias da casa.",
        price: "R$ 62,00",
      },
      {
        name: "Croquetes de bacalhau",
        description: "Crocantes por fora, cremosos por dentro. 6 unidades.",
        price: "R$ 38,00",
      },
      {
        name: "Mini burgers da casa",
        description: "Blend especial, queijo e molho secreto. 3 unidades.",
        price: "R$ 45,00",
      },
    ],
  },
  {
    key: "sab",
    label: "Sábado",
    weekday: 6,
    headline: "Savassi ao entardecer",
    imageIndexes: [2, 3, 0, 1],
    petiscos: [
      {
        name: "Bolinho de feijoada",
        description: "Receita da casa, servido com molho de pimenta. 6 unidades.",
        price: "R$ 32,00",
      },
      {
        name: "Nachos com guacamole",
        description: "Tortillas crocantes, guacamole fresco e sour cream.",
        price: "R$ 36,00",
      },
      {
        name: "Iscas de frango crocantes",
        description: "Empanadas na farinha panko com molho barbecue. Porção generosa.",
        price: "R$ 34,00",
      },
    ],
  },
  {
    key: "dom",
    label: "Domingo",
    weekday: 0,
    headline: "Domingo descontraído",
    imageIndexes: [3, 0, 1, 2],
    petiscos: [
      {
        name: "Porção de batata rústica",
        description: "Com alecrim, parmesão e aioli da casa.",
        price: "R$ 28,00",
      },
      {
        name: "Coxinha de galinha caipira",
        description: "Massa leve e recheio cremoso. 4 unidades.",
        price: "R$ 24,00",
      },
      {
        name: "Salada Caesar para compartilhar",
        description: "Alface romana, croutons, parmesão e molho clássico.",
        price: "R$ 42,00",
      },
    ],
  },
];

export const HAPPY_HOUR_DRINKS: ExperienciaMenuItem[] = [
  {
    name: "Blue Moon Belgian White",
    description:
      "Cerveja de trigo belga com notas cítricas e um toque de coentro. " +
      "Servida com fatia de laranja, do jeito que a Blue Moon pede.",
    badge: "Blue Moon",
  },
  {
    name: "Blue Moon Light Sky",
    description:
      "Versão leve e refrescante, com menos calorias e todo o sabor cítrico característico.",
    badge: "Blue Moon",
  },
  {
    name: "Chope Pilsen",
    description: "Gelado, cremoso e na medida certa para começar. 300ml.",
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
];

export function getCafeDaTardeImages() {
  return getCafeDaTardeGalleryImages();
}

const WEEKDAY_LABELS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export function getWeekdayLabel(weekday: Weekday) {
  return WEEKDAY_LABELS[weekday];
}

export function getHappyHourDayByWeekday(weekday: Weekday) {
  return HAPPY_HOUR_DAYS.find((day) => day.weekday === weekday);
}

export function getHappyHourDayImages(day: HappyHourDay) {
  return day.imageIndexes
    .map((index) => BLUE_MOON_IMAGES[index])
    .filter(Boolean);
}

/** Experiências recorrentes ativas em um dia da semana. */
export function getExperienciasForWeekday(weekday: Weekday) {
  return EXPERIENCIAS_CATALOG.filter((entry) => entry.weekdays.includes(weekday)).sort(
    (a, b) => {
      const order = { tarde: 0, entardecer: 1, noite: 2 } as const;
      return order[a.timeBand] - order[b.timeBand];
    },
  );
}

/** Destaque contextual para a programação / banners. */
export function getExperienciasAtivasHoje(date = new Date()) {
  const weekday = date.getDay() as Weekday;
  return getExperienciasForWeekday(weekday);
}

export function getExperienciaById(id: ExperienciaId) {
  return EXPERIENCIAS_BY_ID[id];
}
