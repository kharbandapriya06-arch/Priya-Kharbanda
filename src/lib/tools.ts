export type TechTool = {
  name: string;
  /** Drop the logo in `/public/tools/` and set this path (e.g. `/tools/figma.png`). */
  src: string | null;
  /** Horizontal position as % of the orbit stage (0–100). */
  x: number;
  /** Vertical position as % of the orbit stage (0–100). */
  y: number;
  size: "sm" | "md" | "lg";
  delay: number;
};

export const techTools: TechTool[] = [
  { name: "Figma", src: "/tools/figma.png", x: 12, y: 18, size: "lg", delay: 0 },
  { name: "Framer", src: "/tools/framer.png", x: 78, y: 14, size: "lg", delay: 0.4 },
  { name: "Spline", src: "/tools/Spline.png", x: 88, y: 42, size: "lg", delay: 0.8 },
  { name: "Photoshop", src: "/tools/Adobe_Photoshop.png", x: 82, y: 72, size: "md", delay: 1.2 },
  { name: "Notion", src: "/tools/Notion.png", x: 52, y: 86, size: "lg", delay: 0.2 },
  { name: "Lovable", src: "/tools/Lovable.png", x: 18, y: 78, size: "md", delay: 1.6 },
  { name: "Webflow", src: "/tools/Webflow.png", x: 6, y: 48, size: "md", delay: 1.0 },
  { name: "WordPress", src: "/tools/Wordpress.png", x: 68, y: 58, size: "sm", delay: 0.6 },
  { name: "Adobe XD", src: "/tools/Adobe_xd_.png", x: 28, y: 10, size: "sm", delay: 1.3 },
  { name: "Canva", src: "/tools/Canva.png", x: 92, y: 68, size: "md", delay: 0.9 },
];
