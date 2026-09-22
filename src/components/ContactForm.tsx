"use client";

import { FormEvent, useState, type ReactNode } from "react";
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
      project_type: formData.get("project_type"),
      budget: formData.get("budget"),
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
      const result = (await response.json()) as { success?: boolean; message?: string };

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

  if (status === "success") {
    return (
      <div className="border border-line bg-surface px-6 py-10 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Sent
        </p>
        <h3 className="mt-3 font-serif text-3xl leading-none">Thank you.</h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted">
          I read every note and usually reply within a few days. If it is
          urgent, email {site.email}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="field"
          placeholder="Your name"
        />
      </Field>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field"
          placeholder="you@studio.com"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Project type" htmlFor="project_type">
          <select id="project_type" name="project_type" required className="field">
            <option value="">Select one</option>
            <option>Brand identity</option>
            <option>Product design</option>
            <option>Website</option>
            <option>Art direction</option>
            <option>Something else</option>
          </select>
        </Field>
        <Field label="Budget" htmlFor="budget">
          <select id="budget" name="budget" className="field">
            <option value="">Optional</option>
            <option>Under $8k</option>
            <option>$8k – $20k</option>
            <option>$20k – $50k</option>
            <option>$50k+</option>
            <option>Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="field resize-y"
          placeholder="What are you making, and when would you like to start?"
        />
      </Field>

      {status === "missing-key" && (
        <p className="text-sm leading-6 text-accent">
          Add your Web3Forms access key to{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code>{" "}
          in <code className="font-mono text-xs">.env.local</code>, then restart
          the dev server. Until then, email {site.email}.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm leading-6 text-accent">{errorMessage}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs leading-5 text-muted">
          Submissions go to email through Web3Forms. No account required on this
          site.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
