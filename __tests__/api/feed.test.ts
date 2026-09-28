import { PostCategory, PostMetadata } from '@/lib/types';
import handler from '@/pages/api/feed';

import { createMockReqRes } from '../helpers/api-mocks';

const mockGetPostsMetadata = jest.fn();

jest.mock('@/lib/posts/api', () => ({
  getPostsMetadata: () => mockGetPostsMetadata(),
}));

function post(
  slug: string,
  createDate: string,
  updateDate: string | null = null,
): PostMetadata {
  return {
    data: {
      slug,
      title: slug,
      heading: `Heading ${slug}`,
      description: `About ${slug}`,
      categories: [PostCategory.JS],
      keywords: [],
      featured: false,
      readTime: '1 min read',
      createDate: Date.parse(createDate),
      updateDate: updateDate ? Date.parse(updateDate) : null,
    },
  };
}

async function requestFeed() {
  const mocks = createMockReqRes();
  await handler(mocks.req, mocks.res);
  const xml: string = mocks.send.mock.calls[0][0];
  return { ...mocks, xml };
}

describe('API /api/feed', () => {
  it('responds with cacheable RSS', async () => {
    mockGetPostsMetadata.mockResolvedValue([post('a', '2024-01-01')]);

    const { status, setHeader, xml } = await requestFeed();

    expect(status).toHaveBeenCalledWith(200);
    expect(setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/rss+xml; charset=utf-8',
    );
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    expect(xml).toMatch(/^<\?xml version="1.0"/);
  });

  it('lists posts newest first', async () => {
    mockGetPostsMetadata.mockResolvedValue([
      post('old', '2023-01-01'),
      post('new', '2025-01-01'),
      post('mid', '2024-01-01'),
    ]);

    const { xml } = await requestFeed();

    const order = [...xml.matchAll(/<link>[^<]*\/blog\/([^<]+)<\/link>/g)].map(
      ([, slug]) => slug,
    );
    expect(order).toEqual(['new', 'mid', 'old']);
  });

  it('uses the most recent update date as lastBuildDate', async () => {
    mockGetPostsMetadata.mockResolvedValue([
      post('newest', '2025-01-01'),
      post('older-but-edited', '2023-01-01', '2026-03-15'),
    ]);

    const { xml } = await requestFeed();

    expect(xml).toContain(
      `<lastBuildDate>${new Date('2026-03-15').toUTCString()}</lastBuildDate>`,
    );
  });

  it('falls back to the current time when there are no posts', async () => {
    jest.useFakeTimers({ now: new Date('2026-09-28T12:00:00Z') });
    mockGetPostsMetadata.mockResolvedValue([]);

    const { xml } = await requestFeed();

    expect(xml).toContain(
      '<lastBuildDate>Mon, 28 Sep 2026 12:00:00 GMT</lastBuildDate>',
    );
    expect(xml).not.toContain('<item>');
    jest.useRealTimers();
  });
});
