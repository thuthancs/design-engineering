"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  src: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
  /** Shown when the hover cursor expands (e.g. “DAY N — TITLE”). */
  hoverLabel: string;
  className?: string;
  wrapClassName?: string;
  priority?: boolean;
  unoptimized?: boolean;
  /** Crop to 448×515 modal frame (matches signup_modal.svg). */
  cropModalFrame?: boolean;
  /** 515px-tall full-width frame like signup; image uses object-fit: cover. */
  containHeightMatchSignup?: boolean;
  /** When used with containHeightMatchSignup, scales the image (>1 zooms in / crops edges). */
  containHeightZoom?: number;
  /** Wide art at natural aspect ratio (no 515px cover crop). */
  naturalAspectSheet?: boolean;
  /** Fixed-height frame, full image visible (object-fit contain / letterbox). */
  illustrationEqualHeight?: boolean;
  /** When illustrationEqualHeight: bias art toward the left (tighter read with neighbors). */
  illustrationAnchorLeft?: boolean;
};

export function ProjectCard({
  src,
  alt,
  width,
  height,
  hoverLabel,
  className,
  wrapClassName,
  priority = false,
  unoptimized = false,
  cropModalFrame = false,
  containHeightMatchSignup = false,
  containHeightZoom = 1,
  naturalAspectSheet = false,
  illustrationEqualHeight = false,
  illustrationAnchorLeft = false,
}: ProjectCardProps) {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onEnter = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setActive(true);
    setExpanded(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true));
    });
  }, []);

  const onLeave = useCallback(() => {
    setActive(false);
    setExpanded(false);
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      className={[
        styles.wrap,
        illustrationEqualHeight && styles.wrapIllustrationEqualHeight,
        naturalAspectSheet && !illustrationEqualHeight && styles.wrapNaturalSheet,
        containHeightMatchSignup && styles.wrapContainHeight,
        containHeightMatchSignup &&
          containHeightZoom !== 1 &&
          styles.wrapContainHeightZoomed,
        wrapClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        containHeightMatchSignup && containHeightZoom !== 1
          ? ({
              ["--contain-height-zoom" as string]: String(containHeightZoom),
            } as CSSProperties)
          : undefined
      }
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={[
          styles.image,
          illustrationEqualHeight && styles.imageIllustrationEqualHeight,
          illustrationEqualHeight &&
            illustrationAnchorLeft &&
            styles.imageIllustrationAnchorLeft,
          !containHeightMatchSignup &&
            !naturalAspectSheet &&
            !illustrationEqualHeight &&
            cropModalFrame &&
            styles.imageCropModal,
          containHeightMatchSignup && styles.imageContainHeight,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        priority={priority}
        unoptimized={unoptimized}
      />
      <div
        className={`${styles.dimOverlay} ${active ? styles.dimOverlayVisible : ""}`}
        aria-hidden
      />
      <span className={styles.hit} aria-hidden />

      {active && (
        <div
          className={`${styles.cursorLabel} ${expanded ? styles.cursorLabelExpanded : ""}`}
          style={{ left: pos.x, top: pos.y }}
        >
          <span className={styles.labelText}>{hoverLabel}</span>
        </div>
      )}
    </div>
  );
}
