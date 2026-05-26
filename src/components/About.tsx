import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ABOUT_PARAGRAPHS } from "@/lib/constants";

export function About() {
  return (
    <section id="sobre" className="bg-[#12110f] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="mb-12 flex items-center gap-3"
        >
          <BookOpen size={18} className="text-accent" strokeWidth={1.5} />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            A História
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 font-serif text-4xl leading-tight text-[#f5f0e6] md:text-5xl"
        >
          Três amigos, um sonho
          <br />
          <span className="text-accent italic">e a Savassi</span>
        </motion.h2>

        <div className="space-y-8">
          {ABOUT_PARAGRAPHS.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base leading-[1.9] text-[#f5f0e6]/75 md:text-lg md:leading-[2]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-foreground-muted">
            Rua Antônio de Albuquerque · Savassi · Belo Horizonte
          </p>
        </motion.div>
      </div>
    </section>
  );
}
