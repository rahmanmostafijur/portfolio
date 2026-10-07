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

export default function DockNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToSection = useSectionNavigation();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith(blogLink.to);
  const activeSection = useActiveSection(sectionIds, isHome);
  const isWide = useMediaQuery('(min-width: 640px)');
  const iconClass = isWide ? 'size-5' : 'size-4';

  const items = useMemo<DockItemData[]>(() => {
    const sections = dockLinks.map((link): DockItemData => {
      const Icon = sectionIcons[link.id];
      return {
        id: link.id,
        label: link.label,
        href: `/#${link.id}`,
        icon: <Icon aria-hidden className={iconClass} />,
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
        icon: <BookOpen aria-hidden className={iconClass} />,
        onSelect: () => navigate(blogLink.to),
        current: isBlog ? 'page' : undefined,
      },
    ];
  }, [activeSection, goToSection, iconClass, isBlog, navigate]);

  return <Dock items={items} label="Section dock" baseItemSize={isWide ? 44 : 32} />;
}
