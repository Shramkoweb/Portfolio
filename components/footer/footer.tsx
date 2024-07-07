import Link from 'next/link';

import { YEAR_OF_CREATE } from '@/lib/constants';

import { FooterLink } from '@/components/footer-link';
import { getCopyrightYearString } from '@/components/footer/get-copyright';

export function Footer() {
  return (
    <footer role="contentinfo" className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <ul className="flex flex-col space-y-4">
          <li>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              My Gear
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/snippets"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Snippets
            </Link>
            \
          </li>
        </ul>
      </div>
      <small className="text-xs text-gray-600 dark:text-gray-400 pb-4">
        © Made with ❤️
        <br />
        {getCopyrightYearString(YEAR_OF_CREATE, new Date().getFullYear())}
        {' '}
        <Link href="/about">Serhii Shramko</Link>
      </small>
    </footer>
  );
}
