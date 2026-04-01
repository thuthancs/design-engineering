import desktopSignup from "@/app/assets/desktop_signup.png";
import mobileSignup from "@/app/assets/mobile_signup.png";
import signupModal from "@/app/assets/signup_modal.svg";
import signupPreviewGif from "@/app/assets/signup_preview.gif";
import signupV0 from "@/app/assets/signup_v0.svg";
import signupV1 from "@/app/assets/signup_v1.svg";
import type { StaticImageData } from "next/image";

export type ProjectPreview = {
  src: StaticImageData;
  width: number;
  height: number;
  alt: string;
  /** Pass through to next/image — use for animated GIFs so frames are preserved. */
  unoptimized?: boolean;
  /**
   * Crop the asset to the same 448×515 frame as signup_modal.svg (object-fit: cover).
   * Set width/height to 448 and 515 when using this.
   */
  cropModalFrame?: boolean;
};

/** Anchor id must be URL-safe (used in #hash links). */
export type ProjectSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: Array<{
    label: string;
    text: string;
  }>;
};

export type InlinePreview = {
  sectionId: string;
  images: ProjectPreview[];
};

/** Extra media under a section; optional copy beside the GIF on wide screens. */
export type SectionInlinePreviewBlock = {
  images: ProjectPreview[];
  asideText?: string;
};

export type Project = {
  slug: string;
  day: number;
  /** Shown after the day, e.g. "30 MARCH 2026". */
  dateLabel: string;
  title: string;
  summary: string;
  preview: ProjectPreview;
  /** If set, detail page shows these in a row (e.g. iterations); otherwise only `preview`. */
  detailGallery?: ProjectPreview[];
  /** Caption under the gallery row (detail page only). */
  detailGalleryCaption?: string;
  /** Optional black-background side-by-side preview under a section title. */
  inlinePreview?: InlinePreview;
  /** Media (and optional aside copy) keyed by `section.id`, after that section’s body. */
  sectionInlinePreviews?: Record<string, SectionInlinePreviewBlock>;
  /** Long-form sections for the detail page (sidebar + anchors). */
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "signup-page",
    day: 1,
    dateLabel: "30 MARCH 2026",
    title: "Signup Page",
    summary:
      "A minimal sign-up surface with name fields, email, password, primary action, and social sign-in. I built this as the first Daily UI challenge.",
    preview: {
      src: signupPreviewGif,
      width: 448,
      height: 515,
      alt: "Sign up form — Day 1, Daily UI Challenge",
      unoptimized: true,
      cropModalFrame: true,
    },
    detailGallery: [
      {
        src: signupV0,
        width: 720,
        height: 767,
        alt: "Sign up — iteration v0",
      },
      {
        src: signupV1,
        width: 880,
        height: 800,
        alt: "Sign up — iteration v1",
      },
      {
        src: signupModal,
        width: 448,
        height: 515,
        alt: "Sign up modal — final",
      },
    ],
    detailGalleryCaption:
      "From left to right (v0, v1, final).",
    sectionInlinePreviews: {
      Prototype: {
        asideText: `I created the signup page prototype on Iphone 13 frame and got to practice creating components and their variants.

For example, a button has 3 states: default, hover, and loading. Input fields have 2 states: default and focused.

Instead of repeating myself, I could create a component with those variants and create instances everywhere else.`,
        images: [
          {
            src: signupPreviewGif,
            width: 448,
            height: 515,
            alt: "Interactive prototype — mobile signup flow",
            unoptimized: true,
            cropModalFrame: true,
          },
        ],
      },
    },
    inlinePreview: {
      sectionId: "overview",
      images: [
        {
          src: desktopSignup,
          width: 2530,
          height: 1730,
          alt: "Desktop sign-up design preview",
        },
        {
          src: mobileSignup,
          width: 704,
          height: 1366,
          alt: "Mobile sign-up design preview",
        },
      ],
    },
    sections: [
      {
        id: "design-iteration",
        title: "Design Iteration",
        paragraphs: [
          "The challenge sounded simple at first, but it was harder than expected. I started with a very naive version: stacked fields, no social sign-in, and tighter 8px corner radii that felt too sharp.",
          "After reviewing established flows (Claude, ChatGPT, examples on Mobbin), a few patterns stood out:",
        ],
        bullets: [
          {
            label: "Rounded corners",
            text: "Most interfaces use 16-24px radii with very thin borders, then increase emphasis only in focused states.",
          },
          {
            label: "Grouping",
            text: "Related data can be grouped, such as first name and last name on the same row.",
          },
          {
            label: "Email-first",
            text: "Many flows reduce perceived effort by leading with email and progressive steps.",
          },
          {
            label: "Social sign-in",
            text: "A social option is common and helps reduce friction for onboarding.",
          },
        ],
      },
      {
        id: "why-rounded-corners",
        title: "Why Rounded Corners?",
        paragraphs: [
          'According to Chuquichambi, Erick G., et al. (2022) (https://pubmed.ncbi.nlm.nih.gov/36285721/), contour (or the outer lines that define the shape of an object) can determine whether an object is pleasing or displeasing from the human perspective. People perceive curvilinear form as more pleasant than angular forms. This makes sense because given human evolution, we often associate hard and sharp things like knifes, or weapons as something threatening.',
        ],
      },
      {
        id: "Prototype",
        title: "Prototype",
        paragraphs: [],
      },
      {
        id: "reflection",
        title: "Reflection",
        paragraphs: [
          "Planning is VERY important. Of course, you should not be stuck in planning for too long without execution but sketching the flow or the interface on a piece of paper before opening Figma can be beneficial. I jumped into Figma way too soon and there were things I only realized along the way, especially during the prototyping process. I realized there's actualy a lot going on with just a \"simple\" signup/sign in flow. For example, there should be a success state when the user successfully signs up, the failure state when they fill out information that does not meet the requirements, or the loading state. By the time I noticed this, my Figma was too messy and it was a pain to reorganize stuff and figure out what's to go next from the current state.",
        ],
      },
      {
        id: "inspiration",
        title: "Inspiration",
        paragraphs: [
          "Montek — Sign In & Sign Up Screens: https://dribbble.com/shots/20632011--Montek-Sign-In-Sign-Up-Screens",
        ],
      },
    ],
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.day - b.day);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
