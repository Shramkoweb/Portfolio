import { HeaderLink } from '@/components/header-link';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu';

export function Header() {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav
        className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100"
      >
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          <HeaderLink href="/" text="Home" />
          <HeaderLink href="/about" text="About" />
          <HeaderLink href="/gear" text="Gear" />
        </div>
      </nav>
    </div>
  );
}