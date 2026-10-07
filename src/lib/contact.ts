import { profile } from '@/data/profile';

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_FIELD_LENGTH = { name: 100, email: 254, message: 5000 } as const;
const CONTACT_ENDPOINT = '/api/contact';
const REQUEST_TIMEOUT_MS = 15000;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > MAX_FIELD_LENGTH.name) errors.name = 'Please keep your name under 100 characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email) || email.length > MAX_FIELD_LENGTH.email)
    errors.email = 'Please enter a valid email address, like name@example.com.';

  if (message.length < MIN_MESSAGE_LENGTH)
    errors.message = `Please write at least ${MIN_MESSAGE_LENGTH} characters.`;
  else if (message.length > MAX_FIELD_LENGTH.message)
    errors.message = 'Please keep your message under 5,000 characters.';

  return errors;
}

/** Pre-filled mailto link: the fallback when sending fails. */
export function buildMailtoLink(values: ContactValues): string {
  const subject = `Portfolio message from ${values.name.trim()}`;
  const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Sends the message through the SMTP function at /api/contact. Throws an Error with a user-facing message on failure. */
export async function sendContactMessage(values: ContactValues): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }),
      signal: controller.signal,
    });

    const result: unknown = await response.json().catch(() => null);
    const isSuccess =
      response.ok && typeof result === 'object' && result !== null && 'success' in result && result.success === true;

    if (!isSuccess) {
      throw new Error('The message could not be sent right now.');
    }
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The request timed out.', { cause: error });
    }
    if (error instanceof Error && error.message.startsWith('The message')) throw error;
    throw new Error('Network error — please check your connection.', { cause: error });
  } finally {
    window.clearTimeout(timeout);
  }
}
