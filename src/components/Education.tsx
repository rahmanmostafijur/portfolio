import Timeline, { type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  {
    role: 'M.Sc in Computer Science & Engineering',
    org: 'East West University (EWU), Dhaka',
    date: 'Present',
    bullets: [
      "Currently pursuing a Master's degree, building on a foundation in software architecture and systems design.",
    ],
  },
  {
    role: 'B.Sc in Computer Science & Engineering',
    org: 'Green University of Bangladesh, Dhaka',
    date: '2019 — 2023',
    bullets: [
      'Graduated with Honors. Specialized in distributed systems and software architecture. Core coursework included Data Structures, Algorithms, Operating Systems, and Machine Learning.',
    ],
  },
  {
    role: 'HSC in Science',
    org: 'Adamjee Cantonment College',
    date: '2017',
    bullets: ['Completed higher secondary education with a focus on science subjects.'],
  },
];

export default function Education() {
  return <Timeline eyebrow="Education" title="Academic Background" items={items} />;
}
