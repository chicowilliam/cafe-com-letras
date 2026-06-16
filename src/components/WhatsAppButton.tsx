import { track } from "@vercel/analytics/react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      onClick={() => track("whatsapp_clicado", { origem: "fab" })}
      className="focus-ring fixed z-40 right-[max(1.25rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-2)] text-[var(--ink)] shadow-lg shadow-black/40 transition-[transform,filter] duration-300 ease-out hover:brightness-105 active:scale-[0.98] motion-reduce:transition-none"
    >
      <WhatsAppIcon size={22} className="shrink-0" />
    </a>
  );
}
