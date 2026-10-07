import { ExternalLink, ListChecks, ShoppingBag, Wind, type LucideIcon } from 'lucide-react';
import { headings, projects, type Project } from '@/data/profile';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import SocialIcon from '@/components/ui/SocialIcon';

const placeholderIcons: Record<Project['placeholderIcon'], LucideIcon> = {
  wind: Wind,
  'shopping-bag': ShoppingBag,
  'list-checks': ListChecks,
};

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image.src}
        srcSet={project.image.srcSet}
        sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
        width={project.image.width}
        height={project.image.height}
        alt={project.image.alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  // Designed placeholder until a real screenshot exists — decorative, the title is in the card body
  const Icon = placeholderIcons[project.placeholderIcon];
  return (
    <div
      aria-hidden
      className="flex size-full flex-col items-center justify-center gap-4 bg-linear-to-br from-accent-from to-accent-to p-8 text-center text-white"
    >
      <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
        <Icon className="size-8" />
      </span>
      <span className="max-w-[18ch] font-display text-xl leading-tight font-bold">{project.title}</span>
    </div>
  );
}

const linkClass =
  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors';

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg',
        featured && 'lg:grid lg:grid-cols-[1.15fr_1fr]',
      )}
    >
      <div
        className={cn(
          'aspect-[16/10] overflow-hidden border-b border-border bg-muted',
          featured && 'lg:aspect-auto lg:border-r lg:border-b-0',
        )}
      >
        <ProjectMedia project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {project.label && (
          <p className="mb-3 w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {project.label}
          </p>
        )}
        <h3 className="text-2xl font-bold tracking-tight text-foreground">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

        {project.tech.length > 0 && (
          <ul aria-label={`${project.title} tech stack`} className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo (opens in a new tab)`}
                className={cn(linkClass, 'bg-primary text-primary-foreground hover:opacity-90')}
              >
                Live demo
                <ExternalLink aria-hidden className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                className={cn(linkClass, 'border border-border text-foreground hover:bg-muted')}
              >
                <SocialIcon name="github" className="size-4" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" {...headings.projects}>
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug} className={cn(i === 0 && 'md:col-span-2')}>
            <Reveal delay={i * 0.08} className="h-full">
              <ProjectCard project={project} featured={i === 0} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
