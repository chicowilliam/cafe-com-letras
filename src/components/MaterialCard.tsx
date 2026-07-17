import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useRef,
} from "react";
import {
  CardAccent,
  nextCardAccentVariant,
  type CardAccentTone,
  type CardAccentVariant,
} from "@/components/CardAccent";

type MaterialCardProps<T extends ElementType = "div"> = {
  as?: T;
  tone?: CardAccentTone;
  /** Fixa a variante; senão alterna automaticamente entre sprig-a/b/c */
  accent?: CardAccentVariant;
  /** Canto do ornamento; senão cada variante usa o canto canônico */
  accentCorner?: "tr" | "tl" | "br" | "bl";
  /** Desliga o ornamento (ex.: card 100% imagem) */
  accentEnabled?: boolean;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Card sólido opaco com ornamento botânico impresso (CardAccent).
 * Use no lugar de `className="material-card"` para herdar o acento automaticamente.
 */
export function MaterialCard<T extends ElementType = "div">({
  as,
  tone = "dark",
  accent,
  accentCorner,
  accentEnabled = true,
  className = "",
  children,
  ...props
}: MaterialCardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const variantRef = useRef<CardAccentVariant | null>(null);
  if (variantRef.current === null) {
    variantRef.current = accent ?? nextCardAccentVariant();
  }
  const variant = accent ?? variantRef.current;

  return (
    <Tag
      className={`material-card${className ? ` ${className}` : ""}`}
      {...props}
    >
      {accentEnabled ? (
        <CardAccent variant={variant} tone={tone} corner={accentCorner} />
      ) : null}
      {children}
    </Tag>
  );
}
