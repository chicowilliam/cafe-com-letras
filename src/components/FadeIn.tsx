import { m, useReducedMotion } from "framer-motion";
import { type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { compositorStyle, fadeUpVariants, revealSpring } from "@/lib/motion-presets";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
  style?: CSSProperties;
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  rootMargin = "-60px",
  style,
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ ...compositorStyle, ...style }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{ ...revealSpring, delay }}
    >
      {children}
    </m.div>
  );
}
