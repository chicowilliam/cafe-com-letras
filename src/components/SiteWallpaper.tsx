/** Papel de parede contínuo da home — motivos distintos ao longo do scroll. */
export function SiteWallpaper() {
  return (
    <svg
      className="site-wallpaper"
      viewBox="0 0 800 4200"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
    >
      {/* Zona hero — quase silenciosa */}
      <g className="site-wallpaper__motif site-wallpaper__motif--hero">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 760 40 C 748 90 752 150 740 210"
        />
      </g>

      {/* Hoje / Dates — videira íntima + thorns */}
      <g className="site-wallpaper__motif site-wallpaper__motif--dates">
        <path
          className="site-wallpaper__stroke"
          d="M 720 320 C 700 400 708 490 688 580 C 672 650 678 720 662 800"
        />
        <path className="site-wallpaper__thorn" d="M 688 580 L 702 570 M 688 580 L 698 590" />
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 48 420 C 72 440 88 470 96 510 C 104 550 96 590 78 630"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 96 510 L 86 500 M 96 510 L 88 518"
        />
        <path className="site-wallpaper__flourish" d="M 36 560 C 60 554 80 558 100 566" />
        <path className="site-wallpaper__flourish" d="M 36 576 C 58 570 78 574 96 580" />
      </g>

      {/* Cardápio / Delivery — folha + curva de xícara */}
      <g className="site-wallpaper__motif site-wallpaper__motif--mesa">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 120 980 C 160 960 210 968 240 1000 C 260 1022 258 1050 236 1070 C 200 1100 150 1090 120 1060 C 100 1042 102 1004 120 980 Z"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 680 920 C 700 960 708 1010 698 1060 C 690 1100 670 1130 640 1155"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 620 1080 C 660 1070 700 1078 730 1100 C 748 1114 752 1136 738 1150 C 710 1174 660 1168 620 1145"
        />
        <path className="site-wallpaper__flourish" d="M 700 1180 C 724 1174 744 1178 764 1186" />
      </g>

      {/* Curadoria — ramos oliva abertos */}
      <g className="site-wallpaper__motif site-wallpaper__motif--curadoria">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 60 1380 C 90 1420 100 1480 88 1540 C 78 1590 50 1630 20 1660"
        />
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 100 1460 C 130 1475 155 1505 165 1545"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 740 1420 C 720 1480 725 1550 710 1620 C 698 1680 680 1730 655 1775"
        />
        <path className="site-wallpaper__thorn" d="M 710 1620 L 724 1610 M 710 1620 L 720 1630" />
        <ellipse
          className="site-wallpaper__leaf"
          cx="150"
          cy="1510"
          rx="14"
          ry="7"
          transform="rotate(-28 150 1510)"
        />
        <ellipse
          className="site-wallpaper__leaf"
          cx="78"
          cy="1575"
          rx="12"
          ry="6"
          transform="rotate(18 78 1575)"
        />
      </g>

      {/* Programação — pauta/clave em faixa vertical ampla (altura variável da home) */}
      <g className="site-wallpaper__motif site-wallpaper__motif--musica">
        <path className="site-wallpaper__staff" d="M 500 1720 C 545 1712 590 1716 635 1728" />
        <path className="site-wallpaper__staff" d="M 500 1740 C 545 1732 590 1736 635 1748" />
        <path className="site-wallpaper__staff" d="M 500 1760 C 545 1752 590 1756 635 1768" />
        <path
          className="site-wallpaper__clef"
          d="M 642 1710 C 634 1735 634 1760 642 1785 C 650 1760 650 1735 642 1710 C 646 1725 654 1738 666 1748"
        />
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 55 1680 C 85 1730 98 1800 88 1870 C 80 1920 58 1965 28 2005"
        />

        <path className="site-wallpaper__staff" d="M 520 1980 C 560 1972 600 1976 640 1988" />
        <path className="site-wallpaper__staff" d="M 520 2000 C 560 1992 600 1996 640 2008" />
        <path className="site-wallpaper__staff" d="M 520 2020 C 560 2012 600 2016 640 2028" />
        <path className="site-wallpaper__staff" d="M 520 2040 C 560 2032 600 2036 640 2048" />
        <path
          className="site-wallpaper__clef"
          d="M 648 1970 C 640 1995 640 2020 648 2045 C 656 2020 656 1995 648 1970 C 652 1985 660 1998 672 2008"
        />
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 70 1920 C 95 1960 105 2020 95 2080 C 88 2120 70 2155 45 2185"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="300"
          cy="2100"
          rx="11"
          ry="6"
          transform="rotate(22 300 2100)"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="322"
          cy="2126"
          rx="11"
          ry="6"
          transform="rotate(22 322 2126)"
        />
        <ellipse
          className="site-wallpaper__chain"
          cx="344"
          cy="2152"
          rx="11"
          ry="6"
          transform="rotate(22 344 2152)"
        />

        <path className="site-wallpaper__staff" d="M 90 2280 C 135 2272 180 2276 225 2288" />
        <path className="site-wallpaper__staff" d="M 90 2300 C 135 2292 180 2296 225 2308" />
        <path className="site-wallpaper__staff" d="M 90 2320 C 135 2312 180 2316 225 2328" />
        <path
          className="site-wallpaper__clef"
          d="M 232 2270 C 224 2295 224 2320 232 2345 C 240 2320 240 2295 232 2270 C 236 2285 244 2298 256 2308"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 740 2220 C 720 2280 728 2350 712 2420 C 700 2475 678 2525 650 2565"
        />
        <path className="site-wallpaper__flourish" d="M 680 2480 C 704 2474 724 2478 744 2486" />
      </g>

      {/* História — leve (About já tem ornamento local) */}
      <g className="site-wallpaper__motif site-wallpaper__motif--arquivo">
        <path
          className="site-wallpaper__stroke"
          d="M 760 2480 C 740 2560 748 2650 728 2740"
        />
        <path className="site-wallpaper__flourish" d="M 40 2620 C 68 2614 90 2618 112 2628" />
        <path className="site-wallpaper__flourish" d="M 40 2636 C 64 2630 86 2634 106 2642" />
      </g>

      {/* Galeria — flourishes abertos / moldura */}
      <g className="site-wallpaper__motif site-wallpaper__motif--galeria">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 80 3020 C 40 3080 50 3160 90 3220 C 120 3265 170 3280 210 3260"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 720 2980 C 760 3040 750 3120 710 3180 C 680 3225 630 3240 590 3220"
        />
        <path className="site-wallpaper__flourish" d="M 560 3300 C 600 3288 640 3292 680 3310" />
        <path className="site-wallpaper__flourish" d="M 120 3310 C 160 3298 200 3302 240 3320" />
      </g>

      {/* Visite / Footer — caminhos + canto */}
      <g className="site-wallpaper__motif site-wallpaper__motif--visite">
        <path
          className="site-wallpaper__stroke site-wallpaper__stroke--accent-2"
          d="M 400 3520 C 440 3540 470 3580 480 3630 C 488 3670 478 3710 455 3745"
        />
        <path
          className="site-wallpaper__thorn site-wallpaper__thorn--accent-2"
          d="M 480 3630 L 492 3620 M 480 3630 L 490 3638"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 60 3680 C 100 3700 130 3740 145 3790 C 155 3830 148 3870 125 3905"
        />
        <path
          className="site-wallpaper__stroke"
          d="M 740 3780 C 710 3820 700 3880 710 3940 C 718 3985 740 4020 770 4045"
        />
        <path className="site-wallpaper__flourish" d="M 36 4000 C 60 3994 80 3998 100 4006" />
        <circle className="site-wallpaper__node" cx="400" cy="3520" r="3.5" />
      </g>
    </svg>
  );
}
