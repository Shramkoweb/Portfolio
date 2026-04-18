import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import React, { AnchorHTMLAttributes, ClassAttributes, JSX } from 'react';

import { Routes } from '@/lib/routes';

import { Code } from './code';

function CustomLink(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { href, children, className } = props;
  const isInternalLink =
    href &&
    (href.startsWith('/') || href.startsWith('.') || href.startsWith('#'));
  const isItLinkTree = href && href === Routes.LinkTree();

  if (isItLinkTree) {
    return (
      <a target="_blank" href={href} className={className} rel="noopener">
        {children}
      </a>
    );
  }
  if (isInternalLink) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener" href={href} className={className}>
      {children}
    </a>
  );
}

function RoundedImage(props: ImageProps & { inverted: boolean }) {
  const {
    alt = '',
    src,
    priority = false,
    inverted = false,
    ...restProps
  } = props;

  const concatenatedSrc = `/static/images/${src}`;

  return (
    <Image
      src={concatenatedSrc}
      alt={alt}
      className={`rounded-lg mt-4 mb-8 ${inverted ? 'inverted' : ''}`}
      width={768}
      height={300}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 768px"
      style={{ width: '100%', height: 'auto' }}
      {...restProps}
    />
  );
}

export const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  pre: Code,
};
