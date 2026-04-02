import mandySketch from "@/app/assets/projects/mandy/mandy-sketch.png";
import type { StaticImageData } from "next/image";

/**
 * Illustration work shown on /illustration.
 * Same card + hover pattern as playground and homepage projects.
 */
export type IllustrationProject = {
  id: string;
  title: string;
  preview: StaticImageData;
  previewAlt?: string;
  cropModalFrame?: boolean;
  containHeightMatchSignup?: boolean;
  containHeightZoom?: number;
  /** Full sheet at natural aspect; capped width, no fixed-height crop. */
  naturalAspectSheet?: boolean;
  unoptimized?: boolean;
  href?: string;
  description?: string;
};

export const illustrationProjects: IllustrationProject[] = [
  {
    id: "mandy",
    title: "Mandy",
    description:
      "Character concept sheet — poses, expressions, and notes for a nerdy bookish type.",
    preview: mandySketch,
    previewAlt:
      "Mandy character sheet — full body and expression sketches with handwritten labels",
    naturalAspectSheet: true,
    href: "/projects/mandy",
  },
];
