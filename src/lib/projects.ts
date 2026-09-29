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
    services: ["Typography", "User journeys", "Prototyping"],
    summary:
      "A scheduling and client-management app designed around clear journeys, high-fidelity screens, and light automation.",
    challenge:
      "Booking and follow-up lived in scattered chats and calendars. The product needed a flow that felt simple for first-time users without hiding the tools power users need.",
    approach:
      "I mapped user journeys, then designed wireframes and high-fidelity mobile screens in Figma. Interactive prototypes carried the micro-interactions; AI-assisted scheduling and automated notifications were designed into the core loop rather than bolted on.",
    outcome:
      "A complete mobile experience ready for MVP development — journeys, prototype, and interaction model in one system.",
    featured: true,
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
      "A 24-poster series exploring hierarchy, spacing, and alignment through type alone.",
    challenge:
      "The brief was to make a set that holds together as a collection while each poster still works on its own — no photography, no illustration.",
    approach:
      "I designed twenty-four posters as a typographic system: scale, measure, and alignment doing the visual work. Hierarchy is the subject, not decoration around it.",
    outcome:
      "A complete series that can be shown as a grid or as single pieces without losing the voice of the set.",
    featured: false,
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
    summary: "A new case study. Images and details will sit in this card.",
    challenge: "",
    approach: "",
    outcome: "",
    featured: true,
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
