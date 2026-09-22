"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error" | "missing-key";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("missing-key");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New inquiry from ${site.name} portfolio`,
      from_name: site.name,
      name: formData.get("name"),
      email: formData.get("email"),
      website: formData.get("website"),
      message: formData.get("message"),
      botcheck: formData.get("botcheck") ? "true" : "",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (result.success) {
        form.reset();
        setStatus("success");
        return;
      }

      setErrorMessage(result.message || "The form could not be sent.");
      setStatus("error");
    } catch {
      setErrorMessage("Something went wrong. Please email me directly.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-grid">
        <aside className="contact-card contact-card--info">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-lead">
            I’m here to discuss your project and bring your ideas to life with
            thoughtful design.
          </p>
          <ul className="contact-details">
            <li>
              <span className="contact-icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <rect
                    x="3.5"
                    y="5.5"
                    width="17"
                    height="13"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4 7.2 12 13l8-5.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span className="contact-icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="12"
                    cy="9.8"
                    r="2.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
              <span>{site.location}</span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M7.2 3.8h3.1l1.2 3.1-2 1.2a12.4 12.4 0 0 0 6.4 6.4l1.2-2 3.1 1.2v3.1c0 .7-.6 1.3-1.3 1.3C10.6 18.1 5.9 13.4 5.9 5.1c0-.7.6-1.3 1.3-1.3Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
          </ul>
        </aside>

        <div className="contact-card contact-card--form">
          {status === "success" ? (
            <div className="contact-success">
              <h3>Thank you.</h3>
              <p>
                I read every note and usually reply within a few days. If it is
                urgent, email {site.email}.
              </p>
              <button
                type="button"
                className="contact-submit"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <label className="sr-only" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="contact-input"
                placeholder="Your Name*"
              />

              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="contact-input"
                placeholder="Email Address*"
              />

              <label className="sr-only" htmlFor="website">
                Your website
              </label>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="url"
                className="contact-input"
                placeholder="Your Website (Optional)"
              />

              <label className="sr-only" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="contact-input contact-input--area"
                placeholder="Write your message..."
              />

              {status === "missing-key" && (
                <p className="contact-note">
                  Add your Web3Forms access key to{" "}
                  <code>NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code>, then restart
                  the server. Until then, email {site.email}.
                </p>
              )}

              {status === "error" && (
                <p className="contact-note">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="contact-submit"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
