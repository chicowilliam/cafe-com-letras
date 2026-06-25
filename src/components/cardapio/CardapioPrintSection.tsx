import type { CardapioCatalogSection } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";
import { CardapioPrintInfoPage } from "@/components/cardapio/CardapioPrintInfoPage";
import { CardapioPrintItem } from "@/components/cardapio/CardapioPrintItem";

type CardapioPrintSectionProps = {
  section: CardapioCatalogSection;
  lang: CardapioLang;
  query: string;
  highlightItemId?: string | null;
};

export function CardapioPrintSection({
  section,
  lang,
  query,
  highlightItemId,
}: CardapioPrintSectionProps) {
  const columns = section.columns ?? 1;
  const isInfoSection = section.infoLayout === "groups" && section.infoBlocks?.length;
  const showEyebrow =
    section.eyebrow &&
    section.eyebrow.trim().toLowerCase() !== section.label.trim().toLowerCase();
  const sectionHeading = section.heading ?? section.label;

  return (
    <section
      id={section.id}
      aria-label={section.label}
      className={`cardapio-print-section scroll-mt-[7.5rem] lg:scroll-mt-20 ${
        isInfoSection ? "cardapio-print-section--info" : ""
      }`}
    >
      <div className="cardapio-print-section__body">
        <header className="cardapio-print-section__head">
          {showEyebrow ? (
            <p className="cardapio-print-section__eyebrow">{section.eyebrow}</p>
          ) : null}
          <h2 className="cardapio-print-section__heading">{sectionHeading}</h2>
        </header>

        {isInfoSection ? (
          <CardapioPrintInfoPage blocks={section.infoBlocks!} />
        ) : null}

        {!isInfoSection && section.introBlocks && section.introBlocks.length > 0 ? (
          <div className="cardapio-print-info">
            {section.introBlocks.map((block) => (
              <div key={block.title} className="cardapio-print-info__block">
                <h3 className="cardapio-print-info__title">{block.title}</h3>
                <p className="cardapio-print-info__body">{block.body}</p>
              </div>
            ))}
          </div>
        ) : null}

        {section.items.length > 0 ? (
          <ul
            className={`cardapio-print-items ${
              columns > 1 ? "cardapio-print-items--cols-2" : ""
            }`}
          >
            {section.items.map((item) => (
              <CardapioPrintItem
                key={item.id}
                item={item}
                lang={lang}
                query={query}
                highlighted={highlightItemId === item.id}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
