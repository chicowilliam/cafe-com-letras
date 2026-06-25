import type {
  CardapioInfoBlock,
  CardapioInfoLine,
} from "@/lib/cardapio-catalog";

type CardapioPrintInfoPageProps = {
  blocks: CardapioInfoBlock[];
};

function InfoLine({ line }: { line: CardapioInfoLine }) {
  const value = line.href ? (
    <a href={line.href} className="cardapio-print-info__link focus-ring">
      {line.value}
    </a>
  ) : (
    <span>{line.value}</span>
  );

  if (line.label) {
    return (
      <div className="cardapio-print-info__line">
        <span className="cardapio-print-info__line-label">{line.label}</span>
        <span className="cardapio-print-info__line-value">{value}</span>
      </div>
    );
  }

  return <p className="cardapio-print-info__line-value cardapio-print-info__line-value--solo">{value}</p>;
}

function InfoBlock({ block }: { block: CardapioInfoBlock }) {
  const variant = block.variant ?? "default";
  const column = block.column ?? 1;

  return (
    <article
      className={`cardapio-print-info__block cardapio-print-info__block--${variant}`}
      data-column={column}
    >
      <h3 className="cardapio-print-info__title">{block.title}</h3>

      {block.body ? (
        <p className="cardapio-print-info__body">{block.body}</p>
      ) : null}

      {block.lines && block.lines.length > 0 ? (
        <div className="cardapio-print-info__lines">
          {block.lines.map((line, index) => (
            <InfoLine key={`${block.id}-line-${index}`} line={line} />
          ))}
        </div>
      ) : null}

      {block.items && block.items.length > 0 ? (
        <ul className="cardapio-print-info__program-list">
          {block.items.map((item) => (
            <li key={`${block.id}-${item.name}`} className="cardapio-print-info__program-item">
              <p className="cardapio-print-info__program-name">{item.name}</p>
              {item.detail ? (
                item.href ? (
                  <a
                    href={item.href}
                    className="cardapio-print-info__program-when cardapio-print-info__link focus-ring"
                  >
                    {item.detail}
                  </a>
                ) : (
                  <p className="cardapio-print-info__program-when">{item.detail}</p>
                )
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {block.footnote ? (
        <p className="cardapio-print-info__footnote">{block.footnote}</p>
      ) : null}
    </article>
  );
}

export function CardapioPrintInfoPage({ blocks }: CardapioPrintInfoPageProps) {
  const primaryBlocks = blocks.filter((b) => b.column === 1 || b.column === undefined);
  const secondaryBlocks = blocks.filter((b) => b.column === 2);
  const fullBlocks = blocks.filter((b) => b.column === "full");

  return (
    <div className="cardapio-print-info cardapio-print-info--structured">
      <div className="cardapio-print-info__column">
        {primaryBlocks.map((block) => (
          <InfoBlock key={block.id} block={block} />
        ))}
      </div>
      <div className="cardapio-print-info__column">
        {secondaryBlocks.map((block) => (
          <InfoBlock key={block.id} block={block} />
        ))}
      </div>
      {fullBlocks.map((block) => (
        <InfoBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
