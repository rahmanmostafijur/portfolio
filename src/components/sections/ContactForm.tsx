import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import { profile } from '@/data/profile';
import {
  buildMailtoLink,
  hasFormService,
  sendContactMessage,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact';
import { cn } from '@/lib/utils';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'mailto' }
  | { kind: 'error'; message: string; mailto: string };

const FIELDS: { name: keyof ContactValues; label: string; type: string; autoComplete: string }[] = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off' },
];

const inputClass =
  'mt-2 block w-full rounded-xl border bg-background px-4 py-3 text-foreground transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none';

function readValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  const read = (key: string) => String(data.get(key) ?? '');
  return { name: read('name'), email: read('email'), message: read('message') };
}

function StatusMessage({ status }: { status: Status }) {
  if (status.kind === 'success') {
    return (
      <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 aria-hidden className="size-4 shrink-0" />
        Thanks — your message was sent. I&apos;ll get back to you soon.
      </p>
    );
  }
  if (status.kind === 'mailto') {
    return (
      <p className="text-muted-foreground">
        Your email app should open with the message filled in. If it doesn&apos;t, email me at{' '}
        <a href={`mailto:${profile.email}`} className="font-semibold text-foreground underline">
          {profile.email}
        </a>
        .
      </p>
    );
  }
  if (status.kind === 'error') {
    return (
      <p className="flex items-start gap-2 text-red-600 dark:text-red-400">
        <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
        <span>
          {status.message}{' '}
          <a href={status.mailto} className="font-semibold underline">
            Send it by email instead
          </a>
          .
        </span>
      </p>
    );
  }
  return null;
}

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Honeypot: real visitors never fill this hidden field
    if (new FormData(form).get('company')) {
      setStatus({ kind: 'success' });
      return;
    }

    const values = readValues(form);
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    // No form service configured yet: hand off to the visitor's email app
    if (!hasFormService) {
      window.location.href = buildMailtoLink(values);
      setStatus({ kind: 'mailto' });
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      await sendContactMessage(values);
      form.reset();
      setStatus({ kind: 'success' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setStatus({ kind: 'error', message, mailto: buildMailtoLink(values) });
    }
  };

  const isSubmitting = status.kind === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot field, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5">
        {FIELDS.map((field) => {
          const error = errors[field.name];
          const errorId = `contact-${field.name}-error`;
          const shared = {
            id: `contact-${field.name}`,
            name: field.name,
            autoComplete: field.autoComplete,
            required: true,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? errorId : undefined,
            className: cn(inputClass, error ? 'border-red-600 dark:border-red-400' : 'border-zinc-500'),
          };
          return (
            <div key={field.name}>
              <label htmlFor={shared.id} className="text-sm font-semibold text-foreground">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea {...shared} rows={5} className={cn(shared.className, 'resize-y')} />
              ) : (
                <input {...shared} type={field.type} />
              )}
              {error && (
                <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : (
          <Send aria-hidden className="size-4" />
        )}
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>

      <div role="status" aria-live="polite" className="mt-4 text-sm">
        <StatusMessage status={status} />
      </div>
    </form>
  );
}
