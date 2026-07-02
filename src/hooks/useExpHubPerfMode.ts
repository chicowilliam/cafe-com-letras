import { useEffect, useState } from "react";

function detectLowPowerDevice() {
  if (typeof window === "undefined") return false;

  const cores = navigator.hardwareConcurrency ?? 8;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = connection?.saveData === true;
  const slowNetwork =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "3g";

  return cores <= 4 || saveData || slowNetwork;
}

export function useExpHubPerfMode(reduceMotion: boolean) {
  const [lowPower, setLowPower] = useState(() => detectLowPowerDevice());

  useEffect(() => {
    setLowPower(detectLowPowerDevice());
  }, []);

  return reduceMotion || lowPower;
}
