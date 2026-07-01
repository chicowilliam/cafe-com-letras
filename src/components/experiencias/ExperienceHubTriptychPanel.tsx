import { AnimatePresence, m } from "framer-motion";
import { memo } from "react";
import { ExperiencePanelCtas } from "@/components/experiencias/ExperiencePanelCtas";
import { useExpHubChrome } from "@/hooks/useExpHubChrome";
import type { ExperienciaCatalogEntry } from "@/lib/experiencias";
import {
  ACTIVE_PANEL_FLEX,
  INACTIVE_PANEL_FLEX,
} from "@/lib/experience-hub-utils";
import {
  hubCompactVariants,
  hubContentContainerVariants,
  hubContentItemVariants,
  hubImageSpring,
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
  simplifyMotion,
}: {
  entry: ExperienciaCatalogEntry;
  isActive: boolean;
  simplifyMotion: boolean;
}) {
  if (simplifyMotion) {
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
            <ExperiencePanelCtas entry={entry} />
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
              <ExperiencePanelCtas entry={entry} />
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
  const { isTransitioning } = useExpHubChrome();
  const simplifyMotion = reduceMotion || isTransitioning;
  const flexGrow = isActive ? ACTIVE_PANEL_FLEX : INACTIVE_PANEL_FLEX;
  const panelClassName = `exp-hub-editorial__panel exp-hub-editorial__panel--${entry.id} focus-ring${
    isActive ? " is-active" : ""
  }`;
  const overlayClassName = `exp-hub-editorial__overlay${
    isActive ? "" : " exp-hub-editorial__overlay--compact"
  }`;
  const imageLoading = index === 0 || isActive ? "eager" : "lazy";

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
      <div
        id={`exp-hub-panel-${entry.id}`}
        role="tabpanel"
        aria-labelledby={`exp-hub-tab-${entry.id}`}
        className="exp-hub-editorial__panel-inner"
      >
        {simplifyMotion ? (
          <img
            src={entry.image}
            alt=""
            aria-hidden
            className="exp-hub-editorial__image"
            loading={imageLoading}
            decoding="async"
          />
        ) : (
          <m.img
            src={entry.image}
            alt=""
            aria-hidden
            className="exp-hub-editorial__image"
            loading={imageLoading}
            decoding="async"
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={hubImageSpring}
          />
        )}

        <div className={overlayClassName} aria-hidden />

        <PanelContent
          entry={entry}
          isActive={isActive}
          simplifyMotion={simplifyMotion}
        />
      </div>

      <span className="sr-only">
        Painel {index + 1}: {entry.title}
      </span>
    </button>
  );
});
