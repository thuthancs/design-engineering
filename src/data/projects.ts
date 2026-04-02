import creditCardCheckoutPreview from "@/app/assets/projects/credit-card-checkout/credit-card-checkout-preview.gif";
import mandySketch from "@/app/assets/projects/mandy/mandy-sketch.png";
import desktopSignup from "@/app/assets/projects/signup-page/desktop_signup.png";
import mobileSignup from "@/app/assets/projects/signup-page/mobile_signup.png";
import signupModal from "@/app/assets/projects/signup-page/signup_modal.svg";
import signupPreviewGif from "@/app/assets/projects/signup-page/signup_preview.gif";
import signupV0 from "@/app/assets/projects/signup-page/signup_v0.svg";
import signupV1 from "@/app/assets/projects/signup-page/signup_v1.svg";
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
  /**
   * Full-width preview in a 515px-tall frame (same height as signup crop), object-fit: cover.
   * Use for wide mockups; set cropModalFrame to false.
   */
  containHeightMatchSignup?: boolean;
  /** Detail page hero: use full main column width instead of the 448px phone cap. */
  detailFullWidth?: boolean;
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
  /** Shown after the day, e.g. "30 MARCH 2026". Ignored when `metaEyebrow` is set. */
  dateLabel: string;
  /** Replaces the default "Day N — date" line (e.g. status only). */
  metaEyebrow?: string;
  /** When false, project is omitted from the homepage grid but keeps /projects/[slug]. */
  showOnHomepage?: boolean;
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
  {
    slug: "credit-card-checkout",
    day: 2,
    dateLabel: "31 MARCH 2026",
    title: "Credit Card Checkout",
    summary:
      "A review-your-order screen with cart line items, promo code, totals, and a clear path to payment — Daily UI checkout exploration.",
    preview: {
      src: creditCardCheckoutPreview,
      width: 3012,
      height: 1558,
      alt: "Credit card checkout — review order with cart items and payment CTA",
      unoptimized: true,
      cropModalFrame: false,
      containHeightMatchSignup: true,
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "This challenge focuses on the moment before payment: reviewing what is in the cart, understanding discounts and fees, and feeling confident to continue. The layout pairs a scannable list of products on the left with a compact order summary and primary action on the right.",
        ],
      },
      {
        id: "design-decisions",
        title: "Design decisions",
        paragraphs: [
          "High-contrast typography for the page title and total keeps hierarchy obvious. Line items use a card pattern so quantity and remove actions stay aligned without crowding the product copy. The promo field and apply control sit above the breakdown so users see savings before tax and delivery.",
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        paragraphs: [
          "Checkout is rarely “one screen” in the real world — error states, empty carts, and payment method selection all deserve the same clarity. This mockup is a baseline for that story.",
        ],
      },
    ],
  },
  {
    slug: "mandy",
    day: 3,
    dateLabel: "",
    metaEyebrow: "IN PROGRESS",
    showOnHomepage: false,
    title: "Mandy",
    summary:
      "Character concept sheet for Mandy - someone who I'd love to be friends with.",
    preview: {
      src: mandySketch,
      width: 3300,
      height: 2550,
      alt: "Mandy character sheet — full body and expression sketches with handwritten labels",
      detailFullWidth: true,
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "On a random rainy day at my favourite cafe in SF on April's Fool 2026, I thought of Mandy. Mandy is a nerdy girl who loves reading and learning about many things that pique her interest. But she is also fun to be around because of her quirkiness and great sense of humor. Mandy is a casual person whose favourite clothes are a sweater and a pair of jeans. Mandy represents those are smart but chill and very hilarious.",
        ],
      },
    ],
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.day - b.day);
}

/** Design-engineering homepage grid only (excludes illustration-only entries). */
export function getHomepageProjects(): Project[] {
  return getAllProjects().filter((p) => p.showOnHomepage !== false);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
