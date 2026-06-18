export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "cl-cookie-consent";

/** Evento disparado quando o consentimento muda, para reagir sem recarregar. */
export const CONSENT_EVENT = "cl-consent-change";

export function getStoredConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
