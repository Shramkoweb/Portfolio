import type { NextApiRequest } from 'next';

export function isCrossSiteRequest(req: NextApiRequest): boolean {
  const site = req.headers['sec-fetch-site'];
  return typeof site === 'string' && site !== 'same-origin';
}

export function isJsonRequest(req: NextApiRequest): boolean {
  const contentType = req.headers['content-type'] ?? '';
  return contentType.split(';')[0].trim().toLowerCase() === 'application/json';
}
