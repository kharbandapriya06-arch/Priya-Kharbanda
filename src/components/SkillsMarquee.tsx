import { site } from "@/lib/site";

function MarqueeTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="skills-marquee-track" aria-hidden={ariaHidden || undefined}>
      {site.marquee.map((item) => (
        <li key={`${ariaHidden ? "b" : "a"}-${item}`} className="skills-marquee-item">
          <span className="skills-marquee-dot" aria-hidden />
          <span className="skills-marquee-label">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SkillsMarquee() {
  return (
    <section className="skills-marquee" aria-label="Skills and services">
      <div className="skills-marquee-viewport">
        <div className="skills-marquee-rail">
          <MarqueeTrack />
          <MarqueeTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
