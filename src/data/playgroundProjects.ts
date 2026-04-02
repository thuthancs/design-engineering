import poemPocketGif from "@/app/assets/projects/poem-pocket/poem-pocket-preview.gif";
import sunsetClockGif from "@/app/assets/projects/sunset-clock/sunset_clock.gif";
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
  /** 515px-tall full-width column frame; image uses object-fit cover (wide previews). */
  containHeightMatchSignup?: boolean;
  /** Zoom factor for contain-height previews (>1 crops edges, subject appears larger). */
  containHeightZoom?: number;
  /** Set true for GIFs so animation is preserved (Next/Image). */
  unoptimized?: boolean;
  /** External URL (opens in a new tab). Omit when there is no live demo yet. */
  href?: string;
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
  {
    id: "poem-pocket",
    title: "Poem Pocket",
    description:
      "A two-page digital notebook with soft gradients and handwritten-style type — a quiet place to draft lines.",
    preview: poemPocketGif,
    previewAlt:
      "Poem Pocket — open notebook spread with placeholder line and page numbers",
    containHeightMatchSignup: true,
    containHeightZoom: 1.14,
    unoptimized: true,
    href: "https://www.figma.com/make/YrNbAXDgPa96PNyMzCK91f/Poem?t=oRL58W3O8qvaH9bJ-1",
  },
];
