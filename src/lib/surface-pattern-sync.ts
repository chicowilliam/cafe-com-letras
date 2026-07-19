/**
 * Alinha SVGs de SurfacePattern à folha do viewport (mesma janela do BackgroundPattern fixed).
 * Um único rAF para todos os hosts — clip no host evita inflar scrollHeight.
 */

type SyncTarget = {
  host: HTMLElement;
  sheet: HTMLElement;
};

const targets = new Set<SyncTarget>();
const resizeObservers = new Map<SyncTarget, ResizeObserver>();
let raf = 0;
let listening = false;

function paint() {
  raf = 0;
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;

  for (const { host, sheet } of targets) {
    const r = host.getBoundingClientRect();
    sheet.style.width = `${vw}px`;
    sheet.style.height = `${vh}px`;
    sheet.style.transform = `translate3d(${-r.left}px, ${-r.top}px, 0)`;
  }
}

function schedule() {
  if (raf) return;
  raf = requestAnimationFrame(paint);
}

function onScrollOrResize() {
  schedule();
}

function ensureListeners() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScrollOrResize, { passive: true, capture: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
}

function maybeRemoveListeners() {
  if (targets.size > 0) return;
  listening = false;
  window.removeEventListener("scroll", onScrollOrResize, true);
  window.removeEventListener("resize", onScrollOrResize);
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

/** Registra host+folha; retorna unsubscribe. */
export function subscribeSurfacePatternSync(host: HTMLElement, sheet: HTMLElement): () => void {
  const target: SyncTarget = { host, sheet };
  targets.add(target);
  ensureListeners();

  const ro = new ResizeObserver(schedule);
  ro.observe(host);
  resizeObservers.set(target, ro);

  // Paint síncrono no mount — cobre seções lazy que nascem fora do viewport
  paint();
  schedule();

  return () => {
    const observer = resizeObservers.get(target);
    observer?.disconnect();
    resizeObservers.delete(target);
    targets.delete(target);
    maybeRemoveListeners();
  };
}
