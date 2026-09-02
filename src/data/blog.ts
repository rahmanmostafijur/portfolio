export interface BlogPost {
  slug: string;
  title: string;
  thumbLabel: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  closing: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-fastapi-is-my-default',
    title: 'Why FastAPI Became My Default for New APIs',
    thumbLabel: 'FastAPI',
    date: '2026-01-18',
    readTime: '6 min read',
    tags: ['Python', 'FastAPI', 'Backend'],
    excerpt:
      'After building a few production services on FastAPI, here are the three things that actually changed how I write backend code — not the marketing points, the real ones.',
    intro:
      "I didn't switch to FastAPI because of a benchmark chart. I switched because I kept hitting the same three walls on other frameworks, and FastAPI happened to remove all three at once. This isn't a \"framework X vs Y\" post — it's what actually changed in how I write code day to day.",
    sections: [
      {
        heading: 'Type hints stopped being decoration',
        paragraphs: [
          "In most Python code I'd written before, type hints were a courtesy to whoever read the file next — nice to have, ignored by the runtime. In FastAPI they're load-bearing. The same Pydantic model that validates an incoming request body also generates the interactive docs and tells my editor what fields exist. I stopped writing separate validation logic and separate documentation, because the type hint already did both jobs.",
          "The honest downside: it takes a while to stop fighting Pydantic when a shape genuinely needs to be dynamic. I lost an afternoon on a webhook payload that legitimately varies by provider before accepting that a discriminated union was the right tool, not a workaround.",
        ],
      },
      {
        heading: "Async when it earns its keep, sync when it doesn't",
        paragraphs: [
          'On Task Manager, most of my endpoints just talk to PostgreSQL — one round trip, done. I write those as plain sync functions and let FastAPI run them in a threadpool. The endpoints that call out to a third-party API or do anything I/O-bound while waiting on a response are async. Nothing forces me to pick one style for the whole app, and that flexibility is undersold — a lot of frameworks push you toward "everything is async" as an ideology rather than a tool.',
        ],
      },
      {
        heading: 'The dependency injection system that finally clicked',
        paragraphs: [
          "I'd used dependency injection in other languages and always found the Python equivalents felt bolted on. FastAPI's `Depends()` is the first version that felt native — I use it for the boring stuff (a DB session, the current authenticated user, pagination params) and it composes cleanly. On Task Manager, \"get the current user from the JWT\" is one dependency that every protected route pulls in, instead of being copy-pasted decorator logic at the top of each handler.",
        ],
      },
    ],
    closing:
      "None of this makes FastAPI objectively the best framework — it's the one that matched how I think about a request: validate it, authorize it, do the work, return a typed response. If your mental model is different, your mileage on all three of these points will vary, and that's fine.",
  },
  {
    slug: 'multi-tenant-isolation-the-boring-way',
    title: "Multi-Tenant Isolation: The Boring Way I'd Do It Again",
    thumbLabel: 'Auth & Isolation',
    date: '2026-02-02',
    readTime: '5 min read',
    tags: ['Backend', 'Security', 'PostgreSQL'],
    excerpt:
      "Building Task Manager meant making sure one user could never see another user's tasks. Here's the unglamorous approach I landed on, and the mistake I nearly shipped.",
    intro:
      "Task Manager is a small app on paper — users register, log in, and manage tasks. But \"each user can only see and modify tasks they own\" is exactly the kind of requirement that sounds trivial until you're the one writing the query.",
    sections: [
      {
        heading: 'Enforce it at the query, not the response',
        paragraphs: [
          'My first instinct was to fetch a task by ID and then check `if task.owner_id != current_user.id: raise 403` after the fact. That works, but it means the database already did the work of finding a row the requester was never allowed to see, and it\'s one forgotten `if` statement away from a leak. I moved the check into the query itself — every read and write is scoped with `.filter(owner_id=current_user.id)` from the start, so a task that isn\'t yours doesn\'t exist as far as that query is concerned. A missing task and a task you don\'t own return the identical 404, which is also the correct behavior: you shouldn\'t even learn that a task ID belongs to someone else.',
        ],
      },
      {
        heading: 'The mistake I almost shipped',
        paragraphs: [
          'Early on, one endpoint accepted `user_id` as a field in the request body for an admin-style bulk action I was prototyping. It worked fine in my own testing because I was always sending my own ID. It took a teammate asking "what stops me from passing someone else\'s ID here?" for me to realize the answer was "nothing." The fix was simple — the authenticated identity from the JWT is the only source of truth for whose data you\'re touching, full stop. The request body doesn\'t get a vote. That review comment is the reason I now treat any field named `user_id` or `owner_id` arriving from client input as a smell worth questioning immediately.',
        ],
      },
      {
        heading: "Why I didn't reach for row-level security",
        paragraphs: [
          "Postgres has row-level security built in, and for a larger multi-tenant system I'd seriously consider it. For Task Manager, application-level scoping was the right call: the whole codebase is small enough that every query path is easy to audit by hand, and I'd rather have the isolation logic visible in the service layer — where the tests live — than pushed down into database policies that are easy to forget about six months later.",
        ],
      },
    ],
    closing:
      "None of this is clever. It's the same lesson every time: authorization checks belong as close to the data as possible, and the client never gets to tell you who it is.",
  },
  {
    slug: 'what-an-air-quality-project-taught-me',
    title: 'What an Air-Quality Project Taught Me About Data Pipelines',
    thumbLabel: 'Data Pipelines',
    date: '2026-02-20',
    readTime: '7 min read',
    tags: ['Python', 'Data Engineering', 'Machine Learning'],
    excerpt:
      "Building a forecasting platform for air pollution sounded like a modeling problem going in. It turned out to be a data-plumbing problem wearing a modeling problem's clothes.",
    intro:
      'I started the Air Pollution Monitoring & Forecasting project expecting to spend most of my time on the forecasting model. Instead, I spent most of my time making sure the data reaching that model was something worth forecasting from.',
    sections: [
      {
        heading: 'Real sensor data is not a clean CSV',
        paragraphs: [
          "Every tutorial dataset I'd trained on before this was already clean — no gaps, no duplicate timestamps, no sensor reporting a negative pollution reading because it briefly lost calibration. Multi-source environmental data has all three, and more. I ended up writing more validation and interpolation code than model code, which was a useful humbling: the model is only as honest as what you feed it, and nobody hands you honest data by default.",
        ],
      },
      {
        heading: 'Monitoring and forecasting are two different jobs',
        paragraphs: [
          "It's tempting to treat \"show current air quality\" and \"predict tomorrow's air quality\" as the same feature with a different time window, but they have different failure modes. The monitoring side has to be right now and can tolerate showing \"no data\" if a sensor drops out. The forecasting side has to degrade gracefully — a bad prediction that's confidently wrong is worse than a wide, honest range. I ended up separating them into distinct services with different freshness guarantees instead of one endpoint trying to do both.",
        ],
      },
      {
        heading: 'Decoupling ingestion from serving saved me twice',
        paragraphs: [
          "The FastAPI layer that serves the dashboard doesn't talk to sensors directly — a separate ingestion process pulls, cleans, and stores readings, and the API just reads from that store. The first time this paid off was when a data source changed its response format overnight and only the ingestion job broke; the dashboard stayed up on stale-but-valid data instead of throwing errors at every visitor. The second time was simpler: it let me test the forecasting logic against recorded historical data without needing a live sensor feed running in the background.",
        ],
      },
    ],
    closing:
      "If there's one thing I'd tell myself before starting this project, it's that the forecasting model is the interesting 20% and the data pipeline is the load-bearing 80%. Budget accordingly.",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
