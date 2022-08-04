import Image, { ImageProps } from 'next/future/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, ClassAttributes } from 'react';

// eslint-disable-next-line max-len
function CustomLink(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, className } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} className={className}>{children}</a>;
}

function RoundedImage(props: ImageProps) {
  const { alt = '', ...restProps } = props;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Image alt={alt} className="rounded-lg mt-4 mb-8" {...restProps} width={700} height={100} priority />;
}

const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
};

export default MDXComponents;