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
    <Section id="services" align="center" gradientTitle {...headings.services}>
      <ul className="grid gap-6 md:grid-cols-2">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <li key={service.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full rounded-[2rem] border border-border/80 bg-card/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                  <span className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon aria-hidden className="size-7" />
                  </span>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{service.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
