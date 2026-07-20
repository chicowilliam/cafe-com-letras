import { useMemo } from "react";
import { botanicalSheetDataUri } from "@/lib/botanicalSheetUri";
import type { CSSProperties } from "react";

/**
 * Folha botânica contínua da home: uma camada absoluta no .home-shell,
 * tiled verticalmente. Rola com a página (sem parallax e sem sync de viewport).
 * Seções semi-translúcidas deixam a mesma origem de coordenadas atravessar
 * handoffs e painéis.
 */
export function HomeBotanicalSheet() {
  const style = useMemo(() => {
    return {
      "--home-botanical-branch": botanicalSheetDataUri("branch"),
      "--home-botanical-vine": botanicalSheetDataUri("vine"),
    } as CSSProperties;
  }, []);

  return <div className="home-botanical-sheet" style={style} aria-hidden />;
}
