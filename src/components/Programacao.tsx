import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLink } from "@/components/AppLink";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useReservation } from "@/hooks/useReservation";
import { getExperienciasAtivasHoje } from "@/lib/experiencias";
import {
  CATEGORY_CONFIG,
  FILTER_CHIPS,
  PROGRAMACAO_EVENTOS,
  filterProgramacao,
  formatDayNumber,
  formatEventDateTime,
  formatMonthLabel,
  formatWeekday,
  groupEventsByDay,
  shiftMonth,
  toMonthKey,
  type CategoryFilter,
  type ProgramacaoEvento,
} from "@/lib/programacao";

const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function CategoryTag({ category }: { category: ProgramacaoEvento["category"] }) {
  const config = CATEGORY_CONFIG[category];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] ${config.tagClass}`}
    >
      {config.label}
    </span>
  );
}

type MonthNavProps = {
  viewMonth: Date;
  onPrev: () => void;
  onNext: () => void;
};

function MonthNav({ viewMonth, onPrev, onNext }: MonthNavProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Mês anterior"
        className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-white/[0.03] text-foreground transition-[color,border-color,background-color] duration-300 hover:border-accent/35 hover:bg-accent/10 hover:text-accent motion-reduce:transition-none"
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>

      <p
        className="font-display text-xl tracking-tight text-foreground md:text-2xl"
        aria-live="polite"
      >
        {formatMonthLabel(viewMonth)}
      </p>

      <button
        type="button"
        onClick={onNext}
        aria-label="Próximo mês"
        className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-white/[0.03] text-foreground transition-[color,border-color,background-color] duration-300 hover:border-accent/35 hover:bg-accent/10 hover:text-accent motion-reduce:transition-none"
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}

type CategoryFilterProps = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
};

function CategoryFilterBar({ value, onChange }: CategoryFilterProps) {
  return (
    <div
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Filtrar por categoria"
    >
      {FILTER_CHIPS.map((chip) => {
        const isActive = value === chip.value;
        const chipStyle =
          chip.value === "all"
            ? isActive
              ? "border-accent/45 bg-accent/12 text-accent"
              : "border-hairline bg-white/[0.03] text-foreground-muted hover:border-accent/25 hover:text-foreground"
            : isActive
              ? CATEGORY_CONFIG[chip.value].chipClass
              : "border-hairline bg-white/[0.03] text-foreground-muted hover:border-white/20 hover:text-foreground";

        return (
          <button
            key={chip.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(chip.value)}
            className={`focus-ring shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-[color,border-color,background-color] duration-300 motion-reduce:transition-none ${chipStyle}`}
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}

type EventCtaProps = {
  event: ProgramacaoEvento;
  onReserve: () => void;
  variant?: "featured" | "list";
};

function EventCta({ event, onReserve, variant = "list" }: EventCtaProps) {
  const baseClass =
    variant === "featured"
      ? "focus-ring inline-flex min-h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-[color,background-color,border-color] duration-300 motion-reduce:transition-none"
      : "focus-ring shrink-0 text-xs font-medium tracking-wide transition-colors duration-300 motion-reduce:transition-none";

  if (event.href) {
    return (
      <a
        href={event.href}
        className={`${baseClass} ${
          variant === "featured"
            ? "border border-accent/40 bg-accent/10 text-accent hover:bg-accent/18"
            : "rounded-md px-2 py-1 text-accent hover:text-accent-hover"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        Saber mais
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onReserve}
      className={`${baseClass} ${
        variant === "featured"
          ? "border border-accent/40 bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-active"
          : "rounded-md px-2 py-1 text-accent hover:text-accent-hover"
      }`}
      style={{ transitionTimingFunction: PREMIUM_EASE }}
    >
      Reservar
    </button>
  );
}

type FeaturedEventCardProps = {
  event: ProgramacaoEvento;
  onReserve: () => void;
};

function FeaturedEventCard({ event, onReserve }: FeaturedEventCardProps) {
  const dateTimeLabel = formatEventDateTime(event.date, event.time);

  return (
    <SectionReveal variant="subtle">
      <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-surface-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_12px_32px_rgba(0,0,0,0.28)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-stretch">
          {event.image ? (
            <div className="relative aspect-[2/1] overflow-hidden md:aspect-auto md:h-full md:min-h-0">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-surface/40"
              />
              <span className="absolute left-2.5 top-2.5">
                <CategoryTag category={event.category} />
              </span>
            </div>
          ) : (
            <div
              aria-hidden
              className="flex aspect-[2/1] items-end bg-gradient-to-br from-accent/10 to-surface p-3 md:aspect-auto md:h-full md:min-h-0"
            >
              <CategoryTag category={event.category} />
            </div>
          )}

          <div className="flex flex-col justify-center p-4 md:p-5">
            <p className="section-eyebrow mb-1.5 !text-[10px]">Destaque do mês</p>
            <h3 className="font-display text-xl leading-tight tracking-tight text-foreground md:text-[1.375rem]">
              {event.title}
            </h3>
            <p className="mt-1.5 text-[13px] text-foreground-muted">
              <time dateTime={event.time ? `${event.date}T${event.time}` : event.date}>
                {dateTimeLabel}
              </time>
            </p>
            {event.artist ? (
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-foreground-muted">
                {event.artist}
              </p>
            ) : event.description ? (
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-foreground-muted">
                {event.description}
              </p>
            ) : null}
            <div className="mt-3.5 flex items-center gap-3">
              <EventCta event={event} onReserve={onReserve} variant="featured" />
            </div>
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

type EventRowProps = {
  event: ProgramacaoEvento;
  onReserve: () => void;
  showDivider: boolean;
};

function EventRow({ event, onReserve, showDivider }: EventRowProps) {
  const [open, setOpen] = useState(false);
  const expandable = Boolean(event.artist);
  const panelId = `event-panel-${event.id}`;

  const titleBlock = (
    <>
      <div className="flex flex-wrap items-center gap-2 gap-y-1">
        <h4 className="font-display text-base leading-snug tracking-tight text-foreground md:text-lg">
          {event.title}
        </h4>
        <CategoryTag category={event.category} />
        {expandable ? (
          <ChevronDown
            aria-hidden
            className={`h-4 w-4 text-foreground-muted transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-180 text-accent" : ""
            }`}
            strokeWidth={1.75}
          />
        ) : null}
      </div>
      {event.description ? (
        <p className="mt-1.5 line-clamp-2 text-sm text-foreground-muted">
          {event.description}
        </p>
      ) : null}
    </>
  );

  return (
    <article
      className={`group py-5 ${showDivider ? "border-b border-hairline" : ""}`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-4">
        <time
          dateTime={event.time ? `${event.date}T${event.time}` : event.date}
          className="pt-0.5 font-sans text-sm tabular-nums text-accent sm:text-base"
        >
          {event.time || "\u00a0"}
        </time>

        {expandable ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="focus-ring min-w-0 rounded-md text-left"
          >
            {titleBlock}
          </button>
        ) : (
          <div className="min-w-0">{titleBlock}</div>
        )}

        <div className="flex items-center gap-3 self-center">
          {event.image ? (
            <div className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-hairline sm:block">
              <img
                src={event.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}
          <EventCta event={event} onReserve={onReserve} />
        </div>
      </div>

      {expandable ? (
        <div
          id={panelId}
          role="region"
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <div className="overflow-hidden">
            <div className="pt-3 sm:pl-[5.5rem]">
              <p className="section-eyebrow !mb-1 !text-[10px]">A atração</p>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">
                {event.artist}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

type DayGroupProps = {
  date: string;
  events: ProgramacaoEvento[];
  onReserve: () => void;
  staggerIndex: number;
};

function DayGroup({ date, events, onReserve, staggerIndex }: DayGroupProps) {
  return (
    <SectionReveal variant="subtle" delay={0.04 * staggerIndex}>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-x-8">
        <header className="mb-3 flex items-baseline gap-2 md:mb-0 md:flex-col md:gap-0 md:pt-5">
          <span
            aria-hidden
            className="font-display text-4xl leading-none tracking-tight text-foreground md:text-5xl"
          >
            {formatDayNumber(date)}
          </span>
          <p className="text-xs uppercase tracking-[0.12em] text-foreground-muted md:mt-1">
            <time dateTime={date}>{formatWeekday(date)}</time>
          </p>
        </header>

        <div>
          {events.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              onReserve={onReserve}
              showDivider={index < events.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function EmptyState({
  viewMonth,
  category,
  hasEventsInMonth,
}: {
  viewMonth: Date;
  category: CategoryFilter;
  hasEventsInMonth: boolean;
}) {
  const monthLabel = formatMonthLabel(viewMonth);

  return (
    <SectionReveal variant="subtle">
      <div className="rounded-[var(--radius-md)] border border-dashed border-hairline bg-white/[0.02] px-6 py-14 text-center">
        <span
          aria-hidden
          className="mx-auto mb-4 block h-px w-10 bg-accent/60"
        />
        <p className="font-display text-lg text-foreground">
          {hasEventsInMonth
            ? "Nenhum evento nesta categoria"
            : `Nenhum evento em ${monthLabel}`}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-foreground-muted">
          {hasEventsInMonth
            ? "Experimente outro filtro ou volte para ver toda a programação do mês."
            : "A agenda deste mês ainda está sendo curada. Navegue para outro mês ou volte em breve."}
        </p>
        {category !== "all" && hasEventsInMonth ? (
          <p className="mt-3 text-xs text-foreground-muted/70">
            Filtro ativo: {CATEGORY_CONFIG[category].label}
          </p>
        ) : null}
      </div>
    </SectionReveal>
  );
}

export function Programacao() {
  const { open: openReservation } = useReservation();
  const [viewMonth, setViewMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredEvents = useMemo(
    () => filterProgramacao(PROGRAMACAO_EVENTOS, viewMonth, category),
    [viewMonth, category],
  );

  const eventsInMonth = useMemo(
    () => filterProgramacao(PROGRAMACAO_EVENTOS, viewMonth, "all"),
    [viewMonth],
  );

  const featuredEvent = useMemo(
    () => filteredEvents.find((event) => event.featured) ?? null,
    [filteredEvents],
  );

  const listEvents = useMemo(
    () =>
      featuredEvent
        ? filteredEvents.filter((event) => event.id !== featuredEvent.id)
        : filteredEvents,
    [filteredEvents, featuredEvent],
  );

  const groupedDays = useMemo(() => groupEventsByDay(listEvents), [listEvents]);

  const filterKey = `${toMonthKey(viewMonth)}-${category}`;

  return (
    <section id="programacao" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <AnimatedSectionHeading
          className="mb-8 md:mb-10"
          eyebrow="Agenda cultural"
          title="Programação"
          kicker="Jazz, piano bar, lançamentos e saraus — curada mês a mês na Savassi."
          editorial
        />
        {getExperienciasAtivasHoje().length > 0 && (
          <SectionReveal variant="subtle">
            <div className="mb-6 space-y-3">
              {getExperienciasAtivasHoje().map((experiencia) => (
                <AppLink
                  key={experiencia.id}
                  to={experiencia.href}
                  className="focus-ring flex items-center gap-4 rounded-md border border-accent/20 bg-accent/8 px-5 py-4 transition-colors hover:border-accent/35 hover:bg-accent/12"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Hoje: {experiencia.title}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground-muted">
                      {experiencia.scheduleShort}
                    </p>
                  </div>
                  <img
                    src={experiencia.image}
                    alt=""
                    aria-hidden
                    className="ml-auto hidden h-12 w-12 shrink-0 rounded-sm object-cover sm:block"
                    loading="eager"
                    decoding="async"
                  />
                </AppLink>
              ))}
            </div>
          </SectionReveal>
        )}

        <div className="sticky top-14 z-20 -mx-5 mb-8 space-y-4 border-b border-hairline bg-background/95 px-5 py-4 backdrop-blur-md md:static md:mx-0 md:mb-10 md:border-b-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <MonthNav
            viewMonth={viewMonth}
            onPrev={() => setViewMonth((current) => shiftMonth(current, -1))}
            onNext={() => setViewMonth((current) => shiftMonth(current, 1))}
          />
          <CategoryFilterBar value={category} onChange={setCategory} />
        </div>

        <div
          key={filterKey}
          className="motion-safe:animate-[programacao-fade_0.45s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
        >
          {filteredEvents.length === 0 ? (
            <EmptyState
              viewMonth={viewMonth}
              category={category}
              hasEventsInMonth={eventsInMonth.length > 0}
            />
          ) : (
            <div className="space-y-10 md:space-y-12">
              {featuredEvent ? (
                <FeaturedEventCard
                  event={featuredEvent}
                  onReserve={openReservation}
                />
              ) : null}

              {groupedDays.length > 0 ? (
                <div className="space-y-8 md:space-y-10">
                  <div
                    aria-hidden
                    className="h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent"
                  />
                  {groupedDays.map(({ date, events }, index) => (
                    <DayGroup
                      key={date}
                      date={date}
                      events={events}
                      onReserve={openReservation}
                      staggerIndex={index}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-hairline pt-6 md:mt-16 md:pt-8">
          <p className="section-caption !mb-0">Horário de funcionamento</p>
          <p className="section-prose mt-2">
            Aberto todos os dias · Domingo a quinta-feira das 12h às 22h · Sexta-feira
            e sábado das 12h às 23h.
          </p>
        </div>
      </div>
    </section>
  );
}
