import imgJazz from "@/assets/images/livraria/grs-0223.jpg";
import imgLiteratura from "@/assets/images/livraria/grs-0209.jpg";
import imgPiano from "@/assets/images/livraria/grs-0207.jpg";
import imgSarau from "@/assets/images/livraria/grs-0249.jpg";

export type EventCategory = "jazz" | "piano-bar" | "literatura" | "sarau" | "outro";

export type ProgramacaoEvento = {
  id: string;
  date: string;
  time: string;
  title: string;
  category: EventCategory;
  description?: string;
  image?: string;
  href?: string;
  featured?: boolean;
};

export type CategoryFilter = EventCategory | "all";

export const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; chipClass: string; tagClass: string }
> = {
  jazz: {
    label: "Jazz",
    chipClass:
      "border-accent/40 bg-accent/10 text-accent hover:border-accent/55 hover:bg-accent/15",
    tagClass: "border-accent/35 bg-accent/10 text-accent",
  },
  "piano-bar": {
    label: "Piano Bar",
    chipClass:
      "border-accent-2/35 bg-accent-2/10 text-accent-2 hover:border-accent-2/50 hover:bg-accent-2/15 hover:text-accent-2-hover",
    tagClass: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  },
  literatura: {
    label: "Literatura",
    chipClass:
      "border-stone-400/25 bg-stone-400/8 text-stone-200 hover:border-accent-2/35 hover:bg-accent-2/10 hover:text-accent-2",
    tagClass: "border-stone-400/25 bg-stone-400/8 text-stone-200",
  },
  sarau: {
    label: "Sarau",
    chipClass:
      "border-accent-2/35 bg-accent-2/10 text-accent-2 hover:border-accent-2/50 hover:bg-accent-2/15 hover:text-accent-2-hover",
    tagClass: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  },
  outro: {
    label: "Outro",
    chipClass:
      "border-white/15 bg-white/5 text-foreground-muted hover:border-white/25 hover:bg-white/8",
    tagClass: "border-white/15 bg-white/5 text-foreground-muted",
  },
};

export const FILTER_CHIPS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Tudo" },
  { value: "jazz", label: CATEGORY_CONFIG.jazz.label },
  { value: "piano-bar", label: CATEGORY_CONFIG["piano-bar"].label },
  { value: "literatura", label: CATEGORY_CONFIG.literatura.label },
  { value: "sarau", label: CATEGORY_CONFIG.sarau.label },
];

export const PROGRAMACAO_EVENTOS: ProgramacaoEvento[] = [
  {
    id: "jazz-com-todas-as-letras-jun",
    date: "2026-06-14",
    time: "21:00",
    title: "Jazz Com Todas as Letras",
    category: "jazz",
    description:
      "Noite especial de jazz ao vivo com quartet residente, repertório de standards e composições brasileiras sob luz baixa.",
    image: imgJazz,
    featured: true,
  },
  {
    id: "piano-bar-05-jun",
    date: "2026-06-05",
    time: "20:00",
    title: "Piano Bar — Quinta Clássica",
    category: "piano-bar",
    description: "Coquetelaria autoral e piano ao vivo toda quinta, do entardecer à meia-noite.",
    image: imgPiano,
  },
  {
    id: "jazz-quarteto-jun",
    date: "2026-06-07",
    time: "20:30",
    title: "Quarteto Savassi",
    category: "jazz",
    description: "Improvisos e arranjos contemporâneos no salão principal.",
  },
  {
    id: "piano-bar-12-jun",
    date: "2026-06-12",
    time: "20:00",
    title: "Piano Bar — Quinta Clássica",
    category: "piano-bar",
    description: "Repertório de bossa, MPB e clássicos internacionais ao piano.",
    image: imgPiano,
  },
  {
    id: "lancamento-cartografias-jun",
    date: "2026-06-18",
    time: "19:30",
    title: "Lançamento — Cartografias da Memória",
    category: "literatura",
    description: "Encontro com a autora, leitura de trechos e sessão de autógrafos na livraria.",
    image: imgLiteratura,
    href: "#sobre",
  },
  {
    id: "piano-bar-19-jun",
    date: "2026-06-19",
    time: "20:00",
    title: "Piano Bar — Quinta Clássica",
    category: "piano-bar",
    description: "Ambiente intimista, carta de drinks da casa e piano ao vivo.",
  },
  {
    id: "sarau-poesia-jun",
    date: "2026-06-21",
    time: "18:00",
    title: "Sarau da Poesia Mineira",
    category: "sarau",
    description: "Poetas convidados, microfone aberto e conversa com o público após as leituras.",
    image: imgSarau,
  },
  {
    id: "jazz-voz-baixo-jun",
    date: "2026-06-21",
    time: "21:00",
    title: "Voz & Baixo — Jazz Brasileiro",
    category: "jazz",
    description: "Duo explorando Jobim, Lo Borges e composições autorais.",
  },
  {
    id: "piano-bar-26-jun",
    date: "2026-06-26",
    time: "20:00",
    title: "Piano Bar — Quinta Clássica",
    category: "piano-bar",
    description: "Última quinta do mês: repertório especial com homenagem ao samba-jazz.",
    image: imgPiano,
  },
  {
    id: "mesa-literaria-jun",
    date: "2026-06-28",
    time: "17:00",
    title: "Mesa Literária — Belo Horizonte em Prosa",
    category: "literatura",
    description: "Autores locais debatem a cidade como personagem na literatura contemporânea.",
    image: imgLiteratura,
  },
  {
    id: "jazz-sunset-jul",
    date: "2026-07-05",
    time: "18:30",
    title: "Sunset Jazz Sessions",
    category: "jazz",
    description: "Jazz ao entardecer no pátio, com carta especial de aperitivos.",
    image: imgJazz,
  },
  {
    id: "sarau-choro-jul",
    date: "2026-07-12",
    time: "19:00",
    title: "Sarau Choro & Letras",
    category: "sarau",
    description: "Rodas de choro intercaladas com leituras de crônicas e poesia.",
    image: imgSarau,
  },
];

export function parseEventDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`);
}

export function formatMonthLabel(date: Date): string {
  const raw = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
  return raw.replace(/\sde\s/, " ").replace(/^\w/u, (char) => char.toUpperCase());
}

export function formatWeekday(isoDate: string): string {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
    parseEventDate(isoDate),
  );
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

export function formatDayNumber(isoDate: string): string {
  return String(parseEventDate(isoDate).getDate()).padStart(2, "0");
}

export function formatEventDateTime(isoDate: string, time: string): string {
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(parseEventDate(isoDate));
  return `${dateLabel} · ${time}`;
}

export function toMonthKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function shiftMonth(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function isEventInMonth(isoDate: string, viewMonth: Date): boolean {
  const eventDate = parseEventDate(isoDate);
  return (
    eventDate.getFullYear() === viewMonth.getFullYear() &&
    eventDate.getMonth() === viewMonth.getMonth()
  );
}

export function filterProgramacao(
  events: ProgramacaoEvento[],
  viewMonth: Date,
  category: CategoryFilter,
): ProgramacaoEvento[] {
  return events
    .filter((event) => isEventInMonth(event.date, viewMonth))
    .filter((event) => category === "all" || event.category === category)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });
}

export function groupEventsByDay(
  events: ProgramacaoEvento[],
): { date: string; events: ProgramacaoEvento[] }[] {
  const map = new Map<string, ProgramacaoEvento[]>();

  for (const event of events) {
    const bucket = map.get(event.date);
    if (bucket) bucket.push(event);
    else map.set(event.date, [event]);
  }

  return Array.from(map.entries()).map(([date, dayEvents]) => ({
    date,
    events: dayEvents,
  }));
}
