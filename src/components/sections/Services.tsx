import { Brain, Database, Layers, Server, type LucideIcon } from 'lucide-react';
import { headings, services, type Service } from '@/data/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const serviceIcons: Record<Service['icon'], LucideIcon> = {
  layers: Layers,
  server: Server,
  brain: Brain,
  database: Database,
};

export default function Services() {
  return (
    <Section id="services" align="center" {...headings.services}>
      <ul className="grid gap-6 md:grid-cols-2">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <li key={service.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-accent-from to-accent-to text-white shadow-sm">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
