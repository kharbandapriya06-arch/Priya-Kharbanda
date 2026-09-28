import { education } from "@/lib/experience";

export function Education() {
  return (
    <section className="education" aria-label="Education">
      <div className="education-intro">
        <p className="education-kicker">Learning</p>
        <h2 className="education-heading">
          <span className="text-gradient">Education</span>
        </h2>
        <p className="education-lead">
          Formal training that shaped how I research, design, and ship.
        </p>
      </div>

      <ol className="education-list">
        {education.map((item, index) => (
          <li key={item.org} className="education-item">
            <div className="education-meta">
              <span className="education-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="education-dates">{item.dates}</p>
            </div>

            <div className="education-body">
              <h3 className="education-org">{item.org}</h3>
              <p className="education-degree">{item.title}</p>
              {item.location ? (
                <p className="education-place">{item.location}</p>
              ) : null}
              <p className="education-copy">{item.summary}</p>
              <ul className="education-focus">
                {item.focus.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
