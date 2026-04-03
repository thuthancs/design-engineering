import mandarinIllo from "@/app/assets/projects/illo/mandarin.png";
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
  /** Match sibling previews: fixed height, object-fit contain (full image, letterbox). */
  illustrationEqualHeight?: boolean;
  /** Bias preview toward the left inside the equal-height frame. */
  illustrationAnchorLeft?: boolean;
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
    illustrationEqualHeight: true,
    illustrationAnchorLeft: true,
    href: "/projects/mandy",
  },
  {
    id: "mandarin",
    title: "Mandarin",
    description:
      "Hand-drawn mandarin with segments and Vietnamese label (quả quýt).",
    preview: mandarinIllo,
    previewAlt:
      "Mandarin illustration — whole fruit, peeled segments, handwritten mandarin (quả quýt)",
    illustrationEqualHeight: true,
    illustrationAnchorLeft: true,
  },
];
