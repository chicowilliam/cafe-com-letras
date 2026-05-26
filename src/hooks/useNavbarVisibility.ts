import { useEffect, useRef, useState } from "react";

export function useNavbarVisibility() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY;

      if (currentY < 64) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 4) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}
