import type { NextApiRequest, NextApiResponse } from 'next';

export function sendText(res: NextApiResponse, status: number, body: string) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(status).send(body);
}

/** Answers anything but GET and HEAD with 405; returns whether it did. */
export function rejectNonGet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return false;
  }
  res.setHeader('Allow', 'GET, HEAD');
  sendText(res, 405, 'Method not allowed\n');
  return true;
}

export function sendNotFound(res: NextApiResponse) {
  sendText(res, 404, 'Not found\n');
}

export function sendMarkdown(
  res: NextApiResponse,
  canonicalUrl: string,
  body: string,
) {
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Link', `<${canonicalUrl}>; rel="canonical"`);
  res.setHeader('Vary', 'Accept');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.status(200).send(body);
}
