import { site } from "@/lib/site";
import {
  type ContactInput,
  type FieldErrors,
  validateContact,
} from "@/lib/contact";
import { NextResponse } from "next/server";

const MIN_FILL_MS = 1500;
const MAX_AGE_MS = 1000 * 60 * 60 * 48;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS = 5;
const MAX_BODY_CHARS = 12_000;

const submissions = new Map<string, number[]>();

type Payload = ContactInput & {
  hp_field?: unknown;
  botcheck?: unknown;
  formLoadedAt?: unknown;
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function sameOrigin(request: Request) {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  if (!host || !origin) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function honeypotTripped(body: Payload, fields: ContactInput) {
  const checkbox =
    typeof body.botcheck === "string" ? body.botcheck.trim() : "";
  if (checkbox) return true;

  const hidden = typeof body.hp_field === "string" ? body.hp_field.trim() : "";
  if (!hidden) return false;

  const sameAsName = hidden.toLowerCase() === fields.name.trim().toLowerCase();
  const sameAsEmail =
    hidden.toLowerCase() === fields.email.trim().toLowerCase();
  return !sameAsName && !sameAsEmail;
}

function timingProblem(value: unknown) {
  const started = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(started)) return "invalid" as const;

  const elapsed = Date.now() - started;
  if (elapsed < MIN_FILL_MS) return "too-fast" as const;
  if (elapsed > MAX_AGE_MS || elapsed < -5_000) return "invalid" as const;
  return null;
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );

  if (recent.length >= MAX_SUBMISSIONS) {
    submissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);

  if (submissions.size > 500) {
    for (const [key, times] of submissions) {
      const fresh = times.filter((time) => now - time < WINDOW_MS);
      if (fresh.length === 0) submissions.delete(key);
      else submissions.set(key, fresh);
    }
  }

  return false;
}

function readFields(body: Payload): ContactInput {
  const read = (value: unknown) => (typeof value === "string" ? value : "");
  return {
    name: read(body.name),
    email: read(body.email),
    phone: read(body.phone),
    topic: read(body.topic),
    message: read(body.message),
  };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json(
      {
        ok: false,
        message: "Something went wrong. Please email me directly.",
      },
      403,
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return json(
      { ok: false, message: "That message is too long to send." },
      413,
    );
  }

  let body: Payload;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid payload");
    }
    body = parsed as Payload;
  } catch {
    return json(
      {
        ok: false,
        message: "Something went wrong. Please email me directly.",
      },
      400,
    );
  }

  const fields = readFields(body);
  if (honeypotTripped(body, fields)) {
    return json({ ok: true });
  }

  const { errors, value } = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, fieldErrors: errors satisfies FieldErrors }, 400);
  }

  const timing = timingProblem(body.formLoadedAt);
  if (timing === "too-fast") {
    return json(
      { ok: false, message: "Please wait a moment and try again." },
      400,
    );
  }
  if (timing === "invalid") {
    return json(
      { ok: false, message: "Please refresh the page and try again." },
      400,
    );
  }

  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "";

  if (!accessKey) {
    return json({ ok: false, code: "missing-key" }, 503);
  }

  if (rateLimited(clientIp(request))) {
    return json(
      {
        ok: false,
        message: `Too many messages just now. Please try again in a few minutes, or email ${site.email}.`,
      },
      429,
    );
  }

  const subject = value.topic
    ? `Portfolio inquiry: ${value.topic}`
    : `New inquiry from ${site.name} portfolio`;

  // Web3Forms blocks server-side requests, so the browser sends the message
  // after these checks pass. The key is only returned for an accepted form.
  return json({
    ok: true,
    delivery: {
      access_key: accessKey,
      subject,
      from_name: site.name,
      name: value.name,
      email: value.email,
      phone: value.phone || "Not provided",
      topic: value.topic || "Not specified",
      message: value.message,
    },
  });
}
