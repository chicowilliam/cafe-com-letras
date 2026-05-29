import completeImage from "@/assets/images/noite dos dates/Exemplo-noite-dos-dates-não-vegano.jpg";
import veganImage from "@/assets/images/noite dos dates/exemplo-noite-dos-dates-vegano.jpg";
import grs0207 from "@/assets/images/livraria/grs-0207.jpg";
import grs0209 from "@/assets/images/livraria/grs-0209.jpg";
import grs0223 from "@/assets/images/livraria/grs-0223.jpg";
import grs0249 from "@/assets/images/livraria/grs-0249.jpg";

import grs0207Thumb from "@/assets/images/livraria/thumbs/grs-0207.jpg";
import grs0209Thumb from "@/assets/images/livraria/thumbs/grs-0209.jpg";
import grs0223Thumb from "@/assets/images/livraria/thumbs/grs-0223.jpg";
import grs0234Thumb from "@/assets/images/livraria/thumbs/grs-0234.jpg";
import grs0249Thumb from "@/assets/images/livraria/thumbs/grs-0249.jpg";
import grs0256Thumb from "@/assets/images/livraria/thumbs/grs-0256.jpg";
import grs0265Thumb from "@/assets/images/livraria/thumbs/grs-0265.jpg";
import grs0267Thumb from "@/assets/images/livraria/thumbs/grs-0267.jpg";
import grs0270Thumb from "@/assets/images/livraria/thumbs/grs-0270.jpg";

const MARQUEE_SOURCES = [
  grs0207Thumb,
  grs0209Thumb,
  grs0223Thumb,
  grs0234Thumb,
  grs0249Thumb,
  grs0256Thumb,
  grs0265Thumb,
  grs0267Thumb,
  grs0270Thumb,
];

export const MARQUEE_IMAGES = MARQUEE_SOURCES.map((src, index) => ({
  src,
  alt: `Livraria Contraponto — foto ${index + 1}`,
}));

export const ABOUT_IMAGES = [grs0207, grs0209, grs0223] as const;

export const HERO_IMAGE = grs0249;

export const DATE_PACKAGE_IMAGES = {
  complete: completeImage,
  vegan: veganImage,
} as const;
