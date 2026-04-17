import Link from 'next/link';

import { YEAR_OF_CREATE } from '@/lib/constants';

import { FooterLink } from '@/components/footer-link';
import { getCopyrightYearString } from '@/components/footer/get-copyright';
import { Routes } from '@/lib/routes';

export function Footer() {
  return (
    <footer className="flex flex-col justify-center px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-16 w-full border-gray-200 border dark:border-gray-800" />
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/feed.xml"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                RSS Feed
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col space-y-4">
            <li>
              <FooterLink href="https://github.com/shramkoweb">
                GitHub
              </FooterLink>
            </li>
            <li>
              <FooterLink href="https://www.linkedin.com/in/shramko-dev/">
                LinkedIn
              </FooterLink>
            </li>
            <li>
              <a
                href="https://github.com/Shramkoweb/Portfolio/issues/new"
                target="_blank"
                rel="nofollow noopener"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Report an Issue
              </a>
            </li>
          </ul>
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href={Routes.Gear()}
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                My Gear
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/snippets"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Snippets
              </Link>
            </li>
            <li>
              <Link
                href="/learning"
                className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
              >
                Learning
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col space-y-4">
            <li>
              <FooterLink href="https://www.producthunt.com/@shramko_dev">
                Product Hunt
              </FooterLink>
            </li>
            <li>
              <FooterLink href="https://chromewebstore.google.com/detail/quizlet-quicklist/oagcgmfbkpelgahbgilehnmjajpgdflg">
                Quizlet QuickList
              </FooterLink>
            </li>
            <li>
              <FooterLink href="https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo">
                Udemy Reset Progress
              </FooterLink>
            </li>
          </ul>
        </div>
        <small className="pb-4 text-xs text-gray-600 dark:text-gray-400">
          © Made with ❤️
          <br />
          {getCopyrightYearString(
            YEAR_OF_CREATE,
            new Date().getFullYear(),
          )}{' '}
          <Link href="/about" className="underline decoration-gray-300 decoration-1 underline-offset-[3px] hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400 transition-[text-decoration-color] duration-150 ease-out-expo">Serhii Shramko</Link>
        </small>
      </div>
    </footer>
  );
}
