import { AppLink } from "@/components/AppLink";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { memo } from "react";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import {
  ACTIVE_PANEL_FLEX,
  INACTIVE_PANEL_FLEX,
} from "@/lib/experience-hub-utils";
import {
  compositorStyle,
  hubCompactVariants,
  hubContentContainerVariants,
  hubContentItemVariants,
  hubImageSpring,
  hubPanelSpring,
} from "@/lib/motion-presets";

type ExperienceHubTriptychPanelProps = {
  entry: ExperienciaCatalogEntry;
  index: number;
  isActive: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  onHover: () => void;
};

function PanelContent({
  entry,
  isActive,
  reduceMotion,
}: {
  entry: ExperienciaCatalogEntry;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return (
      <div className="exp-hub-editorial__content">
        {isActive ? (
          <>
            <p className="exp-hub-editorial__eyebrow">{entry.eyebrow}</p>
            <h2 className="exp-hub-editorial__title font-display">{entry.title}</h2>
            <p className="exp-hub-editorial__schedule">{entry.scheduleShort}</p>
            <p className="exp-hub-editorial__tagline">{entry.tagline}</p>
            <ul className="exp-hub-editorial__highlights">
              {entry.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <AppLink
              to={entry.href}
              className="exp-hub-editorial__cta btn-primary focus-ring"
              onClick={(event) => event.stopPropagation()}
            >
              Explorar experiência
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
            </AppLink>
          </>
        ) : (
          <>
            <p className="exp-hub-editorial__band">{entry.timeBandLabel}</p>
            <h2 className="exp-hub-editorial__title exp-hub-editorial__title--compact font-display">
              {entry.title}
            </h2>
            <p className="exp-hub-editorial__schedule">{entry.scheduleShort}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="exp-hub-editorial__content">
      <AnimatePresence mode="wait" initial={false}>
        {isActive ? (
          <m.div
            key="expanded"
            className="exp-hub-editorial__content-stack"
            variants={hubContentContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <m.p className="exp-hub-editorial__eyebrow" variants={hubContentItemVariants}>
              {entry.eyebrow}
            </m.p>
            <m.h2
              className="exp-hub-editorial__title font-display"
              variants={hubContentItemVariants}
            >
              {entry.title}
            </m.h2>
            <m.p className="exp-hub-editorial__schedule" variants={hubContentItemVariants}>
              {entry.scheduleShort}
            </m.p>
            <m.p className="exp-hub-editorial__tagline" variants={hubContentItemVariants}>
              {entry.tagline}
            </m.p>
            <m.ul className="exp-hub-editorial__highlights" variants={hubContentItemVariants}>
              {entry.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </m.ul>
            <m.div variants={hubContentItemVariants}>
              <AppLink
                to={entry.href}
                className="exp-hub-editorial__cta btn-primary focus-ring"
                onClick={(event) => event.stopPropagation()}
              >
                Explorar experiência
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
              </AppLink>
            </m.div>
          </m.div>
        ) : (
          <m.div
            key="compact"
            className="exp-hub-editorial__content-stack"
            variants={hubCompactVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="exp-hub-editorial__band">{entry.timeBandLabel}</p>
            <h2 className="exp-hub-editorial__title exp-hub-editorial__title--compact font-display">
              {entry.title}
            </h2>
            <p className="exp-hub-editorial__schedule">{entry.scheduleShort}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ExperienceHubTriptychPanel = memo(function ExperienceHubTriptychPanel({
  entry,
  index,
  isActive,
  reduceMotion,
  onActivate,
  onHover,
}: ExperienceHubTriptychPanelProps) {
  const flexGrow = isActive ? ACTIVE_PANEL_FLEX : INACTIVE_PANEL_FLEX;
  const panelClassName = `exp-hub-editorial__panel exp-hub-editorial__panel--${entry.id} focus-ring ${
    isActive ? "is-active" : ""
  }`;

  const panelInner = (
    <>
      <div
        id={`exp-hub-panel-${entry.id}`}
        role="tabpanel"
        aria-labelledby={`exp-hub-tab-${entry.id}`}
        className="exp-hub-editorial__panel-inner"
      >
        {reduceMotion ? (
          <img
            src={entry.image}
            alt=""
            aria-hidden
            className="exp-hub-editorial__image"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <m.img
            src={entry.image}
            alt=""
            aria-hidden
            className="exp-hub-editorial__image"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            style={compositorStyle}
            animate={{ scale: isActive ? 1.05 : 1 }}
            whileHover={{ scale: isActive ? 1.1 : 1.08 }}
            transition={hubImageSpring}
          />
        )}

        {reduceMotion ? (
          <div
            className={`exp-hub-editorial__overlay${
              isActive ? "" : " exp-hub-editorial__overlay--compact"
            }`}
            aria-hidden
          />
        ) : (
          <m.div
            className={`exp-hub-editorial__overlay${
              isActive ? "" : " exp-hub-editorial__overlay--compact"
            }`}
            aria-hidden
            animate={{ opacity: isActive ? 1 : 0.92 }}
            transition={hubImageSpring}
          />
        )}

        <PanelContent entry={entry} isActive={isActive} reduceMotion={reduceMotion} />
      </div>

      <span className="sr-only">
        Painel {index + 1}: {entry.title}
      </span>
    </>
  );

  if (reduceMotion) {
    return (
      <button
        type="button"
        role="tab"
        id={`exp-hub-tab-${entry.id}`}
        aria-selected={isActive}
        aria-controls={`exp-hub-panel-${entry.id}`}
        aria-label={`${entry.title} — ${entry.timeBandLabel}`}
        onClick={onActivate}
        onMouseEnter={onHover}
        className={panelClassName}
        style={{ flexGrow, flexBasis: 0 }}
      >
        {panelInner}
      </button>
    );
  }

  return (
    <m.button
      type="button"
      role="tab"
      id={`exp-hub-tab-${entry.id}`}
      aria-selected={isActive}
      aria-controls={`exp-hub-panel-${entry.id}`}
      aria-label={`${entry.title} — ${entry.timeBandLabel}`}
      onClick={onActivate}
      onMouseEnter={onHover}
      layout
      className={panelClassName}
      style={{ flexGrow, flexBasis: 0, flexShrink: 1, ...compositorStyle }}
      animate={{ opacity: isActive ? 1 : 0.88 }}
      transition={{
        layout: hubPanelSpring,
        opacity: hubPanelSpring,
      }}
    >
      {panelInner}
    </m.button>
  );
});
