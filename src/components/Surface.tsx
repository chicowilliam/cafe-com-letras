import { type ComponentPropsWithoutRef } from "react";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  tone?: "dark" | "light";
};

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
