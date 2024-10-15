import Link from 'next/link';

import { YEAR_OF_CREATE } from '@/lib/constants';

import { FooterLink } from '@/components/footer-link';
import { getCopyrightYearString } from '@/components/footer/get-copyright';

export function Footer() {
  return (
    <footer role="contentinfo" className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center">
      <hr className="mb-8 w-full border-gray-200 border-1 dark:border-gray-800" />
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <ul className="flex flex-col space-y-4">
          <li>
            <Link
              href="/"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Blog
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col space-y-4">
          <li>
            <FooterLink href="https://github.com/shramkoweb">GitHub</FooterLink>
          </li>
          <li>
            <FooterLink href="https://www.linkedin.com/in/shramko-dev/">
              LinkedIn
            </FooterLink>
          </li>
          <li>
            <FooterLink href="https://www.instagram.com/serhii.shramko/">
              Instagram
            </FooterLink>
          </li>
        </ul>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link
              href="/gear"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              My Gear
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/snippets"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Snippets
            </Link>
            \
          </li>
        </ul>
      </div>
      <small className="pb-4 text-xs text-gray-600 dark:text-gray-400">
        © Made with ❤️
        <br />
        {getCopyrightYearString(YEAR_OF_CREATE, new Date().getFullYear())}
        {' '}
        <Link href="/about">Serhii Shramko</Link>
      </small>
    </footer>
  );
}
