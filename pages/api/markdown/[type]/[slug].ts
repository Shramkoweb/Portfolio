import type { NextApiRequest, NextApiResponse } from 'next';

import { SITE_URL } from '@/lib/constants';
import { rejectNonGet, sendMarkdown, sendNotFound } from '@/lib/markdown/http';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (rejectNonGet(req, res)) {
    return;
  }

  const { type, slug } = req.query;

  // The slug allowlist is what keeps a crafted slug from reading other files.
  if (
    !isSourceType(type) ||
    typeof slug !== 'string' ||
    !(await SOURCES[type].getSlugs()).includes(slug)
  ) {
    sendNotFound(res);
    return;
  }

  const { data, content } = await SOURCES[type].getBySlug(slug);
  const url = `${SITE_URL}/${type}/${slug}`;

  sendMarkdown(res, url, toMarkdown({ ...data, url, content }));
}
