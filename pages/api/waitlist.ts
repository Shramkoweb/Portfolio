import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from 'lib/prisma';

const MAX_EMAIL_LENGTH = 255;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  ipTimestamps.set(ip, recent);

  return false;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']?.split(',')[0]?.trim()) ??
    req.socket.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const normalized = email.toLowerCase().trim();

  if (normalized.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(normalized)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    await prisma.waitlist.create({
      data: { email: normalized },
    });

    return res.status(201).json({ success: true });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({ error: 'Already subscribed' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
