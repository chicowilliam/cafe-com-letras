import { useExpHubChrome } from "@/hooks/useExpHubChrome";

function AmbientSlot({ slot }: { slot: 0 | 1 }) {
  const { frontSlot, slotThemes } = useExpHubChrome();
  const theme = slotThemes[slot];
  const isFront = frontSlot === slot;

  return (
    <div
      className={`exp-hub-ambient-layer exp-hub-ambient-layer--${theme}`}
      data-front={isFront}
      data-slot={slot}
      aria-hidden
    />
  );
}

export function ExperienceHubAmbientStack() {
  return (
    <div className="exp-hub-ambient-stack" aria-hidden>
      <AmbientSlot slot={0} />
      <AmbientSlot slot={1} />
    </div>
  );
}
