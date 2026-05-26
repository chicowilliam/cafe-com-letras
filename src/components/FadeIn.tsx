import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
  style?: CSSProperties;
};

export function FadeIn({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  rootMargin = "-60px",
  style,
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLElement>({ rootMargin });

  return (
    <Tag
      ref={ref}
      className={`fade-in-up${inView ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
