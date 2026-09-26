export const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: "discover",
    summary:
      "I dig into the problem space — talking to users, mapping journeys, and spotting friction before a single screen is drawn.",
  },
  {
    number: "02",
    title: "Define",
    icon: "define",
    summary:
      "Insights become clear goals, personas, and success metrics so the team knows what “good” looks like before we design.",
  },
  {
    number: "03",
    title: "Design",
    icon: "design",
    summary:
      "Wireframes grow into high-fidelity flows, systems, and prototypes — iterated with feedback until the experience feels inevitable.",
  },
  {
    number: "04",
    title: "Deliver",
    icon: "deliver",
    summary:
      "I partner with engineering to ship polished UI, handoff specs, and refinements that hold up in the real product.",
  },
] as const;

export type ProcessIcon = (typeof processSteps)[number]["icon"];
