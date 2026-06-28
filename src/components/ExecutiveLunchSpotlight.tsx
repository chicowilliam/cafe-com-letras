import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLink } from "@/components/AppLink";
import { SectionReveal } from "@/components/SectionReveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact";
import {
  EXECUTIVE_LUNCH_ANCHOR,
  EXECUTIVE_LUNCH_COPY,
  EXECUTIVE_LUNCH_WEEK,
  getExecutiveLunchToday,
  getExecutiveLunchWhatsAppMessage,
  isExecutiveLunchHours,
  isExecutiveLunchWeekday,
} from "@/lib/executive-lunch";

export function ExecutiveLunchSpotlight() {
  const [visible, setVisible] = useState(false);
  const [duringLunch, setDuringLunch] = useState(isExecutiveLunchHours);

  useEffect(() => {
    setVisible(isExecutiveLunchWeekday());
    setDuringLunch(isExecutiveLunchHours());

    const id = window.setInterval(() => {
      setVisible(isExecutiveLunchWeekday());
      setDuringLunch(isExecutiveLunchHours());
    }, 60_000);

    return () => window.clearInterval(id);
  }, []);

  if (!visible) return null;

  const today = getExecutiveLunchToday();
  const todayWeekday = today?.weekday ?? 1;

  return (
    <SectionReveal variant="subtle" className="mx-auto mt-8 max-w-2xl text-left md:mt-10">
      <article
        id={EXECUTIVE_LUNCH_ANCHOR}
        className="overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_12px_32px_rgba(0,0,0,0.22)]"
      >
        <div className="border-b border-hairline bg-accent/5 px-5 py-4 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <p className="section-eyebrow !mb-0">{EXECUTIVE_LUNCH_COPY.eyebrow}</p>
            {duringLunch ? (
              <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-wide text-accent">
                Servido agora
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
            {EXECUTIVE_LUNCH_COPY.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-foreground-muted">
            {EXECUTIVE_LUNCH_COPY.schedule}
          </p>
        </div>

        <div className="px-5 py-5 md:px-6 md:py-6">
          <p className="text-lead leading-relaxed">
            {EXECUTIVE_LUNCH_COPY.description}
          </p>

          <div className="mt-5 rounded-md border border-hairline bg-background/60 px-4 py-3.5">
            <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.12em] text-foreground-muted">
              {today?.label ?? "Hoje"}
            </p>
            <p className="mt-1 font-display text-lg leading-snug tracking-tight text-foreground">
              {today?.highlight ?? "Menu do dia"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
              {today?.highlight
                ? "Opção especial de hoje — sujeita à disponibilidade na casa."
                : EXECUTIVE_LUNCH_COPY.todayFallback}
            </p>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-1.5"
            role="list"
            aria-label="Dias do almoço executivo na semana"
          >
            {EXECUTIVE_LUNCH_WEEK.map((slot) => {
              const isToday = slot.weekday === todayWeekday;
              return (
                <span
                  key={slot.weekday}
                  role="listitem"
                  className={`rounded-full border px-2.5 py-1 font-sans text-[0.6875rem] font-medium tracking-wide ${
                    isToday
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-hairline bg-surface text-foreground-muted"
                  }`}
                >
                  {slot.shortLabel}
                </span>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AppLink
              to="/cardapio"
              className="btn-primary focus-ring inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none"
            >
              {EXECUTIVE_LUNCH_COPY.ctaCardapio}
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
            </AppLink>
            <a
              href={buildWhatsAppUrl(getExecutiveLunchWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost focus-ring inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none"
            >
              <WhatsAppIcon size={16} tone="brand" className="shrink-0" />
              {EXECUTIVE_LUNCH_COPY.ctaWhatsApp}
            </a>
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}
