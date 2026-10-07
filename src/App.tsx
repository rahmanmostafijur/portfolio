import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from '@/components/layout/ScrollManager';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Old multi-page URLs now point at sections of the single page (mirrors vercel.json redirects)
const legacyRedirects: { path: string; to: string }[] = [
  { path: '/about', to: '/#about' },
  { path: '/experience', to: '/#career' },
  { path: '/education', to: '/#education' },
  { path: '/projects', to: '/#projects' },
  { path: '/projects/:slug', to: '/#projects' },
  { path: '/contact', to: '/#contact' },
  { path: '/publications', to: '/' },
];

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollManager />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {legacyRedirects.map(({ path, to }) => (
            <Route key={path} path={path} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
