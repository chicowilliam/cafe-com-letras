import { useEffect } from "react";

const SCROLL_IDLE_MS = 800;

export function useScrollingClass() {
  useEffect(() => {
    let timeoutId = 0;

    const onScroll = () => {
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, SCROLL_IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeoutId);
      document.documentElement.classList.remove("is-scrolling");
    };
  }, []);
}
