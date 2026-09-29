import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import { categoryToSeoData } from '@/lib/utils';

export const config = {
  runtime: 'edge',
};

const MAX_TITLE_LENGTH = 100;
const allowedTitles = new Set<string>([
  'Serhii Shramko',
  'About | Serhii Shramko',
  'Developer Bookmarks & Open Source | Serhii Shramko',
  'Software Engineering Blog | Serhii Shramko',
  'Learning | Serhii Shramko',
  '404 | Serhii Shramko',
  'JavaScript, TypeScript, React & CSS Code Snippets | Serhii Shramko',
  'Gear | Serhii Shramko',
  'Dashboard | Serhii Shramko',
  ...Object.values(categoryToSeoData).map(({ title }) => title),
  ...JSON.parse(process.env.OG_CONTENT_TITLES ?? '[]'),
]);

export default async function handler(req: NextRequest) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' },
    });
  }

  const { searchParams } = new URL(req.url);
  if (
    [...searchParams.keys()].some((key) => key !== 'title') ||
    searchParams.getAll('title').length > 1
  ) {
    return new Response('Invalid query parameters', {
      status: 400,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
  const rawTitle = searchParams.get('title') ?? 'Serhii Shramko';
  if (!allowedTitles.has(rawTitle)) {
    return new Response('Unknown title', {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const title =
    rawTitle.length > MAX_TITLE_LENGTH
      ? `${rawTitle.slice(0, MAX_TITLE_LENGTH)}…`
      : rawTitle;

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#111',
        padding: '60px 80px',
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.2,
          maxWidth: '80%',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#9ca3af',
          marginTop: 24,
        }}
      >
        shramko.dev
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      // @vercel/og's default omits s-maxage, which the CDN needs to cache this.
      // The CDN cache key includes the deployment, so a template change lands
      // on the next deploy; the short max-age bounds browser staleness.
      headers: {
        'cache-control':
          'public, no-transform, max-age=3600, s-maxage=31536000',
      },
    },
  );
}
