"use client";

import Image from "next/image";
import { site } from "@/lib/site";

const tags = [
  { label: "Product design", tone: "burgundy" },
  { label: "UX research", tone: "lime" },
  { label: "Interaction design", tone: "amber" },
  { label: "Design systems", tone: "forest" },
  { label: "Information architecture", tone: "blush" },
  { label: "Prototyping", tone: "lilac" },
  { label: "Figma", tone: "ink" },
] as const;

export function AboutMe() {
  return (
    <section id="about" className="about-me" aria-label="About me">
      <div className="about-me-inner">
        <div className="about-me-collage">
          <div className="about-me-stage">
            <Image
              src="/about_me.png"
              alt={`${site.name} — designer collage`}
              width={900}
              height={900}
              className="about-me-photo"
              priority={false}
            />
            <span className="about-me-float about-me-float-a" aria-hidden>
              UI / UX
            </span>
            <span className="about-me-float about-me-float-b" aria-hidden>
              Research → Design
            </span>
            <span className="about-me-float about-me-float-c" aria-hidden>
              ★
            </span>
          </div>
        </div>

        <div className="about-me-copy">
          <p className="about-me-kicker">About me</p>
          <h2 className="about-me-heading">
            I like figuring out why things work, and why they don&apos;t.
          </h2>
          <div className="about-me-body">
            <p>
              I&apos;m Priya Kharbanda, a UI/UX Designer based in India. I&apos;m
              passionate about creating intuitive and aesthetically pleasing
              digital experiences that solve real user problems and align with
              business goals.
            </p>
            <p>
              What drives me is the chance to build meaningful digital
              experiences. I use new technology to turn ideas into practical,
              easy-to-understand designs. I enjoy challenging myself to keep my
              work fresh and creative.
            </p>
          </div>

          <ul className="about-me-tags">
            {tags.map((tag) => (
              <li key={tag.label} className={`about-me-tag is-${tag.tone}`}>
                {tag.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
