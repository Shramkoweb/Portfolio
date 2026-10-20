import type { NextApiRequest, NextApiResponse } from 'next';

import { isKnownSlug } from '@/lib/valid-slugs';

export async function validateSlugRouteRequest(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<string | null> {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: { message: 'Method not allowed' } });
    return null;
  }

  const slug = req.query.slug;
  res.setHeader('Cache-Control', 'no-store');

  if (typeof slug !== 'string' || !(await isKnownSlug(slug))) {
    res.status(404).json({ error: { message: 'Unknown slug' } });
    return null;
  }

  if (Object.keys(req.query).some((key) => key !== 'slug')) {
    res.status(400).json({ error: { message: 'Unexpected query parameter' } });
    return null;
  }

  return slug;
}
