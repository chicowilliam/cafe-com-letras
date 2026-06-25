import type { CardapioLang } from "@/lib/cardapio-images";
import { formatCardapioEditionDate } from "@/lib/cardapio-premium";

type CardapioPrintCoverProps = {
  lang: CardapioLang;
  updatedAt: string;
};

export function CardapioPrintCover({ lang, updatedAt }: CardapioPrintCoverProps) {
  const edition = formatCardapioEditionDate(updatedAt, lang);

  return (
    <header className="cardapio-print-cover" aria-label={lang === "pt" ? "Capa do cardápio" : "Menu cover"}>
      <p className="cardapio-print-cover__kicker">
        {lang === "pt" ? "Savassi · Belo Horizonte" : "Savassi · Belo Horizonte"}
      </p>
      <h1 className="cardapio-print-cover__title">Café com Letras</h1>
      <p className="cardapio-print-cover__tagline">
        {lang === "pt"
          ? "da cozinha mineira ao café autoral"
          : "where literature, culture and gastronomy meet"}
      </p>
      <div className="cardapio-print-cover__ornament" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <p className="cardapio-print-cover__edition">
        {lang === "pt" ? `Edição ${edition}` : `Edition ${edition}`}
      </p>
      <p className="cardapio-print-cover__hint">
        {lang === "pt"
          ? "Role para folhear — ou busque um prato no ícone acima."
          : "Scroll to browse — or search using the icon above."}
      </p>
    </header>
  );
}
