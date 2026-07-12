/** Papel de parede contínuo — motivos densos nas laterais, ao longo de toda a home. */
export function SiteWallpaper() {
  return (
    <svg
      className="site-wallpaper"
      viewBox="0 0 800 4800"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
    >
      {/* Hero — mínimo */}
      <g className="site-wallpaper__motif site-wallpaper__motif--hero">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 770 30 C 755 110 760 200 748 290"
        />
      </g>

      {/* Faixa contínua esquerda (oliva) */}
      <g className="site-wallpaper__motif site-wallpaper__motif--rail-left">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 36 280 C 70 360 78 460 58 560 C 40 650 55 740 78 830 C 100 920 88 1010 55 1100 C 28 1180 40 1270 70 1360 C 98 1450 85 1540 52 1630 C 24 1710 42 1800 75 1890 C 105 1980 90 2070 55 2160 C 26 2240 45 2330 78 2420 C 108 2510 92 2600 58 2690 C 28 2770 48 2860 80 2950 C 110 3040 95 3130 60 3220 C 30 3300 50 3390 82 3480 C 112 3570 96 3660 62 3750 C 32 3830 52 3920 85 4010 C 115 4100 98 4190 65 4280 C 38 4350 55 4430 78 4500"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 58 560 L 48 550 M 58 560 L 50 568"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 55 1100 L 45 1090 M 55 1100 L 47 1108"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 52 1630 L 42 1620 M 52 1630 L 44 1638"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 55 2160 L 45 2150 M 55 2160 L 47 2168"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 58 2690 L 48 2680 M 58 2690 L 50 2698"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 60 3220 L 50 3210 M 60 3220 L 52 3228"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 62 3750 L 52 3740 M 62 3750 L 54 3758"
        />
        <ellipse
          className="site-wallpaper__leaf"
          cx="88"
          cy="900"
          rx="13"
          ry="6"
          transform="rotate(-24 88 900)"
        />
        <ellipse
          className="site-wallpaper__leaf"
          cx="72"
          cy="1850"
          rx="12"
          ry="6"
          transform="rotate(16 72 1850)"
        />
        <ellipse
          className="site-wallpaper__leaf"
          cx="90"
          cy="2910"
          rx="13"
          ry="6"
          transform="rotate(-20 90 2910)"
        />
        <ellipse
          className="site-wallpaper__leaf"
          cx="78"
          cy="3970"
          rx="12"
          ry="6"
          transform="rotate(18 78 3970)"
        />
      </g>

      {/* Faixa contínua direita (dourado) */}
      <g className="site-wallpaper__motif site-wallpaper__motif--rail-right">
        <path
          className="site-wallpaper__stroke"
          d="M 764 260 C 738 350 745 450 762 550 C 778 650 760 740 732 830 C 706 920 722 1010 755 1100 C 782 1185 768 1275 735 1365 C 706 1455 722 1545 755 1635 C 784 1720 768 1810 735 1900 C 706 1990 724 2080 758 2170 C 786 2255 770 2345 736 2435 C 708 2525 726 2615 760 2705 C 788 2790 770 2880 736 2970 C 708 3060 726 3150 760 3240 C 788 3325 772 3415 738 3505 C 710 3595 728 3685 762 3775 C 790 3860 772 3950 738 4040 C 710 4130 728 4220 760 4310 C 782 4380 768 4450 748 4520"
        />
        <path className="site-wallpaper__thorn" d="M 762 550 L 776 540 M 762 550 L 772 560" />
        <path className="site-wallpaper__thorn" d="M 755 1100 L 769 1090 M 755 1100 L 765 1110" />
        <path className="site-wallpaper__thorn" d="M 755 1635 L 769 1625 M 755 1635 L 765 1645" />
        <path className="site-wallpaper__thorn" d="M 758 2170 L 772 2160 M 758 2170 L 768 2180" />
        <path className="site-wallpaper__thorn" d="M 760 2705 L 774 2695 M 760 2705 L 770 2715" />
        <path className="site-wallpaper__thorn" d="M 760 3240 L 774 3230 M 760 3240 L 770 3250" />
        <path className="site-wallpaper__thorn" d="M 762 3775 L 776 3765 M 762 3775 L 772 3785" />
        <path className="site-wallpaper__flourish" d="M 680 700 C 710 692 735 698 760 710" />
        <path className="site-wallpaper__flourish" d="M 680 701 C 705 694 730 700 752 710" />
        <path className="site-wallpaper__flourish" d="M 690 1600 C 720 1592 745 1598 770 1610" />
        <path className="site-wallpaper__flourish" d="M 690 2500 C 720 2492 745 2498 770 2510" />
        <path className="site-wallpaper__flourish" d="M 690 3400 C 720 3392 745 3398 770 3410" />
        <path className="site-wallpaper__flourish" d="M 690 4300 C 720 4292 745 4298 770 4310" />
      </g>

      {/* Gestos pontuais — mesa / música / moldura (variedade, não só trilho) */}
      <g className="site-wallpaper__motif site-wallpaper__motif--mesa">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 140 980 C 180 958 230 966 260 1000 C 280 1024 276 1054 252 1074 C 214 1104 162 1092 140 1060 C 122 1040 124 1002 140 980 Z"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 620 1120 C 660 1110 700 1118 730 1140 C 748 1154 752 1176 738 1190 C 710 1214 660 1208 620 1185"
        />
      </g>

      <g className="site-wallpaper__motif site-wallpaper__motif--musica">
        <path className="site-wallpaper__staff" d="M 300 2050 C 345 2042 390 2046 435 2058" />
        <path className="site-wallpaper__staff" d="M 300 2070 C 345 2062 390 2066 435 2078" />
        <path className="site-wallpaper__staff" d="M 300 2090 C 345 2082 390 2086 435 2098" />
        <path
          className="site-wallpaper__clef"
          d="M 442 2040 C 434 2065 434 2090 442 2115 C 450 2090 450 2065 442 2040 C 446 2055 454 2068 466 2078"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="250"
          cy="2180"
          rx="11"
          ry="6"
          transform="rotate(22 250 2180)"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="272"
          cy="2206"
          rx="11"
          ry="6"
          transform="rotate(22 272 2206)"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="294"
          cy="2232"
          rx="11"
          ry="6"
          transform="rotate(22 294 2232)"
        />
      </g>

      <g className="site-wallpaper__motif site-wallpaper__motif--galeria">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 120 3180 C 80 3240 90 3320 130 3380"
        />
        <path className="site-wallpaper__stroke" d="M 680 3160 C 720 3220 710 3300 670 3360" />
        <path className="site-wallpaper__flourish" d="M 150 3420 C 190 3408 230 3412 270 3430" />
        <path className="site-wallpaper__flourish" d="M 530 3420 C 570 3408 610 3412 650 3430" />
      </g>

      <g className="site-wallpaper__motif site-wallpaper__motif--visite">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 400 3920 C 440 3940 470 3980 480 4030 C 488 4070 478 4110 455 4145"
        />
        <circle className="site-wallpaper__node" cx="400" cy="3920" r="3.5" />
        <path className="site-wallpaper__flourish" d="M 40 4580 C 70 4572 95 4578 120 4590" />
      </g>
    </svg>
  );
}
