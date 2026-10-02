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
  brief?: {
    title: string;
    lead: string;
    aboutTitle: string;
    about: string;
    date: string;
    services: string;
    links: { label: string; href: string; image?: string }[];
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
    gallery?: string[];
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
      "The poster holds from across a room and still reads up close. Title, detail, and credit fall into place through scale and spacing alone, so the piece stands as one frame and sits cleanly with the rest of the type work.",
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
    brief: {
      title: "Type Based Poster",
      lead: "A 24-poster typographic exploration using the word “Revive” in EB Garamond — each composition is designed to convey mood and structure through grayscale type manipulation and hand-drawn thumbnails.",
      aboutTitle: "About the project",
      about:
        "This project is a type-based art sequence created over 24 unique compositions using the word “Revive” and the typeface EB Garamond. The aim was to explore typographic techniques — negative space, scale, layering, and minimalist layout — in grayscale format, emphasizing pure form and visual rhythm. From initial hand-drawn sketches to refined digital compositions, each poster challenges conventional hierarchy and invites viewer engagement through typographic abstraction.",
      date: "Mar 20, 2025",
      services: "Graphic Design · Typography",
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/232043973/TYPE-BASED-POSTER",
          image: "/behnace_new.png",
        },
      ],
    },
    cover: {
      from: "#141c28",
      to: "#7a9bb8",
      motif: "orbit",
      images: {
        primary: "/Type_based/TBP1.png",
        top: "/Type_based/TBP2.png",
        bottom: "/Type_based/TBP3.png",
      },
      gallery: [
        "/Type_based/TBP1.png",
        "/Type_based/TBP2.png",
        "/Type_based/TBP3.png",
        "/Type_based/TBP4.png",
        "/Type_based/TBP5.png",
        "/Type_based/TBP6.png",
        "/Type_based/TBP7.png",
        "/Type_based/TBP8.png",
        "/Type_based/TBP9.png",
        "/Type_based/TBP10.png",
      ],
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
      "The storefront now has a clear path from catalog to product, with a premium look that does not add steps to purchase. Twelve responsive screens, a reusable UI kit, and six rounds of usability testing left a system that can be built and extended without starting over.",
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
    brief: {
      title: "Coffee Bites Website",
      lead: "Designed and implemented the complete information architecture, UI kit, and 12-page layouts for a Wix-based e-commerce site. Successfully launched a fully responsive platform within 4 weeks, achieving sub-3-second load times and intuitive navigation, validated through 6 rounds of user testing.",
      aboutTitle: "About the project",
      about:
        "This project was about building a marketing website for Coffee Bites. The goal was to create a strong first impression with a fast, clear, and trustworthy web experience. The site needed to convey reliability while also embracing a friendly, welcoming aesthetic.",
      date: "Sep 1, 2024",
      services: "UI/UX Design",
      links: [
        {
          label: "Live site",
          href: "https://kharbandapriya50.wixsite.com/coffee-lover-1",
        },
      ],
    },
    cover: {
      from: "#2a1c14",
      to: "#c4a07a",
      motif: "rings",
      images: {
        primary: "/Coffee%20BItes/CF1.png",
        top: "/Coffee%20BItes/CF2.png",
        bottom: "/Coffee%20BItes/CF3.png",
      },
      gallery: [
        "/Coffee%20BItes/CF1.png",
        "/Coffee%20BItes/CF2.png",
        "/Coffee%20BItes/CF3.png",
        "/Coffee%20BItes/CF4.png",
        "/Coffee%20BItes/CF5.png",
        "/Coffee%20BItes/CF6.png",
      ],
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
      "Visitors can move from the homepage to a detail page without losing their place. A strict grid, a quieter type system, and shared components keep the temple site consistent on every screen, so the pages read as one design.",
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
    brief: {
      title: "Monument Webpage",
      lead: "A sleek and responsive web experience designed for Monument — a brand that blends architecture and minimal design. Focused on clarity, balance, and elegance, the project highlights a seamless browsing journey through refined layouts and strong visual hierarchy.",
      aboutTitle: "About the project",
      about:
        "The Monument Webpage project reimagines how architecture and design brands present themselves online. The goal was to create a visually immersive, user-centered website that communicates precision and sophistication. Through UX research, structured navigation, and clean UI principles, the design achieves a perfect balance between aesthetic appeal and functional clarity, ensuring smooth interaction across all screen sizes.",
      date: "Jul 1, 2025",
      services: "UI/UX Design",
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/241919991/Augharnath-Temple-Landing-page",
          image: "/behnace_new.png",
        },
      ],
    },
    cover: {
      from: "#1a1a18",
      to: "#8a8680",
      motif: "slash",
      images: {
        primary: "/Auraghnath/AGH1.png",
        top: "/Auraghnath/AGH2.png",
        bottom: "/Auraghnath/AGH3.png",
      },
      gallery: [
        "/Auraghnath/AGH1.png",
        "/Auraghnath/AGH2.png",
        "/Auraghnath/AGH3.png",
        "/Auraghnath/AGH4.png",
        "/Auraghnath/AGH5.png",
        "/Auraghnath/AGH6.png",
        "/Auraghnath/AGH7.png",
        "/Auraghnath/AGH8.png",
        "/Auraghnath/AGH9.png",
        "/Auraghnath/AGH10.png",
      ],
    },
  },
  {
    slug: "revive",
    title: "Yusuf Bhai Fragrance",
    client: "Product Breakdown",
    year: "2025",
    services: ["UX Researcher", "Art direction", "Print"],
    summary:
      "A product breakdown for Yusuf Bhai Fragrance, from the pack to the screen.",
    challenge:
      "The fragrance needed a clear story across touchpoints. The layout could not compete with the product.",
    approach:
      "I set a restrained system of type, spacing, and product stills so the scent story stays first, on the pack and on the screen.",
    outcome:
      "The fragrance stays first, on the pack and on the screen, inside a black-and-gold system that matches the brand. Clearer navigation, stronger cart feedback, and a mapped purchase flow give the shop a calmer path through a luxury catalog of attars and perfumes.",
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
    brief: {
      title: "Product Breakdown\n(Yusufbhai Fragrances)",
      lead: "A UX case study exploring the balance between luxury aesthetics and functional simplicity. Through careful research and experience mapping, I transformed Yusufbhai Fragrances’ digital presence into a seamless, emotionally engaging e-commerce journey.",
      aboutTitle: "About the project",
      about:
        "Yusufbhai Fragrances is a luxury e-commerce platform offering handcrafted attars and perfumes. This project focused on enhancing user flow, refining interactions, and aligning the digital experience with the brand’s premium identity. Through UX evaluation, flow mapping, and usability testing, I identified friction points and implemented design improvements like clearer navigation, better cart feedback, and a consistent black–gold aesthetic for a seamless, elegant user journey.",
      date: "Oct 2, 2025",
      services: "UX Research",
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/241957013/YusufBhaiFragrance-Product-Breakdown",
          image: "/behnace_new.png",
        },
      ],
    },
    cover: {
      from: "#1c1410",
      to: "#e24c2a",
      motif: "type",
      images: {
        primary: "/Yusuf_Bhai/YS1.png",
        top: "/Yusuf_Bhai/YS2.png",
        bottom: "/Yusuf_Bhai/YS3.png",
      },
      gallery: [
        "/Yusuf_Bhai/YS1.png",
        "/Yusuf_Bhai/YS2.png",
        "/Yusuf_Bhai/YS3.png",
        "/Yusuf_Bhai/YS4.png",
        "/Yusuf_Bhai/YS5.png",
        "/Yusuf_Bhai/YS6.png",
        "/Yusuf_Bhai/YS7.png",
        "/Yusuf_Bhai/YS8.png",
      ],
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
      "Each screen now leads with one next step, from the day’s schedule to a single client. The hierarchy leaves room for the product imagery, so booking, status, and follow-up stay obvious from the first look to the last.",
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
    brief: {
      title: "Glamora",
      lead: "A clean and intuitive digital experience designed for Glamora — a smart scheduling and client management platform for freelance beauty professionals. Rooted in clarity, efficiency, and user empathy, the project focuses on simplifying complex booking workflows through structured layouts, visual hierarchy, and seamless interactions. Glamora brings appointments, clients, services, and insights into one unified system, enabling makeup artists to stay organized, reduce errors, and deliver a smooth, professional booking journey for their clients.",
      aboutTitle: "About the project",
      about:
        "Glamora was designed to solve a real, everyday problem faced by freelance beauty professionals—managing bookings scattered across multiple platforms. Through user interviews and research, I identified how fragmented scheduling led to missed appointments, double bookings, and unnecessary stress. The design focuses on creating a clear, structured experience that brings clients, services, and schedules into one centralized system. By applying intuitive user flows, thoughtful information hierarchy, and clean UI patterns, Glamora transforms complex booking management into a smooth, reliable, and efficient experience. The final solution prioritizes ease of use, reduces cognitive load, and empowers professionals to stay organized while delivering a polished and professional experience to their clients.",
      date: "Jan 11, 2026",
      services: "UI/UX Design",
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/241866821/Glamora-Appointment-Scheduling-Client-Management",
          image: "/behnace_new.png",
        },
      ],
    },
    cover: {
      from: "#12141c",
      to: "#8a93a6",
      motif: "grid",
      images: {
        primary: "/Glamora/GM1.png",
        top: "/Glamora/GM2.png",
        bottom: "/Glamora/GM3.png",
      },
      gallery: [
        "/Glamora/GM1.png",
        "/Glamora/GM2.png",
        "/Glamora/GM3.png",
        "/Glamora/GM4.png",
        "/Glamora/GM5.png",
        "/Glamora/GM6.png",
        "/Glamora/GM7.png",
        "/Glamora/GM8.png",
        "/Glamora/GM9.png",
        "/Glamora/GM10.png",
        "/Glamora/GM11.png",
        "/Glamora/GM12.png",
        "/Glamora/GM13.png",
        "/Glamora/GM14.png",
        "/Glamora/GM15.png",
        "/Glamora/GM16.png",
        "/Glamora/GM17.png",
        "/Glamora/GM18.png",
        "/Glamora/GM19.png",
        "/Glamora/GM20.png",
      ],
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
