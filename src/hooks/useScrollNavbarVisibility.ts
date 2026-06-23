import { useEffect, useRef, useState } from "react";

type UseScrollNavbarVisibilityOptions = {
  idleMs?: number;
  threshold?: number;
  topOffset?: number;
  enabled?: boolean;
  /** When true, navbar stays visible (e.g. mobile menu open). */
  pinned?: boolean;
};

const SCROLL_END_DEBOUNCE_MS = 150;

export function useScrollNavbarVisibility({
  idleMs = 4000,
  threshold = 10,
  topOffset = 64,
  enabled = true,
  pinned = false,
}: UseScrollNavbarVisibilityOptions = {}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clearIdleTimer = () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    const clearScrollEndTimer = () => {
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
        scrollEndTimer.current = null;
      }
    };

    const scheduleIdleHide = () => {
      if (prefersReducedMotion.current || pinned) return;
      clearIdleTimer();
      idleTimer.current = setTimeout(() => {
        if (window.scrollY >= topOffset) {
          setVisible(false);
        }
      }, idleMs);
    };

    const scheduleIdleAfterScrollEnd = () => {
      if (prefersReducedMotion.current || pinned) return;
      clearScrollEndTimer();
      scrollEndTimer.current = setTimeout(() => {
        if (window.scrollY >= topOffset) {
          scheduleIdleHide();
        }
      }, SCROLL_END_DEBOUNCE_MS);
    };

    const update = () => {
      if (pinned) {
        setVisible(true);
        clearIdleTimer();
        clearScrollEndTimer();
        lastScrollY.current = window.scrollY;
        ticking.current = false;
        return;
      }

      const currentY = window.scrollY;

      if (currentY < topOffset) {
        setVisible(true);
        clearIdleTimer();
      } else if (currentY > lastScrollY.current + threshold) {
        setVisible(false);
        clearIdleTimer();
      } else if (currentY < lastScrollY.current - threshold) {
        setVisible(true);
        clearIdleTimer();
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      clearIdleTimer();

      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        update();
        scheduleIdleAfterScrollEnd();
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdleTimer();
      clearScrollEndTimer();
    };
  }, [enabled, idleMs, pinned, threshold, topOffset]);

  if (!enabled) {
    return true;
  }

  return pinned ? true : visible;
}
