import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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

  useEffect(() => function cleanup() {
    activatePageScroll();
  }, []);

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
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
          >
            <Link href="/">
              <a className="flex w-auto pb-4">Home</a>
            </Link>
          </li>
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
          >
            <Link href="/about">
              <a className="flex w-auto pb-4">About</a>
            </Link>
          </li>
          <li
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold"
          >
            <Link href="/gear">
              <a className="flex w-auto pb-4">Gear</a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
