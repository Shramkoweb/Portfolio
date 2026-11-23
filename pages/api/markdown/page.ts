import type { NextApiRequest, NextApiResponse } from 'next';

import { SITE_URL } from '@/lib/constants';
import { rejectNonGet, sendMarkdown, sendNotFound } from '@/lib/markdown/http';
import { getProjectPageMarkdown } from '@/lib/markdown/project-pages';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (rejectNonGet(req, res)) {
    return;
  }

  const { path } = req.query;
  const markdown =
    typeof path === 'string' ? await getProjectPageMarkdown(path) : null;

  if (markdown === null) {
    sendNotFound(res);
    return;
  }

  sendMarkdown(res, `${SITE_URL}/${path}`, markdown);
}
