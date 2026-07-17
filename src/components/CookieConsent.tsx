import { useState } from "react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  const decide = (value: "accepted" | "rejected") => {
    setStoredConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-hairline bg-surface-elevated px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 motion-safe:animate-[programacao-fade_0.4s_ease-out_both]"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-xs leading-relaxed text-foreground-muted sm:text-left">
          Usamos cookies para medir o tráfego do site de forma anônima. As métricas só
          são ativadas com o seu consentimento.{" "}
          <a
            href="/politica-de-privacidade"
            className="focus-ring rounded-sm text-accent underline-offset-2 hover:underline"
          >
            Política de privacidade
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="btn-ghost focus-ring rounded-full px-5 py-2 text-sm font-medium"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="btn-primary focus-ring rounded-full px-5 py-2 text-sm font-medium"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
