import { readFileSync } from 'node:fs';
import path from 'node:path';

import { ImageResponse } from '@vercel/og';
import type { NextApiRequest, NextApiResponse } from 'next';

import { categoryToSeoData } from '@/lib/utils';

const MAX_TITLE_LENGTH = 100;
// @vercel/og refuses to fetch loopback and private hosts, so never load this over HTTP
const background = `data:image/jpeg;base64,${readFileSync(
  path.join(process.cwd(), 'public/static/images/og-background.jpg'),
).toString('base64')}`;
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

// The method check must decide before Next's body parser can reject a
// malformed POST body with 400.
export const config = {
  api: { bodyParser: false },
};

function sendText(res: NextApiResponse, status: number, body: string) {
  res
    .status(status)
    .setHeader('Content-Type', 'text/plain; charset=utf-8')
    .setHeader('Cache-Control', 'no-store')
    .send(body);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    sendText(res, 405, 'Method not allowed');
    return;
  }

  const { searchParams } = new URL(req.url ?? '/', 'http://localhost');
  if (
    [...searchParams.keys()].some((key) => key !== 'title') ||
    searchParams.getAll('title').length > 1
  ) {
    sendText(res, 400, 'Invalid query parameters');
    return;
  }
  const rawTitle = searchParams.get('title') ?? 'Serhii Shramko';
  if (!allowedTitles.has(rawTitle)) {
    sendText(res, 404, 'Unknown title');
    return;
  }

  const title =
    rawTitle.length > MAX_TITLE_LENGTH
      ? `${rawTitle.slice(0, MAX_TITLE_LENGTH)}…`
      : rawTitle;

  const image = new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#000',
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 100%',
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

  // Render before setting any headers, so a failure cannot go out as a
  // year-long cacheable PNG.
  let body: Buffer;
  try {
    body = Buffer.from(await image.arrayBuffer());
  } catch {
    sendText(res, 500, 'Internal Server Error');
    return;
  }

  image.headers.forEach((value, key) => res.setHeader(key, value));
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.send(body);
}
