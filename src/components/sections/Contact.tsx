import { Mail, MapPin } from 'lucide-react';
import { contact, headings, profile } from '@/data/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/sections/ContactForm';

const rowClass = 'flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm';
const iconClass =
  'flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent-from/15 to-accent-to/15 text-accent-from';

export default function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <h2
            id="contact-heading"
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {headings.contact.title} <span className="text-gradient">{headings.contact.accent}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{contact.intro}</p>

          <ul className="mt-8 grid gap-4">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className={`${rowClass} transition-colors hover:bg-muted`}
              >
                <span className={iconClass}>
                  <Mail aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">Email</span>
                  <span className="block font-semibold break-all text-foreground">
                    {profile.email}
                  </span>
                </span>
              </a>
            </li>
            <li className={rowClass}>
              <span className={iconClass}>
                <MapPin aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Location</span>
                <span className="block font-semibold text-foreground">{profile.location}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
