import { useExpHubChrome } from "@/hooks/useExpHubChrome";

function NavAmbientSlot({ slot }: { slot: 0 | 1 }) {
  const { frontSlot, slotThemes } = useExpHubChrome();
  const theme = slotThemes[slot];
  const isFront = frontSlot === slot;

  return (
    <div
      className={`exp-hub-nav-layer exp-hub-nav-layer--${theme}`}
      data-front={isFront}
      data-slot={slot}
      aria-hidden
    />
  );
}

export function ExperienceHubNavAmbient() {
  return (
    <div className="site-subpage-header__ambient-stack" aria-hidden>
      <NavAmbientSlot slot={0} />
      <NavAmbientSlot slot={1} />
    </div>
  );
}
