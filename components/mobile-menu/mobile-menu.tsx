import clsx from 'clsx';
import Link from 'next/link';
import { Routes } from '@/lib/routes';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.Home()} className="flex w-auto pb-4">
              Home
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.About()} className="flex w-auto pb-4">
              About
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.Blog()} className="flex w-auto pb-4">
              Blog
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.Dashboard()} className="flex w-auto pb-4">
              Dashboard
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.Snippets()} className="flex w-auto pb-4">
              Snippets
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link href={Routes.Bookmarks()} className="flex w-auto pb-4">
              Bookmarks
            </Link>
          </li>
          <li className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <Link
              href={Routes.Resume()}
              download
              className="flex w-auto pb-4"
              title="PDF document. Serhii Shramko - Resume. 105 KB"
            >
              Resume
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
