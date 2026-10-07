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

export type ProjectIcon =
  | 'list-checks'
  | 'headset'
  | 'bot'
  | 'boxes'
  | 'clipboard-list'
  | 'radar'
  | 'wind'
  | 'shopping-bag'
  | 'download';

export interface Project {
  slug: string;
  title: string;
  label?: string;
  description: string;
  tech: string[];
  image?: { src: string; srcSet: string; alt: string; width: number; height: number };
  /** Icon on the gradient placeholder shown when there is no screenshot */
  placeholderIcon: ProjectIcon;
  /** Status taken from the repository README or description */
  status?: { label: string; tone: 'live' | 'progress' | 'neutral' };
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
  career: { title: 'Career', accent: 'Journey', subtitle: 'Where I work and what I build there.' },
  education: { title: 'Academic', accent: 'Background' },
  contact: { title: "Let's", accent: 'Connect' },
  skills: { title: 'Expertise &', accent: 'Skills' },
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
      'Multi-user task manager — a FastAPI + PostgreSQL API with JWT refresh-token rotation and a React + TypeScript client. 81 tests, Dockerised and deployed.',
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT', 'pytest', 'React', 'TypeScript', 'Docker'],
    image: {
      src: '/images/projects/task-manager-960.webp',
      srcSet:
        '/images/projects/task-manager-640.webp 640w, /images/projects/task-manager-960.webp 960w',
      alt: 'Task Manager sign-in screen',
      width: 960,
      height: 600,
    },
    placeholderIcon: 'list-checks',
    status: { label: 'Live', tone: 'live' },
    githubUrl: 'https://github.com/rahmanmostafijur/taskmanager',
    liveUrl: 'https://taskmanagerforyou.vercel.app',
  },
  {
    slug: 'supportdesk',
    title: 'SupportDesk',
    description:
      'Real-time helpdesk — FastAPI, async SQLAlchemy and WebSockets over PostgreSQL, with a React 19 / TypeScript client: live ticket chat, role-based triage and a knowledge base.',
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'WebSockets', 'JWT', 'React', 'TypeScript', 'Docker'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'headset',
    githubUrl: 'https://github.com/rahmanmostafijur/SupportDesk',
  },
  {
    slug: 'nexaai',
    title: 'NexaAI',
    description:
      'Multilingual business agent (English, Bengali, Banglish) that routes each question to read-only Text-to-SQL, hybrid RAG over pgvector, or both — and cites its evidence.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG', 'Text-to-SQL', 'Docker'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'bot',
    githubUrl: 'https://github.com/rahmanmostafijur/NexaAI',
  },
  {
    slug: 'solmira',
    title: 'Solmira',
    description:
      'Multi-tenant B2B order, inventory and fulfillment platform — a Next.js front end over NestJS services, built for concurrency correctness and strict tenant isolation.',
    tech: ['Next.js', 'React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'boxes',
    status: { label: 'In progress · phases 1–5 of 12', tone: 'progress' },
    githubUrl: 'https://github.com/rahmanmostafijur/solmira',
  },
  {
    slug: 'procuraflow',
    title: 'ProcuraFlow',
    description:
      'B2B procurement and inventory platform — purchase-order approval workflows, stock receiving and supplier delivery reporting, behind role-based access and a full audit trail.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'clipboard-list',
    githubUrl: 'https://github.com/rahmanmostafijur/ProcuraFlow',
  },
  {
    slug: 'sanket',
    title: 'Sanket',
    description:
      'Job-market intelligence service — scheduled ingestion, LLM extraction into Pydantic schemas and hybrid pgvector search.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'LLM'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'radar',
    status: { label: 'In progress', tone: 'progress' },
    githubUrl: 'https://github.com/rahmanmostafijur/Sanket',
  },
  {
    slug: 'air-pollution-monitoring',
    title: 'Air Pollution Monitoring & Forecasting',
    description:
      'IoT + ML air quality system — an Arduino sensor node (MQ-2, MQ-135, LM35) streaming to ThingSpeak, a live dashboard, and classifiers reaching 0.89 accuracy.',
    tech: ['Arduino', 'ESP8266', 'ThingSpeak', 'Python', 'Keras', 'TensorFlow', 'Scikit-learn'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'wind',
    status: { label: 'Final-year project', tone: 'neutral' },
    githubUrl: 'https://github.com/rahmanmostafijur/air-pollution-monitoring',
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
  {
    slug: 'namao-downloader',
    title: 'Namao',
    description:
      'Personal video downloader for YouTube, Facebook, TikTok, X and Instagram — FastAPI + yt-dlp behind a browser UI, packaged as a single Windows .exe and an Android build.',
    tech: ['Python', 'FastAPI', 'yt-dlp', 'Kotlin', 'Android'],
    // TODO(content): screenshot (shows a gradient placeholder until then)
    placeholderIcon: 'download',
    status: { label: 'Personal tool', tone: 'neutral' },
    githubUrl: 'https://github.com/rahmanmostafijur/namao-downloader',
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
  { category: 'AI / ML', items: ['PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'] },
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
