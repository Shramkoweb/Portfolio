import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CrossIcon, MenuIcon } from '@/components/mobile-menu/icons';

import styles from 'styles/mobile-menu.module.css';

function disablePageScroll() {
  document.body.style.overflow = 'hidden';
}

function activatePageScroll() {
  document.body.style.overflow = '';
}

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    activatePageScroll();
    setIsMenuOpen(false);
  }, [router.asPath]);

  function handleMenuClick() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      activatePageScroll();
    } else {
      setIsMenuOpen(true);
      disablePageScroll();
    }
  }

  useEffect(
    () => function cleanup() {
      activatePageScroll();
    },
    [],
  );

  return (
    <>
      <button
        className={clsx(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={handleMenuClick}
      >
        <MenuIcon dataHide={isMenuOpen} />
        <CrossIcon dataHide={!isMenuOpen} />
      </button>
      {isMenuOpen && (
        <ul
          className={clsx(
            styles.menu,
            styles.menuRendered,
            'flex flex-col absolute bg-gray-100 dark:bg-gray-900',
          )}
        >
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link href="/" className="flex w-auto pb-4">
              Home
            </Link>
          </li>
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link href="/about" className="flex w-auto pb-4">
              About
            </Link>
          </li>
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link href="/blog" className="flex w-auto pb-4">
              Blog
            </Link>
          </li>
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link href="/dashboard" className="flex w-auto pb-4">
              Dashboard
            </Link>
          </li>
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link href="/snippets" className="flex w-auto pb-4">
              Snippets
            </Link>
          </li>
          <li className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold">
            <Link
              href="/static/serhii-shramko-resume.pdf"
              download
              className="flex w-auto pb-4"
              title="PDF document. Serhii Shramko - Resume. 90 KB"
            >
              Resume
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
