import { Link } from "react-router-dom";
import { useReservation } from "@/hooks/useReservation";
import type { CardapioLang } from "@/lib/cardapio-images";

type CardapioPrintFooterProps = {
  lang: CardapioLang;
  onChangeLang: () => void;
  enNotice?: string;
};

export function CardapioPrintFooter({
  lang,
  onChangeLang,
  enNotice,
}: CardapioPrintFooterProps) {
  const { open: openReservation } = useReservation();

  return (
    <footer className="cardapio-print-footer">
      {enNotice ? (
        <p className="cardapio-print-footer__notice">{enNotice}</p>
      ) : null}

      <div className="cardapio-print-footer__actions">
        <button
          type="button"
          onClick={openReservation}
          className="cardapio-print-footer__btn cardapio-print-footer__btn--primary focus-ring"
        >
          {lang === "pt" ? "Reservar mesa" : "Book a table"}
        </button>
        <a
          href="https://wa.me/5531984244285"
          className="cardapio-print-footer__btn focus-ring"
          target="_blank"
          rel="noopener noreferrer"
        >
          {lang === "pt" ? "Delivery" : "Delivery"}
        </a>
        <Link to="/programacao" viewTransition className="cardapio-print-footer__btn focus-ring">
          {lang === "pt" ? "Programação" : "Events"}
        </Link>
      </div>

      <div className="cardapio-print-footer__links">
        <Link to="/experiencias/cafe-da-tarde" viewTransition className="cardapio-print-footer__link focus-ring">
          {lang === "pt" ? "Café da Tarde" : "Afternoon tea"}
        </Link>
        <span aria-hidden className="cardapio-print-footer__sep">
          ·
        </span>
        <Link to="/noite-dos-dates" viewTransition className="cardapio-print-footer__link focus-ring">
          {lang === "pt" ? "Noite dos Dates" : "Date night"}
        </Link>
      </div>

      <button
        type="button"
        onClick={onChangeLang}
        className="cardapio-print-footer__lang focus-ring"
      >
        {lang === "pt" ? "Ver outro idioma" : "Switch language"}
      </button>
    </footer>
  );
}
