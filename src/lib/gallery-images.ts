import grs0207 from "@/assets/images/livraria/grs-0207.jpg";
import grs0209 from "@/assets/images/livraria/grs-0209.jpg";
import grs0223 from "@/assets/images/livraria/grs-0223.jpg";
import grs0234 from "@/assets/images/livraria/grs-0234.jpg";
import grs0249 from "@/assets/images/livraria/grs-0249.jpg";
import grs0256 from "@/assets/images/livraria/grs-0256.jpg";
import grs0265 from "@/assets/images/livraria/grs-0265.jpg";
import grs0267 from "@/assets/images/livraria/grs-0267.jpg";
import grs0270 from "@/assets/images/livraria/grs-0270.jpg";

const GALLERY: string[] = [
  grs0207,
  grs0209,
  grs0223,
  grs0234,
  grs0249,
  grs0256,
  grs0265,
  grs0267,
  grs0270,
];

export const MARQUEE_IMAGES = GALLERY.map((src, index) => ({
  src,
  alt: `Livraria Contraponto — foto ${index + 1}`,
}));
