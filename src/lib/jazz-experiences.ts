import imgJazz from "@/assets/images/livraria/grs-0223.jpg";
import imgPiano from "@/assets/images/livraria/grs-0207.jpg";

export const JAZZ_EXPERIENCES = [
  {
    id: "jazz-experience",
    title: "Jazz Experience",
    subtitle: "Toda semana · Palco principal",
    description:
      "Jazz ao vivo toda semana. Trios, quartetos e convidados especiais em um ambiente íntimo e acolhedor.",
    badge: "Jazz ao vivo",
    image: imgJazz,
    imageAlt: "Músicos de jazz se apresentando no Café com Letras",
    highlights: ["Trios e quartetos", "Convidados especiais", "Ambiente íntimo"],
  },
  {
    id: "jazz-lovers",
    title: "Para Amantes de Jazz",
    subtitle: "Experiência VIP · Meet & greet",
    description:
      "Uma experiência imersiva de jazz. Lugar VIP com vista para o palco, coquetel de boas-vindas, harmonização de vinhos com petiscos artesanais e meet & greet com os músicos.",
    badge: "Experiência VIP",
    image: imgPiano,
    imageAlt: "Ambiente acolhedor do Café com Letras durante apresentação de jazz",
    highlights: ["Lugar VIP", "Harmonização de vinhos", "Meet & greet"],
  },
] as const;
