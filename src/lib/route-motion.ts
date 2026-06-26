/**
 * Route motion — Apple-style springs via Framer Motion (no browser View Transitions API).
 */
import type { Variants } from "framer-motion";
import type { RouteTransitionGroup } from "@/lib/navigation";
import {
  cardapioEnterSpring,
  cardapioExitSpring,
  chromeSpring,
  experienciasSpring,
  pageExitSpring,
  pageSpring,
  SPRING_SETTLE_MS,
} from "@/lib/motion-presets";

export const pageVariants: Record<RouteTransitionGroup, Variants> = {
  site: {
    initial: { opacity: 0, scale: 0.992, y: 6 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: pageSpring,
    },
    exit: {
      opacity: 0,
      scale: 0.996,
      y: -4,
      transition: pageExitSpring,
    },
  },
  cardapio: {
    initial: { opacity: 0, scale: 0.986, y: 8 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: cardapioEnterSpring,
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      y: -4,
      transition: cardapioExitSpring,
    },
  },
  experiencias: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: experienciasSpring,
    },
    exit: {
      opacity: 0,
      transition: { ...experienciasSpring, stiffness: 520 },
    },
  },
};

export const chromeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { ...chromeSpring, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: chromeSpring,
  },
};

export function getPageMotion(group: RouteTransitionGroup) {
  return { variants: pageVariants[group] };
}

export function getRouteTransitionDuration(_group: RouteTransitionGroup): number {
  return SPRING_SETTLE_MS;
}
