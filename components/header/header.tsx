import Link from 'next/link';

import { HeaderLink } from '@/components/header-link';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu';
import { ThemeChanger } from '@/components/theme-changer';

import { event } from '@/lib/ga';

const handleResumeClick = () => {
  event({
    action: 'Resume download click',
    category: 'Resume',
    label: 'Resume - click',
  });
};

export function Header() {
  return (
    <header className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          <HeaderLink href="/" text="Home" />
          <HeaderLink href="/blog" text="Blog" />
          <HeaderLink href="/about" text="About" />
          <HeaderLink href="/dashboard" text="Dashboard" />
          <HeaderLink href="/snippets" text="Snippets" />
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="/static/s.shramko-software-engineer.pdf"
            download
            onClick={handleResumeClick}
            title="PDF document. Serhii Shramko Resume - 74 KB"
            className="ml-12 border-2 border-gray-700 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            Resume
          </Link>
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
}
