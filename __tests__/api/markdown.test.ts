/**
 * @jest-environment node
 */
import { getPostSlugs } from '@/lib/posts/api';
import { getSnippetSlugs } from '@/lib/snippets/api';
import handler from '@/pages/api/markdown/[type]/[slug]';

import { createMockReqRes } from '../helpers/api-mocks';

async function request(query: Record<string, string>, method = 'GET') {
  const mocks = createMockReqRes({ method, query });
  await handler(mocks.req, mocks.res);
  const headers = Object.fromEntries(mocks.setHeader.mock.calls);
  return {
    status: mocks.status.mock.calls[0][0],
    headers,
    body: mocks.send.mock.calls[0][0] as string,
  };
}

describe('API /api/markdown/[type]/[slug]', () => {
  it('serves a post as cacheable Markdown with a canonical link', async () => {
    const { status, headers, body } = await request({
      type: 'blog',
      slug: 'react-useref',
    });

    expect(status).toBe(200);
    expect(headers).toEqual({
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: '<https://shramko.dev/blog/react-useref>; rel="canonical"',
      Vary: 'Accept',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    });
    expect(body).toMatch(/^# useRef in React/);
    expect(body).toContain('Source: https://shramko.dev/blog/react-useref');
    expect(body).toContain('](https://shramko.dev/static/images/useref.png)');
  });

  it('serves a snippet', async () => {
    const { status, body } = await request({
      type: 'snippets',
      slug: 'debounce',
    });

    expect(status).toBe(200);
    expect(body).toContain('Source: https://shramko.dev/snippets/debounce');
  });

  it.each([
    { type: 'blog', slug: 'missing-post' },
    { type: 'blog', slug: 'react-useref.md' },
    { type: 'blog', slug: '../package' },
    { type: 'blog', slug: '../../package.json' },
    { type: 'snippets', slug: 'react-useref' },
    { type: 'pages', slug: 'about' },
    { type: 'toString', slug: 'react-useref' },
  ])('returns 404 for $type/$slug', async (query) => {
    const { status, headers, body } = await request(query);

    expect(status).toBe(404);
    expect(headers['Content-Type']).toBe('text/plain; charset=utf-8');
    expect(body).toBe('Not found\n');
  });

  it('rejects other methods', async () => {
    const { status, headers } = await request(
      { type: 'blog', slug: 'react-useref' },
      'POST',
    );

    expect(status).toBe(405);
    expect(headers.Allow).toBe('GET, HEAD');
  });

  it('converts every published post and snippet', async () => {
    const pages = [
      ...(await getPostSlugs()).map((slug) => ({ type: 'blog', slug })),
      ...(await getSnippetSlugs()).map((slug) => ({ type: 'snippets', slug })),
    ];

    for (const page of pages) {
      const { status } = await request(page);
      expect([page.slug, status]).toEqual([page.slug, 200]);
    }
  });
});
