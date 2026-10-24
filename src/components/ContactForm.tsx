"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  DISCUSSION_TOPICS,
  type ContactField,
  type ContactInput,
  type FieldErrors,
  isContactField,
  validateContact,
} from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "missing-key";

const contactLines = ["trustworthy", "intuitive", "that clicks."];
const fieldOrder: ContactField[] = [
  "name",
  "email",
  "phone",
  "topic",
  "message",
];

function readInput(form: HTMLFormElement): ContactInput {
  const formData = new FormData(form);
  const read = (name: ContactField) => String(formData.get(name) ?? "");
  return {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    topic: read("topic"),
    message: read("message"),
  };
}

function focusFirstInvalid(form: HTMLFormElement, fieldErrors: FieldErrors) {
  const field = fieldOrder.find((name) => fieldErrors[name]);
  if (!field) return;
  form.querySelector<HTMLElement>(`#${field}`)?.focus();
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [lineIndex, setLineIndex] = useState(0);
  const [prevLine, setPrevLine] = useState<number | null>(null);
  const formLoadedAt = useRef<number | null>(null);

  if (formLoadedAt.current === null && typeof window !== "undefined") {
    formLoadedAt.current = Date.now();
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setLineIndex((current) => {
        const next = (current + 1) % contactLines.length;
        window.setTimeout(() => setPrevLine(current), 0);
        return next;
      });
    }, 3200);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (prevLine === null) return;
    const clear = window.setTimeout(() => setPrevLine(null), 700);
    return () => window.clearTimeout(clear);
  }, [prevLine, lineIndex]);

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
    ) {
      return;
    }

    const field = target.name;
    if (!isContactField(field) || !errors[field]) return;

    const { errors: nextErrors } = validateContact(readInput(event.currentTarget));
    setErrors((current) => {
      const next = { ...current };
      if (nextErrors[field]) next[field] = nextErrors[field];
      else delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { errors: nextErrors, value } = validateContact(readInput(form));

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage("");
      setStatus("idle");
      focusFirstInvalid(form, nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...value,
          hp_field: String(formData.get("hp_field") ?? ""),
          botcheck: formData.get("botcheck") ? "true" : "",
          formLoadedAt: formLoadedAt.current,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        code?: string;
        message?: string;
        fieldErrors?: FieldErrors;
        delivery?: Record<string, string>;
      };

      if (result.ok && result.delivery) {
        const sent = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(result.delivery),
        });
        const delivered = (await sent.json()) as {
          success?: boolean;
          message?: string;
        };

        if (!delivered.success) {
          setErrorMessage(delivered.message || "The form could not be sent.");
          setStatus("error");
          return;
        }
      }

      if (result.ok) {
        form.reset();
        setErrors({});
        setStatus("success");
        return;
      }

      if (result.code === "missing-key") {
        setStatus("missing-key");
        return;
      }

      if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        setErrors(result.fieldErrors);
        setStatus("idle");
        focusFirstInvalid(form, result.fieldErrors);
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
      <div className="contact-panel">
        <div className="contact-panel-copy">
          <p className="contact-kicker">{site.availability}</p>

          <h2 className="contact-title" aria-live="polite">
            <span className="contact-title-line">let&apos;s make</span>
            <span className="contact-title-line">something</span>
            <span className="contact-title-slot">
              {contactLines.map((line, i) => (
                <span
                  key={line}
                  className={cn(
                    "contact-title-word",
                    "contact-title-accent",
                    i === lineIndex && "is-active",
                    i === prevLine && "is-exit",
                  )}
                  aria-hidden={i !== lineIndex}
                >
                  {line}
                </span>
              ))}
            </span>
          </h2>

          <div className="contact-actions">
            {site.socials.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  className="contact-icon"
                  href={social.href}
                  aria-label={social.label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- local public icon */}
                  <img src={social.image} alt="" />
                </a>
              );
            })}
          </div>

        </div>

        <div className="contact-form-wrap">
          {status === "success" ? (
            <div className="contact-success">
              <h3>Thank you.</h3>
              <p>
                I read every note and usually reply within a few days. If it is
                urgent, email {site.email}.
              </p>
              <button
                type="button"
                className="contact-btn contact-btn--solid"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onChange={handleChange}
              className="contact-form"
              noValidate
            >
              <div className="contact-field">
                <label className="sr-only" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "contact-input",
                    errors.name && "contact-input--invalid",
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="contact-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "contact-input",
                    errors.email && "contact-input--invalid",
                  )}
                  placeholder="Email"
                />
                {errors.email && (
                  <p id="email-error" className="contact-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label className="sr-only" htmlFor="phone">
                  Phone number, optional
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={cn(
                    "contact-input",
                    errors.phone && "contact-input--invalid",
                  )}
                  placeholder="Phone number (optional)"
                />
                {errors.phone && (
                  <p id="phone-error" className="contact-error" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label className="sr-only" htmlFor="topic">
                  What would you like to discuss? Optional.
                </label>
                <div className="contact-select-wrap">
                  <select
                    id="topic"
                    name="topic"
                    defaultValue=""
                    aria-invalid={errors.topic ? true : undefined}
                    aria-describedby={errors.topic ? "topic-error" : undefined}
                    className={cn(
                      "contact-input",
                      "contact-select",
                      errors.topic && "contact-input--invalid",
                    )}
                  >
                    <option value="">What would you like to discuss?</option>
                    {DISCUSSION_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.topic && (
                  <p id="topic-error" className="contact-error" role="alert">
                    {errors.topic}
                  </p>
                )}
              </div>

              <div className="contact-field">
                <label className="sr-only" htmlFor="message">
                  Write your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  aria-required="true"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "contact-input",
                    "contact-input--area",
                    errors.message && "contact-input--invalid",
                  )}
                  placeholder="Write your message"
                />
                {errors.message && (
                  <p id="message-error" className="contact-error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="hp_field">Leave this field empty</label>
                <input
                  id="hp_field"
                  name="hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultChecked={false}
                />
              </div>

              {status === "missing-key" && (
                <p className="contact-note">
                  Add <code>WEB3FORMS_ACCESS_KEY</code> to your env file, then
                  restart the server. Until then, email {site.email}.
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
                <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
                <span className="contact-submit-arrow" aria-hidden>
                  <svg viewBox="0 0 16 16">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
