"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
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
      className={[styles.wrap, wrapClassName].filter(Boolean).join(" ")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={[styles.image, cropModalFrame && styles.imageCropModal, className]
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
