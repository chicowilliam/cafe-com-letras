import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { MARQUEE_IMAGES } from "@/lib/constants";

export function ImageMarquee() {
  const loop = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section id="galeria" className="overflow-hidden bg-[#1a1614] py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <Camera size={18} className="text-accent" strokeWidth={1.5} />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Momentos
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-serif text-3xl text-[#f5f0e6] md:text-4xl"
        >
          Café, cultura e encontros
        </motion.h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#1a1614] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#1a1614] to-transparent md:w-32" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-4 md:gap-5">
            {loop.map((image, index) => (
              <div
                key={`galeria-${index}`}
                className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl md:h-44 md:w-64"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
