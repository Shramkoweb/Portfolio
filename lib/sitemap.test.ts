import { buildSitemap, priorityForPath, STATIC_PATHS } from '@/lib/sitemap';
import { PostCategory, PostMetadata } from '@/lib/types';

const post = (
  slug: string,
  createDate: number,
  updateDate: number | null = null,
): PostMetadata => ({
  data: {
    slug,
    title: slug,
    heading: slug,
    description: slug,
    categories: [PostCategory.JS],
    featured: false,
    keywords: [],
    readTime: '1 min read',
    createDate,
    updateDate,
  },
});

describe('priorityForPath', () => {
  test.each([
    ['/', 1],
    ['/blog', 0.9],
    ['/blog/post', 0.8],
    ['/blog/category/js', 0.7],
  ])('%s → %s', (path, priority) => {
    expect(priorityForPath(path)).toBe(priority);
  });
});

describe('buildSitemap', () => {
  const entries = buildSitemap({
    posts: [
      post('p1', Date.UTC(2024, 0, 1)),
      post('p2', Date.UTC(2023, 0, 1), Date.UTC(2024, 5, 1)),
    ],
    snippets: [
      {
        data: {
          slug: 's1',
          title: '',
          heading: '',
          description: '',
          keywords: [],
          createDate: Date.UTC(2022, 0, 1),
          updateDate: null,
        },
      },
    ],
    categories: ['JS', 'Clean-Code'],
  });
  const byUrl = Object.fromEntries(entries.map((e) => [e.url, e]));

  test('includes every static path with depth priorities', () => {
    for (const path of STATIC_PATHS) {
      expect(byUrl[`https://shramko.dev${path}`]).toBeDefined();
    }
    expect(byUrl['https://shramko.dev/'].priority).toBe(1);
    expect(byUrl['https://shramko.dev/blog'].priority).toBe(0.9);
    expect(
      byUrl['https://shramko.dev/quizlet-list/privacy-policy'].priority,
    ).toBe(0.8);
  });

  test('uses updateDate, else createDate, as lastModified for content', () => {
    expect(byUrl['https://shramko.dev/blog/p1'].lastModified).toEqual(
      new Date(Date.UTC(2024, 0, 1)),
    );
    expect(byUrl['https://shramko.dev/blog/p2'].lastModified).toEqual(
      new Date(Date.UTC(2024, 5, 1)),
    );
    expect(byUrl['https://shramko.dev/snippets/s1'].lastModified).toEqual(
      new Date(Date.UTC(2022, 0, 1)),
    );
  });

  test('lowercases category paths and omits lastModified for them', () => {
    expect(byUrl['https://shramko.dev/blog/category/clean-code']).toEqual({
      url: 'https://shramko.dev/blog/category/clean-code',
      priority: 0.7,
    });
  });

  test('never lists the feed', () => {
    expect(entries.some((e) => e.url.endsWith('/feed.xml'))).toBe(false);
  });
});
