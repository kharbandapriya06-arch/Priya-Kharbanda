export const DISCUSSION_TOPICS = [
  "UI/UX Design",
  "Website Design",
  "Freelance Project",
  "Job Opportunity",
  "Other",
] as const;

export type DiscussionTopic = (typeof DISCUSSION_TOPICS)[number];

const CONTACT_FIELDS = ["name", "email", "phone", "topic", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactInput = Record<ContactField, string>;

export type FieldErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const NAME_PATTERN = /^[\p{L}][\p{L}\s.'’-]*$/u;

export function isContactField(value: string): value is ContactField {
  return (CONTACT_FIELDS as readonly string[]).includes(value);
}

export function isDiscussionTopic(value: string): value is DiscussionTopic {
  return (DISCUSSION_TOPICS as readonly string[]).includes(value);
}

export function validateContact(raw: ContactInput): {
  errors: FieldErrors;
  value: ContactInput;
} {
  const name = raw.name.trim().replace(/\s+/g, " ");
  const email = raw.email.trim();
  const phone = raw.phone.trim();
  const topic = raw.topic.trim();
  const message = raw.message.trim().replace(/\r\n/g, "\n");
  const errors: FieldErrors = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Please enter a name using letters.";
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (
    email.length > 254 ||
    email.includes("..") ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    const shapeOk = /^\+?[\d\s().-]{7,24}$/.test(phone);
    if (!shapeOk || digits.length < 7 || digits.length > 15) {
      errors.phone = "Please enter a valid phone number, or leave this blank.";
    }
  }

  if (topic && !isDiscussionTopic(topic)) {
    errors.topic = "Please choose one of the listed topics.";
  }

  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < 10) {
    errors.message = "Please write a little more so I know how I can help.";
  } else if (message.length > 2000) {
    errors.message = "Please keep your message under 2,000 characters.";
  }

  return {
    errors,
    value: { name, email, phone, message, topic },
  };
}
