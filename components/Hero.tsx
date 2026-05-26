"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=85"
        alt="Interior elegante do Café com Letras"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#12110f]/70 via-[#12110f]/55 to-[#12110f]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center md:px-10">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-accent"
        >
          Savassi · Belo Horizonte
        </motion.p>

        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-5xl leading-[1.05] tracking-tight text-[#f5f0e6] md:text-7xl lg:text-8xl"
        >
          Onde cultura,
          <br />
          <span className="italic text-accent">literatura</span> e gastronomia
          <br />
          se encontram
        </motion.h1>

        <motion.div
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto my-10 flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-[#12110f]/40 backdrop-blur-sm md:my-12 md:h-24 md:w-24"
          aria-hidden="true"
        >
          <span className="font-serif text-2xl text-accent md:text-3xl">CL</span>
        </motion.div>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.a
            href="#sobre"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ willChange: "transform" }}
            className="group inline-flex items-center gap-3 rounded-full border border-[#f5f0e6]/20 bg-[#f5f0e6]/5 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f0e6] backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
          >
            AGENDAR EXPERIÊNCIA
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
