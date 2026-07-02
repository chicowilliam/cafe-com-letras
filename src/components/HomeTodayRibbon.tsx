import { AppLink } from "@/components/AppLink";
import { SectionReveal } from "@/components/SectionReveal";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { useReservation } from "@/hooks/useReservation";
import { CTA_LABELS } from "@/lib/cta-labels";
import {
  formatTodayRibbonDate,
  getHomeTodayItems,
  type HomeTodayExperienciaItem,
  type HomeTodayEventItem,
} from "@/lib/home-today";
import "@/styles/home-today-ribbon.css";

function ExperienciaRow({
  item,
  onReserve,
}: {
  item: HomeTodayExperienciaItem;
  onReserve: () => void;
}) {
  const { entry: experiencia } = item;

  return (
    <li className="home-today-ribbon__row">
      <span className="home-today-ribbon__dot" aria-hidden />
      <div className="home-today-ribbon__copy">
        <p className="home-today-ribbon__title">{experiencia.title}</p>
        <p className="home-today-ribbon__meta">{experiencia.scheduleShort}</p>
      </div>
      <div className="home-today-ribbon__actions">
        <AppLink
          to={`/experiencias?highlight=${experiencia.id}`}
          className="home-today-ribbon__link focus-ring"
        >
          Ver
        </AppLink>
        <button
          type="button"
          onClick={onReserve}
          className="home-today-ribbon__link home-today-ribbon__link--accent focus-ring"
        >
          {CTA_LABELS.reserve}
        </button>
      </div>
    </li>
  );
}

function EventRow({ item }: { item: HomeTodayEventItem }) {
  const timeSuffix = item.event.time ? ` — ${item.event.time}` : "";

  return (
    <li className="home-today-ribbon__row">
      <span className="home-today-ribbon__dot" aria-hidden />
      <div className="home-today-ribbon__copy">
        <p className="home-today-ribbon__title">
          {item.event.title}
          {timeSuffix}
        </p>
        <p className="home-today-ribbon__meta">Programação cultural</p>
      </div>
      <div className="home-today-ribbon__actions">
        <AppLink to="/#programacao" className="home-today-ribbon__link focus-ring">
          {CTA_LABELS.viewAgenda}
        </AppLink>
      </div>
    </li>
  );
}

export function HomeTodayRibbon() {
  const { open: openReservation } = useReservation();
  const { open: openCheckout } = useExperienceCheckout();
  const items = getHomeTodayItems();
  const dateLabel = formatTodayRibbonDate();

  const handleReserve = (id: string) => {
    if (id === "noite-dos-dates") {
      openCheckout({ theme: "dates" });
      return;
    }
    openReservation();
  };

  return (
    <section
      id="hoje-na-casa"
      className="home-today-ribbon border-b border-hairline bg-background"
      aria-label="Hoje na Savassi"
    >
      <div className="mx-auto max-w-6xl px-5 py-5 md:px-8 md:py-6">
        <SectionReveal variant="subtle">
          <div className="home-today-ribbon__panel rounded-md border border-hairline bg-surface/80 px-4 py-4 md:px-5 md:py-5">
            <p className="home-today-ribbon__header section-caption !mb-3">
              Hoje na Savassi · {dateLabel}
            </p>

            {items.length > 0 ? (
              <ul className="home-today-ribbon__list">
                {items.map((item) =>
                  item.kind === "experiencia" ? (
                    <ExperienciaRow
                      key={item.entry.id}
                      item={item}
                      onReserve={() => handleReserve(item.entry.id)}
                    />
                  ) : (
                    <EventRow key={item.event.id} item={item} />
                  ),
                )}
              </ul>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-foreground-muted">
                  Nada em destaque agora — confira a agenda do mês.
                </p>
                <AppLink
                  to="/#programacao"
                  className="home-today-ribbon__link home-today-ribbon__link--accent focus-ring self-start sm:self-auto"
                >
                  {CTA_LABELS.viewAgenda}
                </AppLink>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
