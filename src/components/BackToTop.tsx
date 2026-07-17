import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`focus-ring fixed z-40 left-[max(1rem,env(safe-area-inset-left))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-elevated p-0 text-foreground shadow-contact transition-[transform,opacity] duration-300 ease-out hover:border-accent/35 hover:text-accent active:scale-[0.97] motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
