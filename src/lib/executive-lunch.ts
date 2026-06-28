/** Segunda (1) a sexta (5). */
export function isExecutiveLunchWeekday(date = new Date()) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

/** Janela típica do almoço executivo. */
export function isExecutiveLunchHours(date = new Date()) {
  const hour = date.getHours();
  return hour >= 11 && hour < 15;
}

export const EXECUTIVE_LUNCH_ANCHOR = "almoco-executivo";

export type ExecutiveLunchWeekday = 1 | 2 | 3 | 4 | 5;

export type ExecutiveLunchDaySlot = {
  weekday: ExecutiveLunchWeekday;
  label: string;
  shortLabel: string;
  /** Tema ou destaque opcional do dia — atualizar quando a cozinha definir. */
  highlight?: string;
};

/** Slots da semana — estilo agenda de eventos, sem pratos fixos no código. */
export const EXECUTIVE_LUNCH_WEEK: ExecutiveLunchDaySlot[] = [
  { weekday: 1, label: "Segunda-feira", shortLabel: "Seg" },
  { weekday: 2, label: "Terça-feira", shortLabel: "Ter" },
  { weekday: 3, label: "Quarta-feira", shortLabel: "Qua" },
  { weekday: 4, label: "Quinta-feira", shortLabel: "Qui" },
  { weekday: 5, label: "Sexta-feira", shortLabel: "Sex" },
];

export const EXECUTIVE_LUNCH_COPY = {
  eyebrow: "Na casa esta semana",
  title: "Almoço executivo",
  schedule: "Segunda a sexta · 11h às 14h",
  description:
    "Não há cardápio fixo: a cozinha monta o menu do dia conforme a estação e o que chega fresco. Cada dia é uma edição nova — como um evento gastronômico de terça a sexta.",
  todayFallback: "Consulte o menu do dia na casa, no cardápio ou pelo WhatsApp.",
  ctaCardapio: "Ver cardápio completo",
  ctaWhatsApp: "Perguntar o menu de hoje",
} as const;

export function getExecutiveLunchToday(date = new Date()) {
  const day = date.getDay() as ExecutiveLunchWeekday | 0 | 6;
  if (day < 1 || day > 5) return null;
  return EXECUTIVE_LUNCH_WEEK.find((slot) => slot.weekday === day) ?? null;
}

export function getExecutiveLunchWhatsAppMessage(date = new Date()) {
  const today = getExecutiveLunchToday(date);
  const dayLabel = today?.label ?? "hoje";
  return `Olá! Gostaria de saber o menu do almoço executivo de ${dayLabel}.`;
}
