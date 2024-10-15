import { PropsWithChildren } from 'react';

interface FooterLinkProps {
  href: string;
}

export function FooterLink({
  href,
  children,
}: PropsWithChildren<FooterLinkProps>) {
  return (
    <a
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      target="_blank"
      rel="nofollow noopener"
      href={href}
    >
      {children}
    </a>
  );
}
