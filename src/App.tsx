import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from '@/components/layout/ScrollManager';
import CustomCursor from '@/components/layout/CustomCursor';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NotFoundPage from '@/pages/NotFoundPage';

// The dock pulls in framer-motion, so it loads after the first paint
const DockNav = lazy(() => import('@/components/layout/DockNav'));

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
      <Navbar />
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
      <Suspense fallback={null}>
        <DockNav />
      </Suspense>
      <CustomCursor />
    </>
  );
}
