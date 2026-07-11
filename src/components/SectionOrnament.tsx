type SectionOrnamentVariant =
  | "home"
  | "today"
  | "dates"
  | "experiencias"
  | "programacao"
  | "curadoria"
  | "visite"
  | "editorial"
  | "silent";

type SectionOrnamentProps = {
  variant: SectionOrnamentVariant;
  className?: string;
};

export function SectionOrnament({ variant, className = "" }: SectionOrnamentProps) {
  const baseClass = "section-ornament";
  const variantClass = `${baseClass}--${variant}`;

  if (variant === "silent") return null;

  switch (variant) {
    case "home":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem`}
              d="M 560 20 C 540 80 548 160 530 240 C 512 320 520 400 502 480"
            />
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 40 120 C 60 132 76 152 84 178 C 92 204 86 232 70 256"
            />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 200 C 48 196 68 200 88 206" />
            <path d="M 512 180 C 536 176 556 180 576 186" />
          </g>
        </svg>
      );

    case "today":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 30 60 C 50 70 65 85 75 110 C 85 135 80 160 65 180"
            />
          </g>
        </svg>
      );

    case "dates":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem`}
              d="M 560 20 C 540 80 548 160 530 240 C 512 320 520 400 502 480"
            />
            <path className={`${baseClass}__thorn`} d="M 530 240 L 544 230 M 530 240 L 540 250" />
            <path className={`${baseClass}__thorn`} d="M 502 480 L 516 470 M 502 480 L 512 490" />
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 40 120 C 60 132 76 152 84 178 C 92 204 86 232 70 256"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 84 178 L 74 168 M 84 178 L 76 186" />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 200 C 48 196 68 200 88 206" />
            <path d="M 24 216 C 48 212 68 216 86 220" />
            <path d="M 512 180 C 536 176 556 180 576 186" />
            <path d="M 512 220 C 536 216 556 220 576 226" />
          </g>
        </svg>
      );

    case "experiencias":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem`}
              d="M 560 20 C 540 80 548 160 530 240 C 512 320 520 400 502 480"
            />
            <path className={`${baseClass}__thorn`} d="M 530 240 L 544 230 M 530 240 L 540 250" />
            <path className={`${baseClass}__thorn`} d="M 502 480 L 516 470 M 502 480 L 512 490" />
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 318 320 C 268 310 228 328 198 352 C 168 376 148 402 132 428"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 228 328 L 218 318 M 228 328 L 220 336" />
          </g>
          <g className={`${baseClass}__chain`}>
            <ellipse cx="312" cy="88" rx="11" ry="6" transform="rotate(24 312 88)" />
            <ellipse cx="334" cy="112" rx="11" ry="6" transform="rotate(24 334 112)" />
            <ellipse cx="356" cy="136" rx="11" ry="6" transform="rotate(24 356 136)" />
            <ellipse cx="348" cy="568" rx="10" ry="5.5" transform="rotate(-18 348 568)" />
            <ellipse cx="328" cy="592" rx="10" ry="5.5" transform="rotate(-18 328 592)" />
          </g>
        </svg>
      );

    case "programacao":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 30 60 C 50 70 65 85 75 110 C 85 135 80 160 65 180"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 75 110 L 65 100 M 75 110 L 67 118" />
            <path
              className={`${baseClass}__stem`}
              d="M 570 340 C 550 350 535 365 525 390 C 515 415 520 440 505 460"
            />
          </g>
          <g className={`${baseClass}__staff`}>
            <path d="M 286 220 C 312 216 332 218 352 222" />
            <path d="M 286 232 C 312 228 332 230 352 234" />
            <path d="M 286 244 C 312 240 332 242 352 246" />
            <path
              className={`${baseClass}__clef`}
              d="M 356 214 C 352 226 352 238 356 250 C 360 238 360 226 356 214 C 358 222 362 228 368 232"
            />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 200 C 48 196 68 200 88 206" />
          </g>
        </svg>
      );

    case "curadoria":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 48 140 C 72 152 88 172 96 198 C 104 224 98 252 82 276"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 96 198 L 86 188 M 96 198 L 88 206" />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 280 C 48 276 68 280 88 286" />
            <path d="M 512 120 C 536 116 556 120 576 126" />
          </g>
        </svg>
      );

    case "visite":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 318 18 C 348 28 372 48 386 72 C 394 88 392 108 382 124"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 386 72 L 396 64 M 386 72 L 394 80" />
            <path
              className={`${baseClass}__stem`}
              d="M 560 380 C 540 388 548 408 530 428 C 512 448 520 468 502 488"
            />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 380 C 48 376 68 380 88 386" />
          </g>
        </svg>
      );

    case "editorial":
      return (
        <svg
          className={`${baseClass} ${variantClass}`}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className={`${baseClass}__vine`}>
            <path
              className={`${baseClass}__stem`}
              d="M 560 20 C 540 80 548 160 530 240 C 512 320 520 400 502 480"
            />
            <path className={`${baseClass}__thorn`} d="M 530 240 L 544 230 M 530 240 L 540 250" />
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 318 320 C 268 310 228 328 198 352 C 168 376 148 402 132 428"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 228 328 L 218 318 M 228 328 L 220 336" />
            <path
              className={`${baseClass}__stem ${baseClass}__stem--accent-2`}
              d="M 48 140 C 72 152 88 172 96 198 C 104 224 98 252 82 276"
            />
            <path className={`${baseClass}__thorn ${baseClass}__thorn--accent-2`} d="M 96 198 L 86 188 M 96 198 L 88 206" />
          </g>
          <g className={`${baseClass}__chain`}>
            <ellipse cx="312" cy="88" rx="11" ry="6" transform="rotate(24 312 88)" />
            <ellipse cx="334" cy="112" rx="11" ry="6" transform="rotate(24 334 112)" />
            <ellipse cx="356" cy="136" rx="11" ry="6" transform="rotate(24 356 136)" />
            <ellipse cx="348" cy="568" rx="10" ry="5.5" transform="rotate(-18 348 568)" />
            <ellipse cx="328" cy="592" rx="10" ry="5.5" transform="rotate(-18 328 592)" />
          </g>
          <g className={`${baseClass}__staff`}>
            <path d="M 286 620 C 312 616 332 618 352 622" />
            <path d="M 286 632 C 312 628 332 630 352 634" />
            <path d="M 286 644 C 312 640 332 642 352 646" />
            <path
              className={`${baseClass}__clef`}
              d="M 356 614 C 352 626 352 638 356 650 C 360 638 360 626 356 614 C 358 622 362 628 368 632"
            />
          </g>
          <g className={`${baseClass}__flourish`}>
            <path d="M 24 248 C 52 244 72 248 92 254" />
            <path d="M 24 256 C 48 252 68 256 86 260" />
            <path d="M 512 180 C 536 176 556 180 576 186" />
            <path d="M 512 220 C 536 216 556 220 576 226" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}