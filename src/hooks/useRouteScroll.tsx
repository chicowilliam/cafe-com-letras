import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

type RouteScrollContextValue = {
  onPageEnterComplete: () => void;
};

const RouteScrollContext = createContext<RouteScrollContextValue | null>(null);

function scrollForLocation(pathname: string, hash: string) {
  if (pathname === "/" && hash) {
    const id = hash.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function RouteScrollProvider({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const reduceMotion = useReducedMotion();
  const pendingScrollRef = useRef(false);

  const performScroll = useCallback(() => {
    scrollForLocation(pathname, hash);
  }, [pathname, hash]);

  useEffect(() => {
    if (reduceMotion) {
      performScroll();
      pendingScrollRef.current = false;
      return;
    }
    pendingScrollRef.current = true;
  }, [pathname, hash, reduceMotion, performScroll]);

  const onPageEnterComplete = useCallback(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    performScroll();
  }, [performScroll]);

  return (
    <RouteScrollContext.Provider value={{ onPageEnterComplete }}>
      {children}
    </RouteScrollContext.Provider>
  );
}

export function useRouteScrollOnEnter() {
  const context = useContext(RouteScrollContext);
  if (!context) {
    throw new Error("useRouteScrollOnEnter must be used within RouteScrollProvider");
  }
  return context.onPageEnterComplete;
}
