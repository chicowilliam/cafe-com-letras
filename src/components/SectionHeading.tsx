import type { ElementType, ReactNode } from "react";

type SectionHeadingAlign = "left" | "center" | "responsive";

type SectionHeadingProps = {
  /** Número de seção, ex.: "01". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  /** Subtítulo curto em Garamond itálico. */
  kicker?: string;
  align?: SectionHeadingAlign;
  as?: ElementType;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  /** Elemento opcional antes do eyebrow (ex.: ícone). */
  leading?: ReactNode;
};

const ALIGN_CLASS: Record<SectionHeadingAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  responsive: "items-center text-center md:items-start md:text-left",
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  kicker,
  align = "responsive",
  as: TitleTag = "h2",
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  leading,
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${ALIGN_CLASS[align]} ${className}`}>
      <div className="flex items-center gap-2.5">
        {leading}
        {index ? (
          <>
            <span className="font-sans text-[11px] font-medium tracking-[0.22em] text-accent/70 tabular-nums">
              {index}
            </span>
            <span aria-hidden className="h-px w-5 bg-accent/30" />
          </>
        ) : null}
        <span className={`section-eyebrow !mb-0 ${eyebrowClassName}`}>{eyebrow}</span>
      </div>

      <TitleTag className={`section-title mt-3 ${titleClassName}`}>{title}</TitleTag>

      {kicker ? (
        <p className="mt-2 font-garamond text-base italic text-foreground-muted md:text-lg">
          {kicker}
        </p>
      ) : null}
    </div>
  );
}
