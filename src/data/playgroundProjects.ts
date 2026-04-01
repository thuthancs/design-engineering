import sunsetClockGif from "@/app/assets/sunset_clock.gif";
import type { StaticImageData } from "next/image";

/**
 * Creative experiments built with AI — shown on /playground.
 * Same card + cursor hover pattern as the homepage project list.
 */
export type PlaygroundProject = {
  /** Stable id for keys (slug-style, e.g. `sunset-clock`). */
  id: string;
  title: string;
  /** Preview image or GIF (shown in ProjectCard). */
  preview: StaticImageData;
  previewAlt?: string;
  /** Crop preview to the same 448×515 frame as design-engineering signup modal. */
  cropModalFrame?: boolean;
  /** Set true for GIFs so animation is preserved (Next/Image). */
  unoptimized?: boolean;
  /** External URL (opens in a new tab). */
  href: string;
  /** Optional longer blurb for notes / future use (not shown on the grid). */
  description?: string;
};

export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "sunset-clock",
    title: "Sunset clock",
    description:
      "A circular clock that blends sunrise and sunset for San Francisco — gradients follow the day, with live hands and sun times. Built with Figma Make.",
    preview: sunsetClockGif,
    previewAlt:
      "Sunset clock — circular gradient clock with sunrise and sunset times",
    cropModalFrame: true,
    unoptimized: true,
    href: "https://dock-wad-57535631.figma.site/",
  },
];
