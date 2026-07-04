import { AppLink } from "@/components/AppLink";
import { AboutHistoryOrnament } from "@/components/AboutHistoryOrnament";
import { SectionReveal } from "@/components/SectionReveal";
import {
  ABOUT_HISTORY_ARCHIVE,
  ABOUT_HISTORY_PRESENT,
  ABOUT_HISTORY_SECONDARY,
  type AboutHistoryPhoto,
} from "@/lib/about-images";
import { ArrowRight } from "lucide-react";
import "@/styles/about-history.css";

function HistoryPhotoPanel({
  photo,
  variant,
  captionTone,
}: {
  photo: AboutHistoryPhoto;
  variant: "archive" | "present";
  captionTone?: "archive" | "present";
}) {
  const tone = captionTone ?? (variant === "present" ? "present" : "archive");

  return (
    <figure
      className={`about-history-diptych__panel about-history-diptych__panel--${variant}${
        tone === "present" ? " about-history-diptych__panel--tone-present" : ""
      }`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="about-history-diptych__caption">{photo.caption}</figcaption>
    </figure>
  );
}

type AboutHistoryPhotoPairProps = {
  archive: AboutHistoryPhoto;
  present: AboutHistoryPhoto;
  withOrnament?: boolean;
};

export function AboutHistoryPhotoPair({
  archive,
  present,
  withOrnament = false,
}: AboutHistoryPhotoPairProps) {
  return (
    <div className="about-history-diptych__pair">
      {withOrnament ? <AboutHistoryOrnament variant="media" /> : null}
      <HistoryPhotoPanel photo={archive} variant="archive" />
      <HistoryPhotoPanel
        photo={present}
        variant="present"
        captionTone={present.caption === "Savassi hoje" ? "present" : "archive"}
      />
    </div>
  );
}

export function AboutHistoryMediaColumn() {
  return (
    <SectionReveal
      variant="subtle"
      className="about-history__media about-history-media relative h-full min-h-full"
    >
      <div className="about-history-media__inner">
        <AboutHistoryPhotoPair
          archive={ABOUT_HISTORY_ARCHIVE}
          present={ABOUT_HISTORY_PRESENT}
          withOrnament
        />
        <AboutHistoryPhotoPair
          archive={ABOUT_HISTORY_SECONDARY[0]}
          present={ABOUT_HISTORY_SECONDARY[1]}
        />
        <AppLink to="/#galeria" className="about-history-diptych__link focus-ring">
          Ver galeria completa
          <ArrowRight size={12} strokeWidth={1.75} aria-hidden />
        </AppLink>
      </div>
    </SectionReveal>
  );
}
