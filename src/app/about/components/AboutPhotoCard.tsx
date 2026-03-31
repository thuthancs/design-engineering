"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import styles from "./AboutPhotoCard.module.css";

type AboutPhotoCardProps = {
  src: StaticImageData;
  alt: string;
  hoverLabel: string;
};

export function AboutPhotoCard({ src, alt, hoverLabel }: AboutPhotoCardProps) {
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
      className={styles.wrap}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 720px) 26vw, 400px"
        quality={92}
        className={styles.image}
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
