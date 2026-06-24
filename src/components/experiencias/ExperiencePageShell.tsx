import type { ReactNode } from "react";

type ExperiencePageShellProps = {
  className?: string;
  children: ReactNode;
};

/** Wrapper leve para páginas de experiência — chrome e tema ficam no AppShell. */
export function ExperiencePageShell({
  className = "",
  children,
}: ExperiencePageShellProps) {
  return (
    <div className={`min-h-dvh bg-background text-foreground ${className}`.trim()}>
      {children}
    </div>
  );
}
