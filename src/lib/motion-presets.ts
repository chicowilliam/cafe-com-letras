/**
 * Apple/ProMotion motion presets — compositor-only (opacity, transform).
 * Authored for 120Hz displays; remains smooth on 30–60Hz by avoiding layout/paint animation.
 */
import type { CSSProperties } from "react";
import type { Transition, Variants } from "framer-motion";

export const compositorStyle: CSSProperties = {
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
};

export const pageSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.8,
};

export const pageExitSpring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 42,
  mass: 0.65,
};

export const chromeSpring: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 42,
  mass: 0.6,
};

export const cardapioEnterSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.9,
  delay: 0.06,
};

export const cardapioExitSpring: Transition = {
  type: "spring",
  stiffness: 460,
  damping: 40,
  mass: 0.75,
};

export const experienciasSpring: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 40,
  mass: 0.7,
};

export const revealSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 36,
  mass: 0.85,
};

export const overlaySpring: Transition = {
  type: "spring",
  stiffness: 540,
  damping: 44,
  mass: 0.55,
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/** Experience hub triptych — panel layout + content reveal */
export const hubPanelSpring: Transition = experienciasSpring;

export const hubImageSpring: Transition = {
  type: "spring",
  stiffness: 440,
  damping: 38,
  mass: 0.75,
};

export const hubContentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const hubContentItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealSpring,
  },
};

export const hubCompactVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Rough upper bound for spring settle (scroll scheduling fallback). */
export const SPRING_SETTLE_MS = 520;
