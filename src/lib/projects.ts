export type Motif = "rings" | "grid" | "slash" | "type" | "blocks" | "orbit";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  featured: boolean;
  study: {
    eyebrow: string;
    headline: string;
    accent: string;
    role: string;
    duration: string;
    type: string;
    status: string;
  };
  cover: {
    from: string;
    to: string;
    motif: Motif;
    images?: {
      primary?: string;
      top?: string;
      bottom?: string;
    };
  };
};

export const projects: Project[] = [
  {
    slug: "smart-scheduling",
    title: "Type Based Poster",
    client: "Typography",
    year: "2025",
    services: ["Typography", "Poster design", "Hierarchy"],
    summary:
      "A poster built from type alone, where scale, spacing, and alignment do the visual work.",
    challenge:
      "The piece had to read as one poster and still hold from across a room. No photography and no illustration to lean on.",
    approach:
      "I treated type size, measure, and alignment as the subject. Hierarchy comes from scale and spacing, not from decoration around the words.",
    outcome:
      "A poster that stands on its own and still sits comfortably beside the rest of the type work.",
    featured: true,
    study: {
      eyebrow: "Typography · 2025",
      headline: "A poster where type",
      accent: "does all the work.",
      role: "Graphic Designer",
      duration: "2025",
      type: "Poster",
      status: "Case study",
    },
    cover: {
      from: "#141c28",
      to: "#7a9bb8",
      motif: "orbit",
      images: {
        primary: "/Type_based/Type-Based-1.png",
        top: "/Type_based/Type-Based-2.png",
        bottom: "/Type_based/Type-Based-3.png",
      },
    },
  },
  {
    slug: "coffeebites",
    title: "CoffeeBites",
    client: "E-commerce",
    year: "2025",
    services: ["E-commerce", "Information architecture", "Usability testing"],
    summary:
      "A 12-page e-commerce site with a full UI kit, validated through six usability tests.",
    challenge:
      "The catalog needed to feel premium without making the path to purchase longer. Navigation and product hierarchy were unclear in early drafts.",
    approach:
      "I designed the information architecture, a reusable UI kit, and high-fidelity screens for twelve pages. The layout is responsive. Six usability tests shaped iteration before handoff.",
    outcome:
      "A consistent storefront system — IA, components, and tested UI — ready to build and extend.",
    featured: true,
    study: {
      eyebrow: "E-commerce · 2025",
      headline: "A storefront that stays premium",
      accent: "without a longer checkout.",
      role: "UI/UX Designer",
      duration: "2025",
      type: "E-commerce",
      status: "Case study",
    },
    cover: {
      from: "#2a1c14",
      to: "#c4a07a",
      motif: "rings",
      images: {
        primary: "/Coffee%20BItes/Coffee%20-1.png",
        top: "/Coffee%20BItes/COffee%20-2.png",
        bottom: "/Coffee%20BItes/COffee%20-3.png",
      },
    },
  },
  {
    slug: "monument",
    title: "Augharnath Temple",
    client: "UI/UX Case Study",
    year: "2025",
    services: ["Web design", "Responsive layout", "UI components"],
    summary:
      "A modern, minimal website built on a grid, with clearer flows and components for navigation.",
    challenge:
      "The content was strong; the structure was not. Visitors could not tell where to go next, and the layout broke down on smaller screens.",
    approach:
      "I used a strict grid and a restrained type system, then designed user flows and UI components so navigation stayed obvious from homepage to detail.",
    outcome:
      "A responsive site that reads as one piece of design instead of a stack of disconnected pages.",
    featured: true,
    study: {
      eyebrow: "UI/UX · 2025",
      headline: "A calmer site for",
      accent: "Augharnath Temple.",
      role: "UI/UX Designer",
      duration: "2025",
      type: "Website",
      status: "Case study",
    },
    cover: {
      from: "#1a1a18",
      to: "#8a8680",
      motif: "slash",
      images: {
        primary: "/Auraghnath/Aughurnath%20Temple-1.png",
        top: "/Auraghnath/Aughurnath%20Temple-3.png",
        bottom: "/Auraghnath/Aughurnath%20Temple-2.png",
      },
    },
  },
  {
    slug: "revive",
    title: "Yusuf Bhai Fragrance",
    client: "Product Breakdown",
    year: "2025",
    services: ["UI/UX", "Art direction", "Print"],
    summary:
      "A product breakdown for Yusuf Bhai Fragrance, from the pack to the screen.",
    challenge:
      "The fragrance needed a clear story across touchpoints. The layout could not compete with the product.",
    approach:
      "I set a restrained system of type, spacing, and product stills so the scent story stays first, on the pack and on the screen.",
    outcome:
      "A breakdown that reads as a set or as single frames without losing the brand voice.",
    featured: false,
    study: {
      eyebrow: "Product · 2025",
      headline: "Breaking down Yusuf Bhai",
      accent: "from pack to screen.",
      role: "Product & Graphic Designer",
      duration: "2025",
      type: "Product breakdown",
      status: "Case study",
    },
    cover: {
      from: "#1c1410",
      to: "#e24c2a",
      motif: "type",
      images: {
        primary: "/Yusuf_Bhai/Yusuf-1.png",
        top: "/Yusuf_Bhai/Yusuf-2.png",
        bottom: "/Yusuf_Bhai/Yusuf-3.png",
      },
    },
  },
  {
    slug: "new-project",
    title: "Glamora",
    client: "UI/UX Case Study",
    year: "2026",
    services: ["UI/UX"],
    summary:
      "A UI/UX case study for Glamora, shaping the first screens around one clear next step.",
    challenge:
      "The brand look was already there. The path through the product was not. It was hard to tell what to do first.",
    approach:
      "I designed the key screens around one action at a time, with a simple hierarchy and room for the product imagery.",
    outcome:
      "A set of screens where the next step stays obvious from the first look to the last.",
    featured: true,
    study: {
      eyebrow: "UI/UX · 2026",
      headline: "Glamora, designed around",
      accent: "one clear next step.",
      role: "UI/UX Designer",
      duration: "2026",
      type: "UI/UX case study",
      status: "Case study",
    },
    cover: {
      from: "#12141c",
      to: "#8a93a6",
      motif: "grid",
      images: {
        primary: "/Glamora/Glamora-1.png",
        top: "/Glamora/Glamora-2.png",
        bottom: "/Glamora/Glamora-3.png",
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
