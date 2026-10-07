import { career, headings } from '@/data/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function Career() {
  return (
    <Section id="career" {...headings.career}>
      <ol className="relative ml-2 border-l-2 border-border sm:ml-4">
        {career.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
            <span
              aria-hidden
              className="absolute top-7 -left-[11px] size-5 rounded-full border-4 border-background bg-linear-to-br from-accent-from to-accent-to"
            />
            <Reveal>
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-accent-from">{item.period}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{item.role}</h3>
                <p className="mt-1 font-medium text-muted-foreground">
                  {item.company} <span aria-hidden>·</span> {item.workMode}
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{item.description}</p>
                <ul aria-label={`Stack at ${item.company}`} className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
