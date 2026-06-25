import { useEffect, useState } from "react";

const HEADER_OFFSET_PX = 80;

export function useCardapioSectionSpy(
  sectionIds: string[],
  enabled: boolean,
): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const nearest = visible.sort((a, b) => {
          const aDistance = Math.abs(
            a.boundingClientRect.top - HEADER_OFFSET_PX,
          );
          const bDistance = Math.abs(
            b.boundingClientRect.top - HEADER_OFFSET_PX,
          );
          return aDistance - bDistance;
        })[0];

        if (nearest?.target.id) {
          setActiveId(nearest.target.id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  useEffect(() => {
    if (sectionIds[0]) {
      setActiveId(sectionIds[0]);
    }
  }, [sectionIds]);

  return activeId;
}
