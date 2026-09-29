export const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: "discover",
    summary: "Understand the people and the problem before a single screen is drawn.",
  },
  {
    number: "02",
    title: "Define",
    icon: "define",
    summary: "Turn what I learn into a direction the work can actually follow.",
  },
  {
    number: "03",
    title: "Design",
    icon: "design",
    summary: "Shape the flows, the interface, and the system behind them.",
  },
  {
    number: "04",
    title: "Deliver",
    icon: "deliver",
    summary: "Ship a considered product, with a handoff that holds up in build.",
  },
] as const;

export type ProcessIcon = (typeof processSteps)[number]["icon"];
