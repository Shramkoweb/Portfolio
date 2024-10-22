import { HeaderLink } from '@/components/header-link';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu';
import { ThemeChanger } from '@/components/theme-changer';

export function Header() {
  return (
    <header className="flex flex-col justify-center px-8" role="banner">
      <nav
        role="navigation"
        className="relative mx-auto flex w-full max-w-3xl items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:pb-16"
      >
        <a href="#skip" className="skip-nav">
          Skip to main content
        </a>
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          <HeaderLink href="/" text="Home" />
          <HeaderLink href="/blog" text="Blog" />
          <HeaderLink href="/about" text="About" />
          <HeaderLink href="/dashboard" text="Dashboard" />
          <HeaderLink href="/snippets" text="Snippets" />
        </div>

        <div className="flex items-center justify-center">
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
}
