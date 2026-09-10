import Timeline, { type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  {
    role: 'Software Engineer',
    org: 'Acciptra — Dhaka, Bangladesh (Hybrid)',
    date: 'Present',
    bullets: [
      'Designed and developed scalable backend services using Python and FastAPI, focusing on performance and clean architecture.',
      'Built dynamic, user-friendly interfaces with React and Next.js, ensuring responsive and seamless user experiences.',
      'Designed and consumed RESTful APIs, enabling smooth communication between frontend and backend systems.',
      'Collaborated with cross-functional teams to deliver high-quality, production-ready solutions.',
    ],
    tags: ['Python', 'JavaScript', 'React', 'PostgreSQL', 'Java'],
  },
];

export default function Experience() {
  return <Timeline eyebrow="Experience" title="Where I've Worked" items={items} />;
}
