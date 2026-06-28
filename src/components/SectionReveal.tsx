import { m, useReducedMotion } from "framer-motion";
import { type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import {
  compositorStyle,
  editorialBodyVariants,
  editorialContainerVariants,
  editorialEyebrowVariants,
  editorialTitleVariants,
  fadeUpVariants,
  indexScaleVariants,
  lineMaskVariants,
  revealSpring,
  staggerGridContainerVariants,
  staggerGridItemVariants,
  subtleFadeVariants,
} from "@/lib/motion-presets";

export type SectionRevealVariant =
  | "none"
  | "fade"
  | "editorial"
  | "line-mask"
  | "stagger"
  | "subtle"
  | "index-scale";

type SectionRevealProps = {
  children: ReactNode;
  variant?: SectionRevealVariant;
  className?: string;
  delay?: number;
  rootMargin?: string;
  style?: CSSProperties;
};

function useRevealMotion(rootMargin: string) {
  const [ref, inView] = useInView<HTMLDivElement>({
    rootMargin,
    threshold: 0.15,
  });
  const reduceMotion = useReducedMotion();

  return { ref, inView, reduceMotion };
}

export function SectionReveal({
  children,
  variant = "fade",
  className = "",
  delay = 0,
  rootMargin = "-60px",
  style,
}: SectionRevealProps) {
  const { ref, inView, reduceMotion } = useRevealMotion(rootMargin);
  const transition = reduceMotion ? { duration: 0 } : revealSpring;

  if (variant === "none" || reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <m.div
        ref={ref}
        className={className}
        style={{ ...compositorStyle, ...style }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={editorialContainerVariants}
      >
        {children}
      </m.div>
    );
  }

  if (variant === "stagger") {
    return (
      <m.div
        ref={ref}
        className={className}
        style={{ ...compositorStyle, ...style }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerGridContainerVariants}
      >
        {children}
      </m.div>
    );
  }

  if (variant === "line-mask") {
    return (
      <div ref={ref} className={`line-reveal-mask ${className}`} style={style}>
        <m.div
          className="section-line-reveal-inner"
          style={compositorStyle}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={lineMaskVariants}
          transition={transition}
        >
          {children}
        </m.div>
      </div>
    );
  }

  if (variant === "index-scale") {
    return (
      <m.div
        ref={ref}
        className={`section-index-reveal ${className}`}
        style={{ ...compositorStyle, ...style }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={indexScaleVariants}
        transition={{ ...transition, delay }}
      >
        {children}
      </m.div>
    );
  }

  if (variant === "subtle") {
    return (
      <m.div
        ref={ref}
        className={className}
        style={{ ...compositorStyle, ...style }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={subtleFadeVariants}
        transition={{ ...transition, delay }}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={`section-view-reveal ${className}`}
      style={{ ...compositorStyle, ...style }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{ ...transition, delay }}
    >
      {children}
    </m.div>
  );
}

export function EditorialEyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={editorialEyebrowVariants}>
      {children}
    </m.div>
  );
}

export function EditorialTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={editorialTitleVariants}>
      {children}
    </m.div>
  );
}

export function EditorialBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={editorialBodyVariants}>
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      style={compositorStyle}
      variants={staggerGridItemVariants}
      custom={index}
    >
      {children}
    </m.div>
  );
}
