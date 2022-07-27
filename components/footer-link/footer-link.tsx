import { PropsWithChildren } from 'react';

interface FooterLinkProps {
  href: string;
}

export function FooterLink({ href, children }: PropsWithChildren<FooterLinkProps>) {
  return (
    <a
      className="text-gray-500 hover:text-gray-600 transition"
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {children}
    </a>
  );
}
