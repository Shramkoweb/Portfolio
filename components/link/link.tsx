import { useRouter } from 'next/router';
import NextLink from 'next/link';
import clsx from 'clsx';

interface LinkProps {
  href: string;
  text: string;
}

export function Link({ href, text }: LinkProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        href={href}
        className={clsx(
          isActive
            ? 'font-semibold text-gray-800 dark:text-gray-200'
            : 'font-normal text-gray-600 dark:text-gray-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}
