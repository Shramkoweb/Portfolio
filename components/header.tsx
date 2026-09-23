import Link from 'next/link';

import { HeaderNav } from '@/components/header-nav';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu';
import { StarfieldToggle } from '@/components/starfield-toggle';
import { ThemeChanger } from '@/components/theme-changer';
import { Routes } from '@/lib/routes';

export function Header() {
  return (
    <header className="flex flex-col justify-center px-8">
      <nav
        aria-label="Main"
        className="relative mx-auto flex w-full max-w-3xl items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:pb-16"
      >
        <a href="#skip" className="skip-nav">
          Skip to main content
        </a>
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          <HeaderNav />
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={Routes.Resume()}
            download
            title="PDF document. Serhii Shramko - Resume. 105 KB"
            className="ml-12 hidden rounded-lg border border-gray-200 p-1 transition-[color,background-color,transform] duration-200 ease-out-expo hover:bg-gray-200 active:scale-[0.97] sm:px-3 sm:py-2 md:inline-block dark:border-gray-800 dark:hover:bg-gray-800"
          >
            Resume
          </Link>
          <StarfieldToggle />
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
}
