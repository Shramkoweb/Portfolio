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
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      target="_blank"
      rel="noopener"
      href={href}
    >
      {children}
    </a>
  );
}
