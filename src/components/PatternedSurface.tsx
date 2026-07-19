import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { SurfacePattern } from "@/components/SurfacePattern";
import type { BackgroundPatternVariant } from "@/components/BackgroundPattern";
import type { PatternSheetTone } from "@/hooks/usePatternSheet";

type PatternedSurfaceProps<T extends ElementType = "div"> = {
  as?: T;
  tone?: PatternSheetTone;
  variant?: BackgroundPatternVariant;
  pattern?: boolean;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function PatternedSurface<T extends ElementType = "div">({
  as,
  tone,
  variant,
  pattern = true,
  className = "",
  children,
  ...props
}: PatternedSurfaceProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={`patterned-surface${className ? ` ${className}` : ""}`}
      {...props}
    >
      {pattern ? <SurfacePattern variant={variant} tone={tone} /> : null}
      {children}
    </Tag>
  );
}
