import type { NextApiRequest, NextApiResponse } from 'next';

import { SITE_URL } from '@/lib/constants';
import { toMarkdown } from '@/lib/markdown/to-markdown';
import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';
import { getSnippetBySlug, getSnippetSlugs } from '@/lib/snippets/api';

const SOURCES = {
  blog: { getSlugs: getPostSlugs, getBySlug: getPostBySlug },
  snippets: { getSlugs: getSnippetSlugs, getBySlug: getSnippetBySlug },
};

type SourceType = keyof typeof SOURCES;

function isSourceType(type: unknown): type is SourceType {
  return typeof type === 'string' && Object.hasOwn(SOURCES, type);
}

function sendText(res: NextApiResponse, status: number, body: string) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(status).send(body);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    sendText(res, 405, 'Method not allowed\n');
    return;
  }

  const { type, slug } = req.query;

  // The slug allowlist is what keeps a crafted slug from reading other files.
  if (
    !isSourceType(type) ||
    typeof slug !== 'string' ||
    !(await SOURCES[type].getSlugs()).includes(slug)
  ) {
    sendText(res, 404, 'Not found\n');
    return;
  }

  const { data, content } = await SOURCES[type].getBySlug(slug);
  const url = `${SITE_URL}/${type}/${slug}`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Link', `<${url}>; rel="canonical"`);
  res.setHeader('Vary', 'Accept');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.status(200).send(toMarkdown({ ...data, url, content }));
}
