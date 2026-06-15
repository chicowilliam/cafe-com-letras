import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/553184244285";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="focus-ring fixed z-40 right-[max(1.25rem,env(safe-area-inset-right))] bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+3.75rem)] flex items-center gap-2 rounded-full bg-[var(--accent-2)] px-4 py-3 text-sm font-medium text-[var(--ink)] shadow-lg shadow-black/40 transition-[transform,filter] duration-300 ease-out hover:brightness-105 active:scale-[0.98] motion-reduce:transition-none"
    >
      <WhatsAppIcon size={18} className="shrink-0" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
