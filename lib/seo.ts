import { SITE_URL } from '@/lib/constants';

export interface SocialImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export const SITE_IMAGE: SocialImage = {
  url: `${SITE_URL}/static/images/twittersite.png`,
  width: 2048,
  height: 1170,
  alt: 'Next.js, TypeScript and React — @shramkoweb',
  type: 'image/png',
};

export function getSocialImage(title: string): SocialImage {
  return {
    url: `${SITE_URL}/og?title=${encodeURIComponent(title)}`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/png',
  };
}
