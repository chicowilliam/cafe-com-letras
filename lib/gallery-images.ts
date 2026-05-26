import type { StaticImageData } from "next/image";

import img7 from "@/assets/images/7.jpg";
import img8 from "@/assets/images/8.jpg";
import img9 from "@/assets/images/9.jpg";
import img10 from "@/assets/images/10.jpg";
import img11 from "@/assets/images/11.jpg";
import img12 from "@/assets/images/12.jpg";
import img13 from "@/assets/images/13.jpg";
import img14 from "@/assets/images/14.jpg";
import img15 from "@/assets/images/15.jpg";
import img16 from "@/assets/images/16.jpg";
import img17 from "@/assets/images/17.jpg";
import img18 from "@/assets/images/18.jpg";
import img21 from "@/assets/images/21.jpg";
import img22 from "@/assets/images/22.jpg";
import img25 from "@/assets/images/25.jpg";
import img27 from "@/assets/images/27.jpg";
import img28 from "@/assets/images/28.jpg";
import img29 from "@/assets/images/29.jpg";
import img30 from "@/assets/images/30.jpg";
import img31 from "@/assets/images/31.jpg";
import img32 from "@/assets/images/32.jpg";
import img33 from "@/assets/images/33.jpg";
import img34 from "@/assets/images/34.jpg";
import img35 from "@/assets/images/35.jpg";
import img36 from "@/assets/images/36.jpg";
import img37 from "@/assets/images/37.jpg";
import img38 from "@/assets/images/38.jpg";
import img39 from "@/assets/images/39.jpg";
import img40 from "@/assets/images/40.jpg";
import img41 from "@/assets/images/41.jpg";
import img42 from "@/assets/images/42.jpg";

const GALLERY: StaticImageData[] = [
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img21,
  img22,
  img25,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
  img37,
  img38,
  img39,
  img40,
  img41,
  img42,
];

export const MARQUEE_IMAGES = GALLERY.map((src, index) => ({
  src,
  alt: `Café com Letras Savassi — foto ${index + 1}`,
}));
