export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year?: string;
  tools: string[];
  overview: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'air-pollution-monitoring-forecasting',
    title: 'Air Pollution Monitoring & Forecasting',
    subtitle: 'Environmental Data Platform',
    year: '2025',
    tools: ['Python', 'FastAPI', 'React', 'Next.js'],
    overview:
      'A full-stack environmental data platform that tracks real-time air quality across multiple sources and forecasts pollution trends ahead of time, giving communities and planners an early warning system rather than a rear-view mirror.',
    features: [
      'Tracks real-time air quality data and predicts future pollution levels from multi-source environmental data.',
      'Backend built with Python and FastAPI handles data processing, storage, and forecasting logic.',
      'Predictive models analyze trends and forecast air quality based on historical data.',
      'Interactive React/Next.js frontend delivers clear data visualization and intuitive dashboards.',
    ],
    githubUrl: 'https://github.com/mustafiz-emon/Air-Polltion-Monitoring-and-Forecasting.git',
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    subtitle: 'Multi-User Task Management API',
    year: '2026',
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Alembic', 'Docker'],
    overview:
      'A multi-user task management application where users register, log in, and manage their own tasks — each user can only see and modify the tasks they own.',
    features: [
      'User registration and JWT-based authentication and authorization.',
      'Multi-user task isolation — each user can only access their own tasks.',
      'REST API with interactive documentation, built on FastAPI and PostgreSQL.',
      'Database migrations managed with Alembic, tested with pytest, and containerized with Docker.',
    ],
    githubUrl: 'https://github.com/rahmanmostafijur/taskmanager-backend',
  },
  {
    slug: 'japan-hands',
    title: 'Japan Hands',
    subtitle: 'E-Commerce Platform',
    tools: [],
    overview:
      'An e-commerce platform for buying manga-related accessories, built as a sister concern of mangafam.com. I built the full stack, frontend through backend.',
    features: [],
  },
  {
    slug: 'sanket',
    title: 'Sanket',
    subtitle: 'In Progress',
    year: 'Upcoming',
    tools: [],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'ecommerce-rest-api',
    title: 'E-Commerce REST API',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['Python', 'FastAPI', 'PostgreSQL'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'realtime-chat-app',
    title: 'Real-Time Chat Application',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['React', 'Node.js', 'WebSockets'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'ai-resume-screener',
    title: 'AI Resume Screener',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['Python', 'Machine Learning', 'FastAPI'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'inventory-management-system',
    title: 'Inventory Management System',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['Next.js', 'PostgreSQL', 'Docker'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'recipe-recommendation-engine',
    title: 'Recipe Recommendation Engine',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['Python', 'Machine Learning', 'React'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
  {
    slug: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    subtitle: 'Planned',
    year: 'Upcoming',
    tools: ['Next.js', 'FastAPI', 'PostgreSQL'],
    overview: 'Details coming soon.',
    features: [],
    comingSoon: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
