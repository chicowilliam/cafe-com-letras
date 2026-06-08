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
