import { track } from "@vercel/analytics/react";
import { m, useReducedMotion } from "framer-motion";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact";
import { revealSpring } from "@/lib/motion-presets";

const fabClassName =
  "focus-ring fixed z-40 right-[max(1.25rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-background/60 p-0 text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:border-white/22 hover:bg-background/78 hover:shadow-[0_6px_28px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.96] motion-reduce:transition-none";

export function WhatsAppButton() {
  const reduceMotion = useReducedMotion();

  const linkProps = {
    href: buildWhatsAppUrl(),
    target: "_blank" as const,
    rel: "noopener noreferrer",
    "aria-label": "Fale conosco pelo WhatsApp",
    onClick: () => track("whatsapp_clicado", { origem: "fab" }),
    className: fabClassName,
  };

  const icon = <WhatsAppIcon size={18} tone="brand" className="block shrink-0" />;

  if (reduceMotion) {
    return (
      <a {...linkProps}>
        {icon}
      </a>
    );
  }

  return (
    <m.a
      {...linkProps}
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...revealSpring, delay: 1.1 }}
    >
      {icon}
    </m.a>
  );
}
