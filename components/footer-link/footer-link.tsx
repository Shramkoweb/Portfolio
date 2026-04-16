import { PropsWithChildren } from 'react';

interface FooterLinkProps {
  href: string;
  rel?: string;
}

export function FooterLink(props: PropsWithChildren<FooterLinkProps>) {
  const { href, children, rel = 'noopener' } = props;
  return (
    <a
      className="text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white"
      target="_blank"
      rel={rel}
      href={href}
    >
      {children}
    </a>
  );
}
