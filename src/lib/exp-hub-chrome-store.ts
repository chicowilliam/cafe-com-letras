import type { ExperienciaId } from "@/lib/experiencias";
import { EXP_HUB_TRANSITION_MS } from "@/lib/experience-hub-utils";

export type ExpHubChromeState = {
  activeTheme: ExperienciaId;
  frontSlot: 0 | 1;
  slotThemes: [ExperienciaId, ExperienciaId];
  isTransitioning: boolean;
};

type Listener = () => void;

const listeners = new Set<Listener>();

let state: ExpHubChromeState = {
  activeTheme: "cafe-da-tarde",
  frontSlot: 0,
  slotThemes: ["cafe-da-tarde", "cafe-da-tarde"],
  isTransitioning: false,
};

let transitionTimer: ReturnType<typeof setTimeout> | null = null;

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function applyHtmlDataset(next: ExpHubChromeState) {
  const html = document.documentElement;
  html.dataset.expHubTheme = next.activeTheme;

  if (next.isTransitioning) {
    html.dataset.expHubTransitioning = "true";
  } else {
    delete html.dataset.expHubTransitioning;
  }
}

export function getExpHubChromeState() {
  return state;
}

export function subscribeExpHubChrome(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function initExpHubChromeTheme(activeTheme: ExperienciaId) {
  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }

  state = {
    activeTheme,
    frontSlot: 0,
    slotThemes: [activeTheme, activeTheme],
    isTransitioning: false,
  };

  applyHtmlDataset(state);
  emit();
}

export function syncExpHubChromeTheme(activeTheme: ExperienciaId) {
  if (activeTheme === state.activeTheme && !state.isTransitioning) {
    return;
  }

  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }

  const backSlot = state.frontSlot === 0 ? 1 : 0;
  const slotThemes: [ExperienciaId, ExperienciaId] = [...state.slotThemes];
  slotThemes[backSlot] = activeTheme;

  state = {
    activeTheme,
    frontSlot: backSlot,
    slotThemes,
    isTransitioning: true,
  };

  applyHtmlDataset(state);
  emit();

  transitionTimer = setTimeout(() => {
    state = { ...state, isTransitioning: false };
    applyHtmlDataset(state);
    emit();
    transitionTimer = null;
  }, EXP_HUB_TRANSITION_MS);
}

export function resetExpHubChrome() {
  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }

  state = {
    activeTheme: "cafe-da-tarde",
    frontSlot: 0,
    slotThemes: ["cafe-da-tarde", "cafe-da-tarde"],
    isTransitioning: false,
  };

  delete document.documentElement.dataset.expHubTheme;
  delete document.documentElement.dataset.expHubTransitioning;
  emit();
}
