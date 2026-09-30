export type Role = {
  title: string;
  org: string;
  year: string;
  period: string;
  location?: string;
  summary: string;
  shots?: [string, string, string];
};

export const experience: Role[] = [
  {
    title: "Associate Designer",
    org: "Bough Consulting",
    year: "2026",
    period: "MAY – PRESENT",
    location: "New Delhi",
    summary:
      "Designing thoughtful digital experiences that enhance usability and drive business value. Transforming complex requirements into intuitive interfaces, workflows, and design solutions with product, business, and engineering teams.",
    shots: [
      "/Glamora/Glamora-2.png",
      "/Glamora/Glamora-1.png",
      "/Glamora/Glamora-3.png",
    ],
  },
  {
    title: "UI/UX Designer",
    org: "Freelance",
    year: "2025",
    period: "AUG – APR",
    location: "Remote",
    summary:
      "Designed responsive websites and mobile app interfaces across multiple industries. Created wireframes, prototypes, and design systems in Figma, working directly with clients to turn business goals into usable experiences.",
    shots: [
      "/Coffee%20BItes/COffee%20-2.png",
      "/Coffee%20BItes/Coffee%20-1.png",
      "/Coffee%20BItes/COffee%20-3.png",
    ],
  },
  {
    title: "UI/UX Designer Intern",
    org: "EazyByts",
    year: "2025",
    period: "SEPT – OCT",
    summary:
      "Designed mobile app screens, user flows, and dashboard experiences for MVP development. Built high-fidelity prototypes and reusable components in Figma, and tightened interface consistency through a design system.",
    shots: [
      "/Auraghnath/Aughurnath%20Temple-3.png",
      "/Auraghnath/Aughurnath%20Temple-1.png",
      "/Auraghnath/Aughurnath%20Temple-2.png",
    ],
  },
  {
    title: "UI/UX Designer Intern",
    org: "Chandigarh University",
    year: "2024",
    period: "MAY – JUN",
    location: "Chandigarh",
    summary:
      "Conducted user research, interviews, and journey mapping to identify user needs. Designed wireframes and interactive prototypes for stakeholder validation, and worked with developers in Agile sprints.",
    shots: [
      "/Yusuf_Bhai/Yusuf-2.png",
      "/Yusuf_Bhai/Yusuf-1.png",
      "/Yusuf_Bhai/Yusuf-3.png",
    ],
  },
];

export const education = [
  {
    title: "Diploma in UI/UX Design",
    org: "AND Academy",
    dates: "May 2025 – Dec 2025",
    location: "New Delhi",
    summary:
      "Intensive studio training across research, interaction design, and high-fidelity prototyping — building end-to-end product flows with critique and real briefs.",
    focus: ["UX research", "Interaction design", "Design systems", "Prototyping"],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    org: "Chandigarh University",
    dates: "Sept 2022 – June 2025",
    location: "Chandigarh",
    summary:
      "Computer science foundation paired with product thinking — learning how software is structured so design decisions stay sharp with engineering teams.",
    focus: ["Software fundamentals", "Web technologies", "Problem solving", "Collaboration"],
  },
] as const;
