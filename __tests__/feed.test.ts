/**
 * @jest-environment node
 */
import { GET } from '@/app/feed.xml/route';
import { getPostsMetadata } from '@/lib/posts/api';
import { PostCategory, PostMetadata } from '@/lib/types';

jest.mock('@/lib/posts/api');

const post = (slug: string, createDate: number): PostMetadata => ({
  data: {
    slug,
    title: slug,
    heading: `${slug} heading`,
    description: `${slug} description`,
    categories: [PostCategory.JS],
    featured: false,
    keywords: [],
    readTime: '1 min read',
    createDate,
    updateDate: null,
  },
});

describe('GET /feed.xml', () => {
  it('serves RSS with the posts newest-first', async () => {
    (getPostsMetadata as jest.Mock).mockResolvedValue([
      post('old', Date.UTC(2023, 0, 1)),
      post('new', Date.UTC(2024, 0, 1)),
    ]);

    const res = await GET();
    const body = await res.text();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe(
      'application/rss+xml; charset=utf-8',
    );
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain(
      '<lastBuildDate>Mon, 01 Jan 2024 00:00:00 GMT</lastBuildDate>',
    );
    expect(body.indexOf('https://shramko.dev/blog/new')).toBeLessThan(
      body.indexOf('https://shramko.dev/blog/old'),
    );
  });
});
