import type { CardapioCatalogSection } from "@/lib/cardapio-catalog";
import type { CardapioLang } from "@/lib/cardapio-images";
import { CardapioListItem } from "@/components/cardapio/CardapioListItem";

type CardapioListSectionProps = {
  section: CardapioCatalogSection;
  lang: CardapioLang;
  query: string;
};

export function CardapioListSection({
  section,
  lang,
  query,
}: CardapioListSectionProps) {
  return (
    <section
      id={section.id}
      aria-label={section.label}
      className="cardapio-list-section scroll-mt-[7.5rem] lg:scroll-mt-20"
    >
      <header className="cardapio-list-section__header">
        {section.eyebrow ? (
          <p className="cardapio-list-section__eyebrow">{section.eyebrow}</p>
        ) : null}
        <h2 className="cardapio-list-section__title font-display">{section.label}</h2>
        {section.intro ? (
          <p className="cardapio-list-section__intro">{section.intro}</p>
        ) : null}
      </header>

      <ul className="cardapio-list-section__items">
        {section.items.map((item) => (
          <CardapioListItem key={item.id} item={item} lang={lang} query={query} />
        ))}
      </ul>
    </section>
  );
}
