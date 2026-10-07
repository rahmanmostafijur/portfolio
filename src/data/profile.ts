// Single source of truth for all site content. Edit text here; components only render it.

export type SectionId =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'career'
  | 'education'
  | 'skills'
  | 'contact';

export type SocialIcon = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface NavLinkItem {
  id: SectionId;
  label: string;
}

export interface PageLinkItem {
  to: string;
  label: string;
}

export interface IdCardField {
  label: string;
  value: string;
  isStatus?: boolean;
}

export interface FactCard {
  icon: 'briefcase' | 'target' | 'graduation' | 'globe';
  label: string;
  value: string;
}

export interface Service {
  icon: 'layers' | 'server' | 'brain' | 'database';
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  label?: string;
  description: string;
  tech: string[];
  image?: { src: string; srcSet: string; alt: string; width: number; height: number };
  /** Icon on the gradient placeholder shown when there is no screenshot */
  placeholderIcon: 'wind' | 'shopping-bag' | 'list-checks';
  githubUrl?: string;
  liveUrl?: string;
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  workMode: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
  highlight?: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile = {
  name: 'M M Mostafijur Rahman',
  initials: 'MR',
  title: 'Full Stack Software Engineer',
  shortTitle: 'Software Engineer',
  tagline:
    'Full Stack Software Engineer building production-ready web applications end to end — clean APIs, responsive interfaces, and the systems that keep them running.',
  location: 'Dhaka, Bangladesh',
  email: 'mostafijrahman.swe@gmail.com',
  availability: 'Open to remote roles',
  githubHandle: 'rahmanmostafijur',
  cvUrl: '/Mostafijur_Rahman_CV.pdf',
  siteUrl: 'https://mostafij.vercel.app',
  photo: {
    src: '/images/profile-320.webp',
    srcSet: '/images/profile-320.webp 320w, /images/profile-640.webp 640w',
    alt: 'Portrait of M M Mostafijur Rahman',
    width: 320,
    height: 320,
  },
} as const;

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/rahmanmostafijur', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mostafijemon00', icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'email' },
];

export const navLinks: NavLinkItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
];

export const blogLink: PageLinkItem = { to: '/blog', label: 'Blog' };

/** Bottom dock: every home-page section, in page order (Blog is added after these) */
export const dockLinks: NavLinkItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'What I Do' },
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Career' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const idCardFields: IdCardField[] = [
  { label: 'Specialty', value: 'Python backend' },
  { label: 'Location', value: 'Dhaka, BD' },
  { label: 'Experience', value: 'Since Feb 2026' },
  { label: 'Status', value: 'Active', isStatus: true },
];

export interface SectionHeading {
  title: string;
  accent: string;
  subtitle?: string;
}

export const headings = {
  services: {
    title: 'What I',
    accent: 'Do',
    subtitle: 'Full-stack web development and applied machine learning.',
  },
  projects: {
    title: 'Selected',
    accent: 'Works',
    subtitle: 'Personal projects and company work.',
  },
  career: { title: 'Career', accent: 'Journey' },
  education: { title: 'Academic', accent: 'Background' },
  contact: { title: "Let's", accent: 'Connect' },
  skills: {
    title: 'Technical',
    accent: 'Arsenal',
    subtitle: 'Languages, frameworks and tools I use, grouped by area.',
  },
} satisfies Record<string, SectionHeading>;

export const about = {
  headingLead: 'I treat software',
  headingAccent: 'as a craft',
  paragraphs: [
    'Clear structure, readable systems, and interfaces that stay out of the way. From APIs to UIs, the goal is reliable delivery without unnecessary complexity.',
    "I'm currently pursuing an M.Sc in Computer Science & Engineering, extending my full-stack work toward applied machine learning — models that move from experiment to deployment alongside a real web stack.",
  ],
  facts: [
    { icon: 'briefcase', label: 'Role', value: 'Software Engineer @ Acciptra' },
    { icon: 'target', label: 'Focus', value: 'Python backend · FastAPI' },
    {
      icon: 'graduation',
      label: 'Education',
      value: 'M.Sc CSE (Data Science), East West University — ongoing',
    },
    { icon: 'globe', label: 'Availability', value: 'Open to remote roles' },
  ] satisfies FactCard[],
};

export const services: Service[] = [
  {
    icon: 'layers',
    title: 'Full-Stack Development',
    description:
      'End-to-end delivery of modern web applications with type-safe, maintainable architectures.',
  },
  {
    icon: 'server',
    title: 'Backend Engineering',
    description:
      'Scalable REST APIs and services with Python, FastAPI and PostgreSQL — from schema design through deployment.',
  },
  {
    icon: 'brain',
    title: 'Applied Machine Learning',
    description:
      'Data-driven features and ML pipelines wired into production systems — the focus of my ongoing M.Sc research.',
  },
  {
    icon: 'database',
    title: 'Databases & DevOps',
    description:
      'Relational database design with PostgreSQL, and Docker containerization to isolate application dependencies, with Git/GitHub, Postman and automated testing in the workflow.',
  },
];

export const projects: Project[] = [
  {
    slug: 'task-manager',
    title: 'Task Manager',
    description:
      'A multi-user task management application where users register, log in, and manage their own tasks — each user can only see and modify the tasks they own.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Alembic', 'Docker'],
    image: {
      src: '/images/projects/task-manager-960.webp',
      srcSet:
        '/images/projects/task-manager-640.webp 640w, /images/projects/task-manager-960.webp 960w',
      alt: 'Task Manager sign-in screen',
      width: 960,
      height: 600,
    },
    placeholderIcon: 'list-checks',
    githubUrl: 'https://github.com/rahmanmostafijur/taskmanager',
    liveUrl: 'https://taskmanagerforyou.vercel.app',
  },
  {
    slug: 'air-pollution-monitoring-forecasting',
    title: 'Air Pollution Monitoring & Forecasting',
    description:
      'Tracks real-time air quality data and predicts future pollution levels from multi-source environmental data.',
    tech: ['Python', 'FastAPI', 'React', 'Next.js'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'wind',
    githubUrl: 'https://github.com/mustafiz-emon/Air-Polltion-Monitoring-and-Forecasting',
  },
  {
    slug: 'japan-hands',
    title: 'Japan Hands',
    label: 'Company project — Acciptra',
    description:
      'An e-commerce platform for buying manga-related accessories, built as a sister concern of mangafam.com.',
    // TODO(content): tech stack (tags are hidden while this is empty)
    tech: [],
    placeholderIcon: 'shopping-bag',
  },
];

export const career: CareerItem[] = [
  {
    role: 'Software Engineer',
    company: 'Acciptra',
    period: 'Feb 2026 – Present',
    workMode: 'Remote',
    description:
      'Designing and developing scalable backend services with Python and FastAPI, focused on performance and clean architecture, and building dynamic, user-friendly interfaces with React and Next.js. I design and consume the RESTful APIs that connect frontend and backend, and collaborate with cross-functional teams to deliver production-ready solutions — including Japan Hands, an e-commerce platform for manga-related accessories (a sister concern of mangafam.com) that I build across the full stack.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'TypeScript', 'React', 'Next.js', 'Docker'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'M.Sc in Computer Science & Engineering',
    institution: 'East West University (EWU), Dhaka',
    years: '2026 – Present (expected 2027)',
    highlight: 'Major: Data Science',
    bullets: [
      "Currently pursuing a Master's degree, building on a foundation in software architecture and systems design.",
    ],
  },
  {
    degree: 'B.Sc in Computer Science & Engineering',
    institution: 'Green University of Bangladesh, Dhaka',
    years: '2019 – 2023',
    bullets: [
      'Core coursework included Data Structures, Algorithms, Operating Systems, and Machine Learning.',
      'Final-year project: Air Pollution Monitoring & Forecasting System.',
    ],
  },
  {
    degree: 'HSC in Science',
    institution: 'Adamjee Cantonment College',
    years: '2017',
    highlight: 'Science',
    bullets: ['Completed higher secondary education with a focus on science subjects.'],
  },
];

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { category: 'Backend', items: ['FastAPI', 'Node.js', 'REST APIs'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'DevOps / Tools', items: ['Docker', 'Postman', 'Git', 'GitHub', 'Linux'] },
  { category: 'AI / ML', items: ['PyTorch', 'Pandas', 'NumPy'] },
];

export const contact = {
  intro:
    'Open to remote roles and collaborations. Send a message through the form or email me directly.',
  // TODO(content): Web3Forms access key (public by design, not a secret)
  web3formsAccessKey: '',
};

export const seo = {
  title: `${profile.name} — ${profile.title}`,
  // Keep in sync with the static meta tags in index.html
  description:
    'Portfolio of M M Mostafijur Rahman, a Full Stack Software Engineer building production-ready web applications with Python, FastAPI, React and PostgreSQL.',
};
