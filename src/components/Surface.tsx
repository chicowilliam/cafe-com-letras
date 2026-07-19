import { type ComponentPropsWithoutRef } from "react";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  tone?: "dark" | "light";
};

/**
 * Âncora de layout para cards elevados.
 * O desenho botânico contínuo fica em MaterialCard / PatternedSurface / seções.
 */
export function Surface({ tone = "dark", className = "", children, ...props }: SurfaceProps) {
  return (
    <div
      className={`surface-anchor${tone === "light" ? " surface-anchor--light" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
