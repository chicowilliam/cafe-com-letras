import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useRouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduceMotion = prefersReducedMotion();
    const behavior: ScrollBehavior = reduceMotion ? "instant" : "smooth";

    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash]);
}
