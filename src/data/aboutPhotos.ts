import photo1 from "@/app/assets/about/photo-1.png";
import photo2 from "@/app/assets/about/photo-2.png";
import photo3 from "@/app/assets/about/photo-3.png";
import photo4 from "@/app/assets/about/photo-4.png";
import type { StaticImageData } from "next/image";

export type AboutPhoto = {
  src: StaticImageData;
  alt: string;
  hoverLabel: string;
};

/** Replace files in `src/app/assets/about/` (same names) or edit alts here. */
export const aboutPhotos: AboutPhoto[] = [
  { src: photo1, alt: "Photo 1", hoverLabel: "SOMEWHERE IN KOREA" },
  { src: photo2, alt: "Photo 2", hoverLabel: "XIN CHÀO" },
  { src: photo3, alt: "Photo 3", hoverLabel: "GERMANY" },
  { src: photo4, alt: "Photo 4", hoverLabel: "MY HOMETOWN IN VIETNAM" },
];
