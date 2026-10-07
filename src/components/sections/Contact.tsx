import { Mail, MapPin } from 'lucide-react';
import { contact, headings, profile } from '@/data/profile';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/sections/ContactForm';

const iconCircle =
  'glass-panel flex size-12 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="defer-render mx-auto w-full max-w-7xl px-6 py-24">
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-[3rem] border-foreground/10 p-6 sm:p-8 md:p-12">
          <div aria-hidden className="pointer-events-none absolute -top-64 -right-64 size-[36rem] bg-[radial-gradient(closest-side,rgba(139,92,246,0.18),transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-64 -left-64 size-[36rem] bg-[radial-gradient(closest-side,rgba(6,182,212,0.12),transparent)]" />

          <div className="relative z-10 flex flex-col gap-12 md:flex-row md:gap-24">
            <div className="flex-1 space-y-8">
              <div>
                <h2 id="contact-heading" className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {headings.contact.title} <span className="text-gradient-primary">{headings.contact.accent}</span>
                </h2>
                <p className="text-muted-foreground">{contact.intro}</p>
              </div>

              <ul className="space-y-6">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className={iconCircle}>
                      <Mail aria-hidden className="size-5" />
                    </span>
                    <span className="font-medium break-all">{profile.email}</span>
                  </a>
                </li>
                <li className="group flex items-center gap-4 text-muted-foreground">
                  <span className={iconCircle}>
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <span className="font-medium">{profile.location}</span>
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
