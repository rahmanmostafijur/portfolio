import {
  Atom,
  BookOpen,
  Brain,
  CodeXml,
  Container,
  Database,
  FileCode,
  Layers,
  MessageSquare,
  Puzzle,
  Rocket,
  Server,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  headings,
  learnerNote,
  professionalTraits,
  skillProficiencies,
  type SkillIcon,
  type TraitIcon,
} from '@/data/profile';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const skillIcons: Record<SkillIcon, { icon: LucideIcon; color: string }> = {
  python: { icon: FileCode, color: 'text-emerald-500' },
  react: { icon: Atom, color: 'text-cyan-500' },
  code: { icon: CodeXml, color: 'text-blue-500' },
  database: { icon: Database, color: 'text-amber-500' },
  container: { icon: Container, color: 'text-sky-500' },
  brain: { icon: Brain, color: 'text-purple-500' },
};

const traitIcons: Record<TraitIcon, LucideIcon> = {
  puzzle: Puzzle,
  layers: Layers,
  users: Users,
  target: Target,
  message: MessageSquare,
  book: BookOpen,
};

// Tinted pill colours from the template's "traits" chips, darkened in light mode for contrast
const TONES = [
  'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300',
  'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  'border-yellow-500/30 bg-yellow-500/10 text-yellow-800 dark:text-yellow-300',
  'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
];

const cardClass = 'glass-panel h-full rounded-[2rem] border-foreground/15 p-6 shadow-xl sm:p-8';

interface CardHeaderProps {
  icon: LucideIcon;
  title: string;
  tag: string;
}

function CardHeader({ icon: Icon, title, tag }: CardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 border-b border-foreground/80 pb-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Icon aria-hidden className="size-5 text-primary" />
        {title}
      </h3>
      <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold tracking-wider whitespace-nowrap text-muted-foreground uppercase">
        {tag}
      </span>
    </div>
  );
}

function ProficiencyCard() {
  return (
    <div className={cardClass}>
      <CardHeader icon={Server} title="Technical Arsenal" tag="Proficiency" />
      <ul className="space-y-6">
        {skillProficiencies.map((skill) => {
          const { icon: Icon, color } = skillIcons[skill.icon];
          return (
            <li key={skill.name} className="space-y-2.5">
              <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span className="flex items-center gap-2.5 text-foreground">
                  <span className="rounded-lg border border-foreground/10 bg-foreground/5 p-1.5">
                    <Icon aria-hidden className={cn('size-4', color)} />
                  </span>
                  {skill.name}
                </span>
                <span className="rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-xs font-bold text-foreground">
                  {skill.level}%
                </span>
              </div>
              {/* The percentage above carries the value; the bar is decoration */}
              <div
                aria-hidden
                className="h-2.5 w-full overflow-hidden rounded-full border border-border/60 bg-muted/60 p-px"
              >
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-200 to-sky-400 shadow-[0_0_12px_rgba(139,92,246,0.5)] dark:via-violet-400"
                  style={{ width: `${skill.level}%` }}
                >
                  <span className="absolute inset-y-0 right-0 w-2 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TraitsCard() {
  return (
    <div className={cn(cardClass, 'flex flex-col justify-between gap-8')}>
      <div>
        <CardHeader icon={Brain} title="Professional Traits" tag="Core Competencies" />
        <ul className="flex flex-wrap gap-3">
          {professionalTraits.map((trait, i) => {
            const Icon = traitIcons[trait.icon];
            return (
              <li
                key={trait.label}
                className={cn(
                  'flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:scale-105',
                  TONES[i % TONES.length],
                )}
              >
                <Icon aria-hidden className="size-4" />
                {trait.label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-foreground/80 pt-6">
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.07))] p-5 shadow-sm">
          <Rocket aria-hidden className="mt-0.5 size-5 shrink-0 text-foreground" />
          <div>
            <p className="font-bold text-foreground">{learnerNote.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{learnerNote.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" className="pt-0">
      <Reveal className="mb-8 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm">
          <CodeXml aria-hidden className="size-5" />
        </span>
        <h2 id="skills-heading" className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
          {headings.skills.title} {headings.skills.accent}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal className="h-full">
          <ProficiencyCard />
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <TraitsCard />
        </Reveal>
      </div>
    </Section>
  );
}
