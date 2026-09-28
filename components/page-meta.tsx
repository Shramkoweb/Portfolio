import Head from 'next/head';

import { getSocialImage, SocialImage } from '@/lib/seo';

interface PageMetaProps {
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
  image?: SocialImage;
  type?: 'website' | 'article';
}

export function PageMeta({
  title,
  description,
  socialTitle = title,
  socialDescription = description,
  image = getSocialImage(socialTitle),
  type = 'website',
}: PageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:title" content={socialTitle} key="og:title" />
      <meta
        property="og:description"
        content={socialDescription}
        key="og:description"
      />
      <meta property="og:image" content={image.url} key="og:image" />
      <meta
        property="og:image:width"
        content={String(image.width)}
        key="og:image:width"
      />
      <meta
        property="og:image:height"
        content={String(image.height)}
        key="og:image:height"
      />
      <meta property="og:image:type" content={image.type} key="og:image:type" />
      <meta property="og:image:alt" content={image.alt} key="og:image:alt" />
      <meta name="twitter:title" content={socialTitle} key="twitter:title" />
      <meta
        name="twitter:description"
        content={socialDescription}
        key="twitter:description"
      />
      <meta name="twitter:image" content={image.url} key="twitter:image" />
      <meta
        name="twitter:image:alt"
        content={image.alt}
        key="twitter:image:alt"
      />
    </Head>
  );
}
