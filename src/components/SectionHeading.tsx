import type { ElementType, ReactNode } from "react";

export type SectionHeadingAlign = "left" | "center" | "responsive";

export type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  kicker?: string;
  align?: SectionHeadingAlign;
  as?: ElementType;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  leading?: ReactNode;
  /** Substitui o índice estático (ex.: animação). */
  indexSlot?: ReactNode;
};

export const SECTION_HEADING_ALIGN: Record<SectionHeadingAlign, string> = {
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
  indexSlot,
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${SECTION_HEADING_ALIGN[align]} ${className}`}>
      <div className="flex items-center gap-2.5">
        {leading}
        {index ? (
          <>
            {indexSlot ?? <span className="section-index">{index}</span>}
            <span aria-hidden className="h-px w-5 bg-accent/30" />
          </>
        ) : null}
        <span className={`section-eyebrow !mb-0 ${eyebrowClassName}`}>{eyebrow}</span>
      </div>

      <TitleTag className={`section-title mt-3 ${titleClassName}`}>{title}</TitleTag>

      {kicker ? <p className="section-kicker mt-2">{kicker}</p> : null}
    </div>
  );
}
