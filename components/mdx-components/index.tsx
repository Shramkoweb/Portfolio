import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, ClassAttributes, JSX } from 'react';
import { Routes } from '@/lib/routes';
import { Code } from './code';
import React, { createContext, useContext, useRef } from 'react';

// Heading context for ToC
export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface HeadingContextType {
  addHeading: (heading: Heading) => void;
}

const HeadingContext = createContext<HeadingContextType | null>(null);

export function useHeadingContext() {
  return useContext(HeadingContext);
}

export const HeadingProvider = HeadingContext.Provider;

// Utility to extract plain text from React children
function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{ children?: React.ReactNode }>;
    return getTextFromChildren(element.props.children);
  }
  return '';
}

function createHeading(level: number) {
  return function HeadingComponent({ children, ...props }: any) {
    const { addHeading } = useHeadingContext() || {};
    const text = getTextFromChildren(children);
    // Generate id from text if not provided
    const id = props.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    // Only add heading if context exists (i.e., inside provider)
    React.useEffect(() => {
      if (addHeading) {
        addHeading({ id, text, level });
      }
    }, [id, text, level, addHeading]);
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag id={id} {...props}>{children}</Tag>;
  };
}

function CustomLink(
  props: JSX.IntrinsicAttributes &
  ClassAttributes<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { href, children, className } = props;
  const isInternalLink = href
    && (href.startsWith('/') || href.startsWith('.') || href.startsWith('#'));
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
    <a
      target="_blank"
      rel="noopener nofollow"
      href={href}
      className={className}
    >
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
      sizes="100vw"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
}

export const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  pre: Code,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};
