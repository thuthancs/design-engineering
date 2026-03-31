import desktopSignup from "@/app/assets/desktop_signup.png";
import mobileSignup from "@/app/assets/mobile_signup.png";
import signupModal from "@/app/assets/signup_modal.svg";
import signupV0 from "@/app/assets/signup_v0.svg";
import signupV1 from "@/app/assets/signup_v1.svg";
import type { StaticImageData } from "next/image";

export type ProjectPreview = {
  src: StaticImageData;
  width: number;
  height: number;
  alt: string;
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
      src: signupModal,
      width: 448,
      height: 515,
      alt: "Sign up form — Day 1, Daily UI Challenge",
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
          "The challenge sounded simple at first but it was actually harder than I expected. I started out with the most simple and naive solution I could think of by stacking the input fields on top of each other. There was no options for social media login, either. In terms of visual, I first used 8px for rounding the corners so the initial versions look pretty sharp.",
          "My judgement was that this was a good start but it did not feel right. So, I leaned into that intuition and started poking into other well-established signup designs. I checked out Claude, ChatGPT, and some signup UI on Mobbin and here is what I noticed:"
        ],
        bullets: [
          {
            label: "Rounded corners",
            text: "Most designs use rounded corners of 16-24px and very thin border thickness. The thickness only increases when the user clicks on the input field (focused mode).",
          },
          {
            label: "Grouping",
            text: "If information is of the same type (e.g., names), they can be grouped together like first name and last name on the same row.",
          },
          {
            label: "Email-first",
            text: "It seems like the apps I looked into try to reduce the number of input fields as much as possible by asking users to continue with Email. This might make the onboarding process quicker.",
          },
          {
            label: "Social sign-in",
            text: "Most designs have a social sign-in option. This is a great way to reduce the number of input fields as much as possible by asking users to continue with Email. This might make the onboarding process quicker.",
          },
        ],
      },
      {
        id: "rounded-corners",
        title: "Why Rounded Corners?",
        paragraphs: [
          "Rounded corners are a great way to add a modern and clean look to a design. They are also a great way to add a sense of warmth and friendliness to a design.",
        ],
      },
      {
        id: "Prototype",
        title: "Prototype",
        paragraphs: ["I created a prototype of the signup page using Figma."],
      },
      {
        id: "inspiration",
        title: "Inspiration",
        paragraphs: [
          "I was inspired by the design of the signup page from the Daily UI Challenge. [Montek](https://dribbble.com/shots/20632011--Montek-Sign-In-Sign-Up-Screens?utm_source=Clipboard_Shot&utm_campaign=asaldesign&utm_content=%C2%A0Montek%20-%20Sign%20In%20%26%20Sign%20Up%20Screens&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=asaldesign&utm_content=%C2%A0Montek%20-%20Sign%20In%20%26%20Sign%20Up%20Screens&utm_medium=Social_Share)",
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
