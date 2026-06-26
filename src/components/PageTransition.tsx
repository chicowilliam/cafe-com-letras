import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { supportsViewTransitions } from "@/lib/navigation";

const FALLBACK_ENTER_MS = 620;

export function PageTransition() {
  const location = useLocation();
  const useFallback = !supportsViewTransitions();
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (!useFallback) return;

    setEntering(true);
    const timer = window.setTimeout(() => setEntering(false), FALLBACK_ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [location.pathname, useFallback]);

  const className = [
    "page-transition-root",
    useFallback && entering ? "page-transition-root--fallback-enter" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <Outlet />
    </div>
  );
}
