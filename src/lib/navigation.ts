import type { NavigateFunction, NavigateOptions, To } from "react-router-dom";

export const viewTransitionNavigateOptions = {
  viewTransition: true,
} as const satisfies NavigateOptions;
