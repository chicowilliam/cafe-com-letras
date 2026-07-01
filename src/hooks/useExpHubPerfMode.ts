import { useEffect, useState } from "react";

function detectLowPowerDevice() {
  if (typeof window === "undefined") return false;

  const cores = navigator.hardwareConcurrency ?? 8;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData === true;

  return cores <= 4 || saveData;
}

export function useExpHubPerfMode(reduceMotion: boolean) {
  const [lowPower, setLowPower] = useState(() => detectLowPowerDevice());

  useEffect(() => {
    setLowPower(detectLowPowerDevice());
  }, []);

  return reduceMotion || lowPower;
}
