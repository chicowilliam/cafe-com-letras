import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useRef } from "react";

const TWEEN_FACTOR_BASE = 0.52;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useEmblaSlideTween(
  emblaApi: EmblaCarouselType | undefined,
  reduceMotion: boolean,
) {
  const tweenFactor = useRef(TWEEN_FACTOR_BASE);

  useEffect(() => {
    if (!emblaApi || reduceMotion) return;

    const setTweenFactor = () => {
      tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    };

    const tweenSlides = () => {
      const scrollProgress = emblaApi.scrollProgress();
      const snapList = emblaApi.scrollSnapList();

      emblaApi.slideNodes().forEach((slideNode, slideIndex) => {
        const diffToTarget = snapList[slideIndex] - scrollProgress;
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = clamp(0.96 + tweenValue * 0.04, 0.96, 1);
        const opacity = clamp(0.78 + tweenValue * 0.22, 0.78, 1);
        slideNode.style.transform = `scale(${scale})`;
        slideNode.style.opacity = `${opacity}`;
      });
    };

    setTweenFactor();
    emblaApi.on("reInit", setTweenFactor);
    emblaApi.on("scroll", tweenSlides);
    emblaApi.on("slideFocus", tweenSlides);
    tweenSlides();

    return () => {
      emblaApi.off("reInit", setTweenFactor);
      emblaApi.off("scroll", tweenSlides);
      emblaApi.off("slideFocus", tweenSlides);
      emblaApi.slideNodes().forEach((node) => {
        node.style.transform = "";
        node.style.opacity = "";
      });
    };
  }, [emblaApi, reduceMotion]);
}
