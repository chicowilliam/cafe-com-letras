import { normalizeSearchText } from "@/lib/cardapio-format";

type HighlightTextProps = {
  text: string;
  query: string;
};

export function HighlightText({ text, query }: HighlightTextProps) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return <>{text}</>;

  const normalizedText = normalizeSearchText(text);
  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + normalizedQuery.length);
  const after = text.slice(index + normalizedQuery.length);

  return (
    <>
      {before}
      <mark className="cardapio-list-item__mark">{match}</mark>
      {after}
    </>
  );
}
