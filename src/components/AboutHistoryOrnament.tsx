type AboutHistoryOrnamentProps = {
  variant: "media" | "story";
};

/** Ornamento editorial — cipó, elos e pauta nos vazios da História. */
export function AboutHistoryOrnament({ variant }: AboutHistoryOrnamentProps) {
  if (variant === "story") {
    return (
      <svg
        className="about-history-ornament about-history-ornament--story"
        viewBox="0 0 400 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g className="about-history-ornament__vine">
          <path
            className="about-history-ornament__stem"
            d="M 368 12 C 352 88 358 168 342 248 C 326 328 334 408 318 488 C 306 548 298 608 292 668 C 286 720 278 760 270 800"
          />
          <path className="about-history-ornament__thorn" d="M 342 248 L 356 238 M 342 248 L 352 258" />
          <path className="about-history-ornament__thorn" d="M 318 488 L 332 478 M 318 488 L 328 498" />
          <path
            className="about-history-ornament__stem about-history-ornament__stem--accent-2"
            d="M 318 320 C 268 310 228 328 198 352 C 168 376 148 402 132 428"
          />
          <path className="about-history-ornament__thorn about-history-ornament__thorn--accent-2" d="M 228 328 L 218 318 M 228 328 L 220 336" />
          <path
            className="about-history-ornament__stem about-history-ornament__stem--accent-2"
            d="M 48 140 C 72 152 88 172 96 198 C 104 224 98 252 82 276"
          />
          <path className="about-history-ornament__thorn about-history-ornament__thorn--accent-2" d="M 96 198 L 86 188 M 96 198 L 88 206" />
        </g>

        <g className="about-history-ornament__chain">
          <ellipse cx="312" cy="88" rx="11" ry="6" transform="rotate(24 312 88)" />
          <ellipse cx="334" cy="112" rx="11" ry="6" transform="rotate(24 334 112)" />
          <ellipse cx="356" cy="136" rx="11" ry="6" transform="rotate(24 356 136)" />
          <ellipse cx="348" cy="568" rx="10" ry="5.5" transform="rotate(-18 348 568)" />
          <ellipse cx="328" cy="592" rx="10" ry="5.5" transform="rotate(-18 328 592)" />
        </g>

        <g className="about-history-ornament__staff">
          <path d="M 286 620 C 312 616 332 618 352 622" />
          <path d="M 286 632 C 312 628 332 630 352 634" />
          <path d="M 286 644 C 312 640 332 642 352 646" />
          <path
            className="about-history-ornament__clef"
            d="M 356 614 C 352 626 352 638 356 650 C 360 638 360 626 356 614 C 358 622 362 628 368 632"
          />
        </g>

        <g className="about-history-ornament__flourish">
          <path d="M 24 248 C 52 244 72 248 92 254" />
          <path d="M 24 256 C 48 252 68 256 86 260" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className="about-history-ornament about-history-ornament--media"
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g className="about-history-ornament__vine">
        <path
          className="about-history-ornament__stem about-history-ornament__stem--accent-2"
          d="M 318 18 C 348 28 372 48 386 72 C 394 88 392 108 382 124"
        />
        <path className="about-history-ornament__thorn about-history-ornament__thorn--accent-2" d="M 386 72 L 396 64 M 386 72 L 394 80" />
      </g>
    </svg>
  );
}
