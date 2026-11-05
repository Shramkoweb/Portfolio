import Link from 'next/link';

import { FooterLink, footerLinkClassName } from '@/components/footer-link';
import { getCopyrightYearString } from '@/components/footer/get-copyright';
import {
  QUIZLET_APP_STORES,
  UDEMY_RESET_APP_STORES,
  YEAR_OF_CREATE,
} from '@/lib/constants';
import { Routes } from '@/lib/routes';
import { withStoreUtm } from '@/lib/store-links';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="flex flex-col justify-center px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-14 w-full border-gray-200 border dark:border-gray-800" />
        <nav aria-label="Footer">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-x-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <ul className="flex flex-col items-start">
              <li>
                <Link href="/" className={footerLinkClassName}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={footerLinkClassName}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className={footerLinkClassName}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className={footerLinkClassName}>
                  RSS Feed
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start">
              <li>
                <FooterLink href="https://github.com/shramkoweb">
                  GitHub
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.linkedin.com/in/shramko-dev">
                  LinkedIn
                </FooterLink>
              </li>
              <li>
                <a
                  href="https://github.com/Shramkoweb/Portfolio/issues/new"
                  target="_blank"
                  rel="nofollow noopener"
                  className={footerLinkClassName}
                >
                  Report an Issue
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            </ul>
            <ul className="flex flex-col items-start">
              <li>
                <Link href={Routes.Gear()} className={footerLinkClassName}>
                  My Gear
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={footerLinkClassName}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/snippets" className={footerLinkClassName}>
                  Snippets
                </Link>
              </li>
              <li>
                <Link href="/learning" className={footerLinkClassName}>
                  Learning
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start">
              <li>
                <FooterLink href="https://www.producthunt.com/@shramko_dev">
                  Product Hunt
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={withStoreUtm(
                    QUIZLET_APP_STORES.chrome,
                    'footer',
                    'quizlet-list',
                  )}
                >
                  Quizlet QuickList
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={withStoreUtm(
                    UDEMY_RESET_APP_STORES.chrome,
                    'footer',
                    'udemy-reset-progress',
                  )}
                >
                  Udemy Reset Progress
                </FooterLink>
              </li>
            </ul>
          </div>
        </nav>
        <small className="pb-4 text-xs text-gray-600 dark:text-gray-400">
          © Made with ❤️
          <br />
          {getCopyrightYearString(YEAR_OF_CREATE, CURRENT_YEAR)}{' '}
          <Link
            href="/about"
            className="-my-[11.5px] inline-flex min-h-11 items-center underline decoration-gray-300 decoration-1 underline-offset-[3px] hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400 transition-[text-decoration-color] duration-150 ease-out-expo"
          >
            Serhii Shramko
          </Link>
        </small>
      </div>
    </footer>
  );
}
