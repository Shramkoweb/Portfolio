import { PropsWithChildren } from 'react';

export const footerLinkClassName =
  'flex min-h-11 items-center text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-900 active:scale-[0.97] dark:text-gray-400 dark:hover:text-white';

interface FooterLinkProps {
  href: string;
  rel?: string;
}

export function FooterLink(props: PropsWithChildren<FooterLinkProps>) {
  const { href, children, rel = 'noopener' } = props;
  return (
    <a className={footerLinkClassName} target="_blank" rel={rel} href={href}>
      {children}
    </a>
  );
}
