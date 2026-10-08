import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Home,
  Layers,
  Mail,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { blogLink, dockLinks, type SectionId } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrolledPast } from '@/hooks/useScrolledPast';
import Dock, { type DockItemData } from '@/components/lightswind/dock';

const sectionIcons: Record<SectionId, LucideIcon> = {
  home: Home,
  about: User,
  services: Layers,
  projects: FolderKanban,
  career: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  contact: Mail,
};

const sectionIds = dockLinks.map((link) => link.id);

// The dock replaces the navbar once the visitor scrolls past the top of the hero
const SHOW_AFTER_PX = 400;

export default function DockNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToSection = useSectionNavigation();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith(blogLink.to);
  const activeSection = useActiveSection(sectionIds, isHome);
  // Phones keep the navbar and its menu instead
  const isDockScreen = useMediaQuery('(min-width: 768px)');
  const isScrolled = useScrolledPast(SHOW_AFTER_PX);

  const items = useMemo<DockItemData[]>(() => {
    const sections = dockLinks.map((link): DockItemData => {
      const Icon = sectionIcons[link.id];
      return {
        id: link.id,
        label: link.label,
        href: `/#${link.id}`,
        icon: <Icon aria-hidden className="size-5" />,
        onSelect: () => goToSection(link.id),
        current: activeSection === link.id ? 'location' : undefined,
      };
    });

    return [
      ...sections,
      {
        id: 'blog',
        label: blogLink.label,
        href: blogLink.to,
        icon: <BookOpen aria-hidden className="size-5" />,
        onSelect: () => navigate(blogLink.to),
        current: isBlog ? 'page' : undefined,
      },
    ];
  }, [activeSection, goToSection, isBlog, navigate]);

  if (!isDockScreen) return null;

  return <Dock items={items} label="Section dock" isHidden={!isScrolled} />;
}
