import nodemailer from 'nodemailer';

// Vercel serverless function: POST /api/contact sends the portfolio contact form through SMTP.
// Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL in the Vercel project settings.

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_FIELD_LENGTH = { name: 100, email: 254, message: 5000 } as const;
const MAX_BODY_BYTES = 16_000;
const DEFAULT_SMTP_PORT = 465;

function json(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === 'string' ? value.trim() : '';
}

/** Mirrors validateContact in src/lib/contact.ts; the server cannot trust the browser's check. */
function parsePayload(raw: unknown): ContactPayload | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const source = raw as Record<string, unknown>;
  const payload = {
    // Name goes into mail headers, so collapse any line breaks
    name: readString(source, 'name').replace(/[\r\n]+/g, ' '),
    email: readString(source, 'email'),
    message: readString(source, 'message'),
    company: readString(source, 'company'),
  };

  const isValid =
    payload.name.length > 0 &&
    payload.name.length <= MAX_FIELD_LENGTH.name &&
    EMAIL_PATTERN.test(payload.email) &&
    payload.email.length <= MAX_FIELD_LENGTH.email &&
    payload.message.length >= MIN_MESSAGE_LENGTH &&
    payload.message.length <= MAX_FIELD_LENGTH.message;

  return isValid ? payload : null;
}

function readSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || DEFAULT_SMTP_PORT;
  return {
    transport: {
      host: SMTP_HOST,
      port,
      secure: port === DEFAULT_SMTP_PORT,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    },
    from: SMTP_USER,
    to: CONTACT_TO_EMAIL || SMTP_USER,
  };
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json(413, { success: false, error: 'Message is too large.' });

  const raw: unknown = await request.json().catch(() => null);
  const payload = parsePayload(raw);
  if (!payload) return json(400, { success: false, error: 'Please check the form fields and try again.' });

  // Honeypot filled in: pretend success so bots get no signal
  if (payload.company) return json(200, { success: true });

  const config = readSmtpConfig();
  if (!config) {
    console.error('[contact] SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS');
    return json(503, { success: false, error: 'The contact form is not available right now.' });
  }

  try {
    await nodemailer.createTransport(config.transport).sendMail({
      from: { name: `${payload.name} via portfolio`, address: config.from },
      to: config.to,
      replyTo: { name: payload.name, address: payload.email },
      subject: `Portfolio message from ${payload.name}`,
      text: `${payload.message}\n\n— ${payload.name} (${payload.email})`,
    });
    return json(200, { success: true });
  } catch (error: unknown) {
    console.error('[contact] SMTP send failed', error);
    return json(502, { success: false, error: 'The message could not be sent right now.' });
  }
}
