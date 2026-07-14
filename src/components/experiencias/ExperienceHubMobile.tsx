import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { AppLink } from "@/components/AppLink";
import { ExperiencePanelCtas } from "@/components/experiencias/ExperiencePanelCtas";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import { hubContentContainerVariants, hubContentItemVariants } from "@/lib/motion-presets";

type ExperienceHubMobileProps = {
  entries: readonly ExperienciaCatalogEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Filtros logo abaixo da grade — evita distância do detalhe expandido. */
  filters?: ReactNode;
};

export function ExperienceHubMobile({
  entries,
  activeIndex,
  onSelect,
  filters,
}: ExperienceHubMobileProps) {
  const reduceMotion = useReducedMotion();
  const activeEntry = entries[activeIndex] ?? entries[0];

  const detailContent = (
    <>
      <p className="exp-hub-mobile__detail-eyebrow">{activeEntry.eyebrow}</p>
      <h2 className="exp-hub-mobile__detail-title font-display">{activeEntry.title}</h2>
      <p className="exp-hub-mobile__detail-schedule">{activeEntry.scheduleShort}</p>
      <p className="exp-hub-mobile__detail-tagline">{activeEntry.tagline}</p>
      {activeEntry.conversionHint ? (
        <p className="exp-hub-mobile__detail-conversion">{activeEntry.conversionHint}</p>
      ) : null}
      <ul className="exp-hub-mobile__detail-highlights">
        {activeEntry.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ExperiencePanelCtas
        entry={activeEntry}
        className="exp-hub-mobile__cta-row"
        primaryClassName="exp-hub-mobile__detail-cta btn-primary focus-ring"
        ghostClassName="exp-hub-mobile__detail-cta-ghost btn-ghost-minimal focus-ring"
      />
    </>
  );

  return (
    <div className="exp-hub-mobile">
      <div
        className="exp-hub-mobile__grid"
        role="list"
        aria-label="Experiências gastronômicas"
      >
        {entries.map((entry, index) => {
          const isActive = activeIndex === index;
          return (
            <AppLink
              key={entry.id}
              to={entry.href}
              id={`exp-hub-mobile-tab-${entry.id}`}
              aria-current={isActive ? "page" : undefined}
              aria-label={`${entry.title} — ${entry.timeBandLabel}. Ver experiência`}
              onFocus={() => onSelect(index)}
              onMouseEnter={() => onSelect(index)}
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
                  <span className="exp-hub-mobile__card-meta">
                    {entry.conversionHint ?? entry.scheduleShort}
                  </span>
                </span>
              </span>
            </AppLink>
          );
        })}
      </div>

      {filters ? <div className="exp-hub-mobile__filters">{filters}</div> : null}

      {reduceMotion ? (
        <article
          id="exp-hub-mobile-detail"
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
            {activeEntry.conversionHint ? (
              <m.p
                className="exp-hub-mobile__detail-conversion"
                variants={hubContentItemVariants}
              >
                {activeEntry.conversionHint}
              </m.p>
            ) : null}
            <m.ul className="exp-hub-mobile__detail-highlights" variants={hubContentItemVariants}>
              {activeEntry.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </m.ul>
            <m.div variants={hubContentItemVariants}>
              <ExperiencePanelCtas
                entry={activeEntry}
                className="exp-hub-mobile__cta-row"
                primaryClassName="exp-hub-mobile__detail-cta btn-primary focus-ring"
                ghostClassName="exp-hub-mobile__detail-cta-ghost btn-ghost-minimal focus-ring"
              />
            </m.div>
          </m.article>
        </AnimatePresence>
      )}
    </div>
  );
}
