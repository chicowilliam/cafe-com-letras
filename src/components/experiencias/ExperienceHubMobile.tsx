import { AppLink } from "@/components/AppLink";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import { hubContentContainerVariants, hubContentItemVariants } from "@/lib/motion-presets";

type ExperienceHubMobileProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ExperienceHubMobile({
  entries,
  activeIndex,
  onSelect,
}: ExperienceHubMobileProps) {
  const reduceMotion = useReducedMotion();
  const activeEntry = entries[activeIndex] ?? entries[0];

  const detailContent = (
    <>
      <p className="exp-hub-mobile__detail-eyebrow">{activeEntry.eyebrow}</p>
      <h2 className="exp-hub-mobile__detail-title font-display">{activeEntry.title}</h2>
      <p className="exp-hub-mobile__detail-schedule">{activeEntry.scheduleShort}</p>
      <p className="exp-hub-mobile__detail-tagline">{activeEntry.tagline}</p>
      <ul className="exp-hub-mobile__detail-highlights">
        {activeEntry.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <AppLink
        to={activeEntry.href}
        className="exp-hub-mobile__detail-cta btn-primary focus-ring"
      >
        Explorar experiência
        <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
      </AppLink>
    </>
  );

  return (
    <div className="exp-hub-mobile">
      <div
        className="exp-hub-mobile__grid"
        role="tablist"
        aria-label="Experiências gastronômicas"
      >
        {entries.map((entry, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`exp-hub-mobile-tab-${entry.id}`}
              aria-selected={isActive}
              aria-controls="exp-hub-mobile-detail"
              onClick={() => onSelect(index)}
              className={`exp-hub-mobile__card exp-hub-mobile__card--${entry.id} focus-ring ${
                isActive ? "is-active" : ""
              }`}
            >
              <span className="exp-hub-mobile__card-media">
                <img
                  src={entry.image}
                  alt=""
                  aria-hidden
                  className="exp-hub-mobile__card-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="exp-hub-mobile__card-overlay" aria-hidden />
                <span className="exp-hub-mobile__card-copy">
                  <span className="exp-hub-mobile__card-band">{entry.timeBandLabel}</span>
                  <span className="exp-hub-mobile__card-title">{entry.title}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {reduceMotion ? (
        <article
          id="exp-hub-mobile-detail"
          role="tabpanel"
          aria-labelledby={`exp-hub-mobile-tab-${activeEntry.id}`}
          className={`exp-hub-mobile__detail exp-hub-mobile__detail--${activeEntry.id}`}
        >
          {detailContent}
        </article>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <m.article
            key={activeEntry.id}
            id="exp-hub-mobile-detail"
            role="tabpanel"
            aria-labelledby={`exp-hub-mobile-tab-${activeEntry.id}`}
            className={`exp-hub-mobile__detail exp-hub-mobile__detail--${activeEntry.id}`}
            variants={hubContentContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <m.p className="exp-hub-mobile__detail-eyebrow" variants={hubContentItemVariants}>
              {activeEntry.eyebrow}
            </m.p>
            <m.h2
              className="exp-hub-mobile__detail-title font-display"
              variants={hubContentItemVariants}
            >
              {activeEntry.title}
            </m.h2>
            <m.p className="exp-hub-mobile__detail-schedule" variants={hubContentItemVariants}>
              {activeEntry.scheduleShort}
            </m.p>
            <m.p className="exp-hub-mobile__detail-tagline" variants={hubContentItemVariants}>
              {activeEntry.tagline}
            </m.p>
            <m.ul className="exp-hub-mobile__detail-highlights" variants={hubContentItemVariants}>
              {activeEntry.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </m.ul>
            <m.div variants={hubContentItemVariants}>
              <AppLink
                to={activeEntry.href}
                className="exp-hub-mobile__detail-cta btn-primary focus-ring"
              >
                Explorar experiência
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
              </AppLink>
            </m.div>
          </m.article>
        </AnimatePresence>
      )}
    </div>
  );
}
