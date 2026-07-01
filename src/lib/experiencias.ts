import {
  BLUE_MOON_HERO_ALT,
  BLUE_MOON_HERO_IMAGE,
} from "@/lib/blue-moon-images";
import {
  CAFE_DA_TARDE_HERO_ALT,
  CAFE_DA_TARDE_HERO_IMAGE,
  getCafeDaTardeGalleryImages,
} from "@/lib/cafe-da-tarde-images";
import { DATE_PACKAGE_IMAGES } from "@/lib/date-package-images";

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
  /** Rótulo curto na timeline do hub (Tarde, Entardecer, Noite). */
  timeBandLabel: string;
  timeLabel: string;
  scheduleShort: string;
  scheduleLong: string;
  /** Uma linha sensorial no hub — detalhes ficam na página filha. */
  tagline: string;
  /** Destaques curtos no hub (2–3 itens). */
  highlights: readonly string[];
  /** Linha de conversão no hub — preço/horário sem repetir a subpágina. */
  conversionHint?: string;
  /** Rótulo do CTA de reserva nesta experiência. */
  reserveLabel?: string;
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
    timeBandLabel: "Tarde",
    timeLabel: "Sáb–Dom",
    scheduleShort: "Sábado e domingo · 15h às 17h",
    scheduleLong: "Sábados e domingos, das 15h às 17h",
    tagline: "Bolos do dia, quiches e pausa entre capítulos na livraria.",
    highlights: ["Bolos do dia", "Quiches e empadas", "Sábado e domingo"],
    conversionHint: "Sáb–dom · bolos a partir de R$ 14",
    reserveLabel: "Reservar mesa",
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
    timeBandLabel: "Entardecer",
    timeLabel: "Blue Moon",
    scheduleShort: "Quinta a domingo",
    scheduleLong: "Quintas, sextas, sábados e domingos",
    tagline: "Chopp gelado, fatia de laranja e petiscos na Savassi.",
    highlights: ["Blue Moon Belgian White", "Petiscos e chopps", "Quinta a domingo"],
    conversionHint: "Qui–dom · chopp a partir de R$ 32",
    reserveLabel: "Reservar mesa",
    weekdays: [0, 4, 5, 6],
    startsAt: "",
    description:
      "Petiscos e drinks em preço especial, com cardápio que muda a cada dia. " +
      "Blue Moon gelada, coquetelaria e o clima descontraído da Savassi ao entardecer.",
    href: "/happy-hour",
    image: BLUE_MOON_HERO_IMAGE,
    imageAlt: BLUE_MOON_HERO_ALT,
    theme: "happy-hour",
  },
  {
    id: "noite-dos-dates",
    title: "Noite dos Dates",
    eyebrow: "Experiência exclusiva",
    timeBand: "noite",
    timeBandLabel: "Noite",
    timeLabel: "Sob reserva",
    scheduleShort: "Sob reserva · jazz ao vivo",
    scheduleLong: "Experiência sob reserva, com jazz ao vivo e menu degustação para dois",
    tagline: "Menu degustação, jazz ao vivo e luz baixa para dois.",
    highlights: ["Menu degustação para dois", "Jazz ao vivo", "Sob reserva"],
    conversionHint: "Sob reserva · a partir de R$ 269 por casal",
    reserveLabel: "Garantir experiência",
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
};

export const HAPPY_HOUR_DAYS: HappyHourDay[] = [
  {
    key: "qui",
    label: "Quinta",
    weekday: 4,
    headline: "Blue Moon e petiscos da casa",
  },
  {
    key: "sex",
    label: "Sexta",
    weekday: 5,
    headline: "Entrada no fim de semana",
  },
  {
    key: "sab",
    label: "Sábado",
    weekday: 6,
    headline: "Savassi ao entardecer",
  },
  {
    key: "dom",
    label: "Domingo",
    weekday: 0,
    headline: "Domingo descontraído",
  },
];

export { HAPPY_HOUR_DRINKS } from "@/lib/happy-hour-menu";

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
