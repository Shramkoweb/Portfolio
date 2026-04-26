import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

const MAX_EMAIL_LENGTH = 255;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
