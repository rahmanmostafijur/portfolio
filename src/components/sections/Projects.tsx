import {
  ArrowUpRight,
  Bot,
  Boxes,
  ClipboardList,
  Download,
  Headset,
  ListChecks,
  Radar,
  ShoppingBag,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { headings, projects, type Project, type ProjectIcon } from '@/data/profile';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import SocialIcon from '@/components/ui/SocialIcon';

const placeholderIcons: Record<ProjectIcon, LucideIcon> = {
  'list-checks': ListChecks,
  headset: Headset,
  bot: Bot,
  boxes: Boxes,
  'clipboard-list': ClipboardList,
  radar: Radar,
  wind: Wind,
  'shopping-bag': ShoppingBag,
  download: Download,
};

// Dark gradients for placeholders, cycled so neighbouring cards differ
const PLACEHOLDER_GRADIENTS = [
  'from-purple-700 via-indigo-900 to-neutral-950',
  'from-sky-700 via-blue-900 to-neutral-950',
  'from-emerald-700 via-teal-900 to-neutral-950',
  'from-rose-700 via-fuchsia-900 to-neutral-950',
  'from-amber-700 via-orange-900 to-neutral-950',
  'from-indigo-700 via-violet-900 to-neutral-950',
];

const STATUS_DOT = {
  live: 'bg-emerald-400',
  progress: 'bg-amber-400',
  neutral: 'bg-white/70',
} as const;

// Bento layout from the template: rows alternate 7/5 and 5/7; an odd last card spans the full width
const ROW_HEIGHTS = ['h-[480px] md:h-[420px]', 'h-[480px] md:h-[380px]'];

function layoutFor(index: number, total: number): string {
  if (index === total - 1 && total % 2 === 1) return 'md:col-span-12 h-[440px] md:h-[360px]';
  const row = Math.floor(index / 2);
  const isFirstInRow = index % 2 === 0;
  const wide = row % 2 === 0 ? isFirstInRow : !isFirstInRow;
  return cn(wide ? 'md:col-span-7' : 'md:col-span-5', ROW_HEIGHTS[row % 2]);
}

function ProjectMedia({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <img
        src={project.image.src}
        srcSet={project.image.srcSet}
        sizes="(min-width: 768px) 60vw, 100vw"
        width={project.image.width}
        height={project.image.height}
        alt={project.image.alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
    );
  }

  // Designed placeholder until a real screenshot exists — decorative, the title is in the overlay
  const Icon = placeholderIcons[project.placeholderIcon];
  return (
    <div
      aria-hidden
      className={cn(
        'relative size-full bg-linear-to-br transition-transform duration-700 group-hover:scale-105',
        PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] opacity-10" />
      <span className="absolute top-6 right-6 flex size-16 items-center justify-center rounded-3xl border border-white/25 bg-white/10 text-white backdrop-blur-md sm:top-8 sm:right-8">
        <Icon className="size-8" />
      </span>
    </div>
  );
}

const roundLink =
  'flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[2.25rem] border border-foreground/10 shadow-xl">
      <div className="absolute inset-0 bg-neutral-950">
        <ProjectMedia project={project} index={index} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="flex flex-col gap-4 transition-transform duration-300 sm:flex-row sm:items-end sm:justify-between motion-safe:translate-y-2 motion-safe:group-hover:translate-y-0">
          <div className="max-w-lg">
            {(project.label || project.status) && (
              <div className="mb-3 flex flex-wrap gap-2">
                {project.status && (
                  <p className="flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <span aria-hidden className={cn('size-1.5 rounded-full', STATUS_DOT[project.status.tone])} />
                    {project.status.label}
                  </p>
                )}
                {project.label && (
                  <p className="w-fit rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {project.label}
                  </p>
                )}
              </div>
            )}
            <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-md md:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-white/85 md:text-base">{project.description}</p>
            {project.tech.length > 0 && (
              <ul aria-label={`${project.title} tech stack`} className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex shrink-0 gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                  className={roundLink}
                >
                  <SocialIcon name="github" className="size-5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo (opens in a new tab)`}
                  className={roundLink}
                >
                  <ArrowUpRight aria-hidden className="size-6" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" align="responsive" {...headings.projects}>
      <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((project, i) => (
          <li key={project.slug} className={layoutFor(i, projects.length)}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
