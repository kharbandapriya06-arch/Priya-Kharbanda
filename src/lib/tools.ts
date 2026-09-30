export type TechGroup = "design" | "build" | "plan";

export type TechTool = {
  name: string;
  /** Drop the logo in `/public/tools/` and set this path (e.g. `/tools/figma.png`). */
  src: string | null;
  group: TechGroup;
  note: string;
};

export const techGroups: { id: "all" | TechGroup; label: string }[] = [
  { id: "all", label: "All" },
  { id: "design", label: "Design" },
  { id: "build", label: "Build" },
  { id: "plan", label: "Plan" },
];

export const techTools: TechTool[] = [
  { name: "Figma", src: "/tools/figma.png", group: "design", note: "Interfaces, flows, and design systems." },
  { name: "Framer", src: "/tools/framer.png", group: "design", note: "Sites that move, from layout to publish." },
  { name: "Spline", src: "/tools/Spline.png", group: "design", note: "3D objects made for the screen." },
  { name: "Photoshop", src: "/tools/Adobe_Photoshop.png", group: "design", note: "Image work, retouching, and detail." },
  { name: "Adobe XD", src: "/tools/Adobe_xd_.png", group: "design", note: "Early screens and clickable drafts." },
  { name: "Canva", src: "/tools/Canva.png", group: "design", note: "Fast visuals when the brief is short." },
  { name: "Webflow", src: "/tools/Webflow.png", group: "build", note: "Visual sites with real layout control." },
  { name: "WordPress", src: "/tools/Wordpress.png", group: "build", note: "Content sites that other people can edit." },
  { name: "Lovable", src: "/tools/Lovable.png", group: "build", note: "A quick way into a working draft." },
  { name: "HTML", src: "/tools/HTML_5.png", group: "build", note: "The structure under the page." },
  { name: "CSS", src: "/tools/CSS_3.png", group: "build", note: "Layout, type, and the feel of a screen." },
  { name: "JavaScript", src: "/tools/JavaScript.png", group: "build", note: "The interaction on top of the layout." },
  { name: "React", src: "/tools/React.js.png", group: "build", note: "Interface pieces that stay in sync." },
  { name: "Node.js", src: "/tools/Node.js.png", group: "build", note: "The side of the product you don’t see." },
  { name: "Notion", src: "/tools/Notion.png", group: "plan", note: "Notes, briefs, and the plan beside the work." },
];
