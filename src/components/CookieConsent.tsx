import { useState } from "react";

const STORAGE_KEY = "cl-cookie-consent";

function shouldShowInitially() {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(shouldShowInitially);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-hairline bg-surface-elevated/95 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur-md motion-safe:animate-[programacao-fade_0.4s_ease-out_both]"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-xs leading-relaxed text-foreground-muted sm:text-left">
          Usamos cookies para melhorar sua experiência e medir o tráfego do site.{" "}
          <a
            href="/politica-de-privacidade"
            className="focus-ring rounded-sm text-accent underline-offset-2 hover:underline"
          >
            Política de privacidade
          </a>
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-primary focus-ring shrink-0 rounded-full px-5 py-2 text-sm font-medium"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
