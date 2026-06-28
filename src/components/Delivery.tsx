import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal, StaggerItem } from "@/components/SectionReveal";
import { DELIVERY_IMAGES } from "@/lib/delivery-images";

const IFOOD_URL =
  "https://www.ifood.com.br/delivery/belo-horizonte-mg/cafe-com-letras-savassi/b53324c0-32a8-4278-b229-4b362b7847cc";

export function Delivery() {
  return (
    <section
      id="delivery"
      className="section-lifted-panel section-surface-enter section-padding bg-surface"
    >
      <div className="relative z-[1] mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:items-center md:gap-16">
        <div className="flex flex-col">
          <AnimatedSectionHeading
            eyebrow="Delivery"
            title="O café em casa"
            kicker="Os mesmos sabores do Café com Letras, entregues onde você estiver."
            align="left"
          />
          <a
            href={IFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary focus-ring mt-8 inline-flex w-fit items-center gap-2.5 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
          >
            <svg
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            >
              <path d="M16 2a14 14 0 1 0 0 28A14 14 0 0 0 16 2zm6.4 20.3-7.5-4.3V9.3h2.2v7.6l6.5 3.7-1.2 1.7z" />
            </svg>
            Pedir no iFood
          </a>
        </div>

        <SectionReveal variant="stagger">
          <div
            className={`grid gap-3 ${
              DELIVERY_IMAGES.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {DELIVERY_IMAGES.map((src, i) => (
              <StaggerItem
                key={i}
                index={i}
                className={`overflow-hidden rounded-sm ${
                  i === 0 && DELIVERY_IMAGES.length === 3 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt="Delivery Café com Letras"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover transition-[filter] duration-300 hover:brightness-105"
                />
              </StaggerItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
