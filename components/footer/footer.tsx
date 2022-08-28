import Link from 'next/link';

import { YEAR_OF_CREATE } from '@/lib/constants';

import { FooterLink } from '@/components/footer-link';
import { getCopyrightYearString } from '@/components/footer/get-copyright';

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </a>
          </Link>
          <Link href="/blog">
            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Blog
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <FooterLink href="https://github.com/shramkoweb">GitHub</FooterLink>
          <FooterLink href="https://www.linkedin.com/in/shramko-dev">
            LinkedIn
          </FooterLink>
          <FooterLink href="https://www.instagram.com/shramko.serhii">
            Instagram
          </FooterLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/gear">
            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              My Gear
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Dashboard
            </a>
          </Link>
        </div>
      </div>
      <small className="text-gray-600 dark:text-gray-400 pb-4">
        © Made with ❤️ in
        {' '}
        {getCopyrightYearString(YEAR_OF_CREATE, new Date().getFullYear())}
        {' '}
        by
        Serhii Shramko
      </small>
    </footer>
  );
}
