import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

export interface BackgroundPatternProps {
  variant?: "branch" | "leaf-cluster" | "vine";
  tone?: "dark" | "light";
  density?: "sparse" | "default" | "dense";
  className?: string;
}

const DENSITY_OPACITY = {
  sparse: 0.24,
  default: 0.38,
  dense: 0.52,
} as const;

function useIsCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

function BranchMotif() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path
        className="background-pattern__stem background-pattern__stem--olive"
        d="M 94 680 C 128 570 112 452 164 340 C 210 242 290 178 338 72"
      />
      <path
        className="background-pattern__stem"
        d="M 622 710 C 650 602 630 506 676 404 C 718 312 790 242 828 132"
      />
      <path
        className="background-pattern__stem background-pattern__stem--quiet"
        d="M 426 650 C 492 560 534 470 546 364 C 558 260 528 172 564 76"
      />

      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 170 340 C 104 314 78 264 94 208 C 154 216 200 260 214 326 C 198 318 184 310 166 304"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 220 240 C 196 174 220 116 278 84 C 314 132 306 196 252 244 C 244 230 234 216 220 202"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 132 512 C 76 474 64 414 96 364 C 152 386 184 438 172 506 C 160 496 148 486 132 478"
      />

      <path
        className="background-pattern__leaf"
        d="M 690 402 C 754 360 820 366 862 414 C 818 466 758 482 696 448 C 712 432 728 418 746 406"
      />
      <path
        className="background-pattern__leaf"
        d="M 670 560 C 732 532 792 548 824 602 C 774 638 714 638 668 590 C 684 580 700 570 718 562"
      />
      <path
        className="background-pattern__leaf"
        d="M 784 234 C 842 188 904 184 950 224 C 920 282 862 312 792 290 C 806 272 822 256 840 238"
      />

      <path
        className="background-pattern__vein"
        d="M 104 212 C 134 244 152 274 166 304 M 224 122 C 242 154 252 190 252 232 M 704 448 C 750 428 790 416 836 414 M 792 290 C 834 264 872 242 920 224"
      />
    </g>
  );
}

function LeafClusterMotif() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path
        className="background-pattern__stem"
        d="M 116 606 C 214 542 270 444 300 322 C 322 232 312 154 356 72"
      />
      <path
        className="background-pattern__stem background-pattern__stem--olive"
        d="M 862 78 C 790 160 746 250 742 356 C 738 470 790 560 764 682"
      />
      <path
        className="background-pattern__stem background-pattern__stem--quiet"
        d="M 456 688 C 420 590 426 490 474 390 C 516 302 588 236 626 142"
      />

      <path
        className="background-pattern__leaf"
        d="M 292 322 C 220 320 170 284 154 224 C 218 202 278 230 318 292 C 300 288 282 284 262 278"
      />
      <path
        className="background-pattern__leaf"
        d="M 314 224 C 262 170 260 106 306 58 C 366 92 388 150 354 216 C 340 204 328 190 314 174"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 228 470 C 156 454 112 406 108 342 C 176 334 230 374 254 444 C 236 438 220 430 202 420"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 748 354 C 804 300 872 292 926 332 C 896 398 838 436 760 418 C 774 396 792 376 812 356"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 770 516 C 838 496 900 524 926 590 C 862 620 800 600 764 542 C 784 536 802 530 824 526"
      />
      <path
        className="background-pattern__leaf"
        d="M 488 390 C 548 348 612 352 656 398 C 616 452 556 470 494 438 C 510 422 526 408 546 394"
      />
      <path
        className="background-pattern__leaf"
        d="M 448 552 C 504 520 562 532 596 584 C 546 624 488 618 448 570 C 464 562 480 556 498 550"
      />
      <path
        className="background-pattern__vein"
        d="M 164 224 C 208 246 248 270 304 292 M 306 58 C 326 104 342 148 350 202 M 762 418 C 814 394 858 366 910 334 M 764 542 C 818 552 864 566 912 590 M 494 438 C 540 416 580 402 640 398"
      />
    </g>
  );
}

function VineMotif() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path
        className="background-pattern__stem background-pattern__stem--olive"
        d="M 72 24 C 118 132 82 248 132 358 C 178 458 116 560 158 668 C 196 766 140 880 180 990 C 216 1090 164 1180 196 1280"
      />
      <path
        className="background-pattern__stem"
        d="M 928 18 C 874 120 910 238 860 340 C 812 438 878 550 834 654 C 790 758 844 860 802 962 C 768 1046 804 1158 764 1282"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 138 356 C 82 330 60 282 78 230 C 132 240 170 280 180 342 C 164 336 150 328 134 320"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 156 666 C 96 640 70 590 88 536 C 146 546 188 590 196 654 C 180 648 166 640 148 630"
      />
      <path
        className="background-pattern__leaf background-pattern__leaf--olive"
        d="M 178 990 C 116 962 94 910 116 856 C 174 870 214 918 218 982 C 202 974 188 966 170 956"
      />
      <path
        className="background-pattern__leaf"
        d="M 858 340 C 916 304 976 312 1014 360 C 972 410 914 424 856 390 C 872 374 888 360 906 348"
      />
      <path
        className="background-pattern__leaf"
        d="M 834 654 C 894 626 952 644 982 698 C 932 734 874 726 834 678 C 850 670 866 662 884 656"
      />
      <path
        className="background-pattern__leaf"
        d="M 802 962 C 860 930 920 942 954 994 C 904 1034 846 1030 802 982 C 818 974 834 968 854 960"
      />
      <path
        className="background-pattern__vein"
        d="M 84 232 C 116 260 138 288 150 320 M 90 538 C 124 572 146 602 160 632 M 858 390 C 902 370 944 360 996 360 M 836 678 C 882 684 924 690 966 698"
      />
    </g>
  );
}

function PatternSvg({ variant }: { variant: NonNullable<BackgroundPatternProps["variant"]> }) {
  const viewBox = variant === "vine" ? "0 0 1000 1300" : "0 0 1000 760";

  return (
    <svg
      className="background-pattern__svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {variant === "branch" ? <BranchMotif /> : null}
      {variant === "leaf-cluster" ? <LeafClusterMotif /> : null}
      {variant === "vine" ? <VineMotif /> : null}
    </svg>
  );
}

export function BackgroundPattern({
  variant = "branch",
  tone = "dark",
  density = "default",
  className = "",
}: BackgroundPatternProps) {
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompactViewport();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || isCompact ? ["0%", "0%"] : ["0%", "20%"],
  );
  const style = {
    "--bg-pattern-opacity": String(DENSITY_OPACITY[density]),
  } as CSSProperties;

  return (
    <m.div
      className={`background-pattern background-pattern--${tone} background-pattern--${variant}${className ? ` ${className}` : ""}`}
      style={{ ...style, y: parallaxY }}
      aria-hidden
    >
      <PatternSvg variant={variant} />
      <div className="background-pattern__veil" />
    </m.div>
  );
}
