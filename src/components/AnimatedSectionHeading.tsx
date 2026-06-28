import type { ElementType, ReactNode } from "react";
import {
  SECTION_HEADING_ALIGN,
  SectionHeading,
  type SectionHeadingAlign,
} from "@/components/SectionHeading";
import {
  EditorialBody,
  EditorialEyebrow,
  EditorialTitle,
  SectionReveal,
} from "@/components/SectionReveal";

type AnimatedSectionHeadingProps = {
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
  animateIndex?: boolean;
  editorial?: boolean;
};

function IndexMark({ index, animate }: { index: string; animate?: boolean }) {
  const mark = <span className="section-index">{index}</span>;
  if (!animate) return mark;
  return (
    <SectionReveal variant="index-scale" className="inline-flex">
      {mark}
    </SectionReveal>
  );
}

export function AnimatedSectionHeading({
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
  animateIndex = false,
  editorial = false,
}: AnimatedSectionHeadingProps) {
  const indexSlot = index ? <IndexMark index={index} animate={animateIndex} /> : undefined;

  if (!editorial) {
    return (
      <SectionHeading
        index={index}
        eyebrow={eyebrow}
        title={title}
        kicker={kicker}
        align={align}
        as={TitleTag}
        className={className}
        eyebrowClassName={eyebrowClassName}
        titleClassName={titleClassName}
        leading={leading}
        indexSlot={indexSlot}
      />
    );
  }

  return (
    <SectionReveal
      variant="editorial"
      className={`flex flex-col ${SECTION_HEADING_ALIGN[align]} ${className}`}
    >
      <EditorialEyebrow>
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
      </EditorialEyebrow>

      <EditorialTitle>
        <TitleTag className={`section-title mt-3 ${titleClassName}`}>{title}</TitleTag>
      </EditorialTitle>

      {kicker ? (
        <EditorialBody>
          <p className="section-kicker mt-2">{kicker}</p>
        </EditorialBody>
      ) : null}
    </SectionReveal>
  );
}
