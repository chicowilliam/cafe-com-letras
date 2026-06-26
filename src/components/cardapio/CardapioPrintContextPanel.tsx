import { useMemo } from "react";
import { AppLink } from "@/components/AppLink";
import highlightsEn from "@/data/cardapio/highlights.en.json";
import highlightsPt from "@/data/cardapio/highlights.pt.json";
import infoGeralEn from "@/data/cardapio/info-geral.en.json";
import infoGeralPt from "@/data/cardapio/info-geral.pt.json";
import { useReservation } from "@/hooks/useReservation";
import { CARDAPIO_COVER_IMAGES } from "@/lib/cardapio-cover-images";
import { getCatalog } from "@/lib/cardapio-catalog";
import { getItemPriceLabel } from "@/lib/cardapio-format";
import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioPrintContextPanelProps = {
  lang: CardapioLang;
};

function scrollToMenuItem(itemId: string) {
  const target = document.getElementById(`cardapio-item-${itemId}`);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function CardapioPrintContextPanel({ lang }: CardapioPrintContextPanelProps) {
  const { open: openReservation } = useReservation();
  const catalog = useMemo(() => getCatalog(lang), [lang]);

  const infoGeral = lang === "pt" ? infoGeralPt : infoGeralEn;
  const programBlock = infoGeral.blocks.find((block) => block.id === "programacao");
  const programItems = programBlock?.items?.slice(0, 3) ?? [];

  const highlights = lang === "pt" ? highlightsPt : highlightsEn;

  const dailyHighlight = useMemo(() => {
    const entry = highlights.items[new Date().getDay() % highlights.items.length];
    if (!entry) return null;
    for (const section of catalog.sections) {
      const item = section.items.find((candidate) => candidate.id === entry.itemId);
      if (item) return { ...entry, item };
    }
    return null;
  }, [catalog, highlights.items]);

  const ambianceSrc = CARDAPIO_COVER_IMAGES[lang];

  return (
    <div className="cardapio-context-panel" aria-label={lang === "pt" ? "Na casa" : "At the café"}>
      <p className="cardapio-context-panel__label">
        {lang === "pt" ? "Na casa" : "At the café"}
      </p>

      {programItems.length > 0 ? (
        <section className="cardapio-context-panel__block">
          <h2 className="cardapio-context-panel__title">
            {lang === "pt" ? "Programação" : "Live music & culture"}
          </h2>
          <ul className="cardapio-context-panel__program">
            {programItems.map((event) => (
              <li key={event.name} className="cardapio-context-panel__program-item">
                <p className="cardapio-context-panel__program-name">{event.name}</p>
                {event.detail ? (
                  event.href ? (
                    <a href={event.href} className="cardapio-context-panel__program-when focus-ring">
                      {event.detail}
                    </a>
                  ) : (
                    <p className="cardapio-context-panel__program-when">{event.detail}</p>
                  )
                ) : null}
              </li>
            ))}
          </ul>
          <AppLink to="/programacao" className="cardapio-context-panel__text-link focus-ring">
            {lang === "pt" ? "Ver agenda completa" : "Full events calendar"}
          </AppLink>
        </section>
      ) : null}

      {dailyHighlight ? (
        <section className="cardapio-context-panel__block">
          <h2 className="cardapio-context-panel__title">
            {lang === "pt" ? "Destaque do dia" : "Today's pick"}
          </h2>
          <button
            type="button"
            onClick={() => scrollToMenuItem(dailyHighlight.itemId)}
            className="cardapio-context-panel__highlight focus-ring"
          >
            <span className="cardapio-context-panel__highlight-name">
              {dailyHighlight.item.name}
            </span>
            <span className="cardapio-context-panel__highlight-price">
              {getItemPriceLabel(dailyHighlight.item, lang)}
            </span>
            <span className="cardapio-context-panel__highlight-note">{dailyHighlight.note}</span>
          </button>
        </section>
      ) : null}

      <section className="cardapio-context-panel__block">
        <h2 className="cardapio-context-panel__title">
          {lang === "pt" ? "Pedido rápido" : "Quick order"}
        </h2>
        <div className="cardapio-context-panel__actions">
          <button
            type="button"
            onClick={openReservation}
            className="cardapio-context-panel__btn cardapio-context-panel__btn--primary focus-ring"
          >
            {lang === "pt" ? "Reservar mesa" : "Book a table"}
          </button>
          <a
            href="https://wa.me/5531984244285"
            target="_blank"
            rel="noopener noreferrer"
            className="cardapio-context-panel__btn focus-ring"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <section className="cardapio-context-panel__block cardapio-context-panel__block--links">
        <AppLink to="/experiencias/cafe-da-tarde" className="cardapio-context-panel__text-link focus-ring">
          {lang === "pt" ? "Café da Tarde" : "Afternoon tea"}
        </AppLink>
        <AppLink to="/noite-dos-dates" className="cardapio-context-panel__text-link focus-ring">
          {lang === "pt" ? "Noite dos Dates" : "Date night"}
        </AppLink>
      </section>

      <figure className="cardapio-context-panel__ambiance">
        <img
          src={ambianceSrc}
          alt={lang === "pt" ? "Ambiente do Café com Letras" : "Café com Letras dining room"}
          loading="lazy"
          decoding="async"
          className="cardapio-context-panel__ambiance-image"
        />
        <figcaption className="cardapio-context-panel__ambiance-caption">
          {lang === "pt" ? "Savassi · BH" : "Savassi · Belo Horizonte"}
        </figcaption>
      </figure>
    </div>
  );
}
