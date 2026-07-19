import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { SurfacePattern } from "@/components/SurfacePattern";
import type { BackgroundPatternVariant } from "@/components/BackgroundPattern";
import type { PatternSheetTone } from "@/hooks/usePatternSheet";

type MaterialCardProps<T extends ElementType = "div"> = {
  as?: T;
  tone?: PatternSheetTone;
  variant?: BackgroundPatternVariant;
  /** Desliga a camada botânica (ex.: card 100% imagem) */
  pattern?: boolean;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Card sólido opaco com o mesmo SVG botânico das seções (folha contínua).
 */
export function MaterialCard<T extends ElementType = "div">({
  as,
  tone = "dark",
  variant,
  pattern = true,
  className = "",
  children,
  ...props
}: MaterialCardProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={`material-card${pattern ? " patterned-surface" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {pattern ? <SurfacePattern variant={variant} tone={tone} /> : null}
      {children}
    </Tag>
  );
}
