// Logo files in public/tech/ for each skill name in profile.ts.
// Brand logos: simple-icons (CC0). SQL / REST APIs: generic glyphs from lucide (ISC).

export interface TechIcon {
  src: string;
  /** Near-black brand colours are inverted in dark mode so they stay visible */
  invertInDark?: boolean;
}

export const techIcons: Record<string, TechIcon> = {
  Python: { src: '/tech/python.svg' },
  TypeScript: { src: '/tech/typescript.svg' },
  JavaScript: { src: '/tech/javascript.svg' },
  SQL: { src: '/tech/sql.svg' },
  FastAPI: { src: '/tech/fastapi.svg' },
  'Node.js': { src: '/tech/nodedotjs.svg' },
  'REST APIs': { src: '/tech/rest-api.svg' },
  React: { src: '/tech/react.svg' },
  'Next.js': { src: '/tech/nextdotjs.svg', invertInDark: true },
  HTML5: { src: '/tech/html5.svg' },
  CSS3: { src: '/tech/css.svg' },
  PostgreSQL: { src: '/tech/postgresql.svg' },
  Docker: { src: '/tech/docker.svg' },
  Postman: { src: '/tech/postman.svg' },
  Git: { src: '/tech/git.svg' },
  GitHub: { src: '/tech/github.svg', invertInDark: true },
  Linux: { src: '/tech/linux.svg' },
  PyTorch: { src: '/tech/pytorch.svg' },
  'Scikit-learn': { src: '/tech/scikitlearn.svg' },
  Pandas: { src: '/tech/pandas.svg', invertInDark: true },
  NumPy: { src: '/tech/numpy.svg', invertInDark: true },
};
