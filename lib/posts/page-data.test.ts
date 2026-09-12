import { getPostsCategories, getPostsMetadata } from '@/lib/posts/api';
import {
  getBlogPageData,
  getCategoryPageData,
  getHomePageData,
} from '@/lib/posts/page-data';
import { PostCategory, PostMetadata } from '@/lib/types';

jest.mock('@/lib/posts/api', () => ({
  ...jest.requireActual('@/lib/posts/api'),
  getPostsMetadata: jest.fn(),
  getPostsCategories: jest.fn(),
}));

const makeMeta = (
  slug: string,
  createDate: number,
  overrides: Partial<PostMetadata['data']> = {},
): PostMetadata => ({
  data: {
    slug,
    title: `${slug} title`,
    heading: `${slug} heading`,
    description: `${slug} description`,
    categories: [PostCategory.JS],
    featured: false,
    keywords: [],
    readTime: '1 min read',
    createDate,
    updateDate: null,
    ...overrides,
  },
});

beforeEach(() => {
  (getPostsCategories as jest.Mock).mockResolvedValue([PostCategory.JS]);
});

describe('getBlogPageData', () => {
  test('sorts posts newest-first by createDate', async () => {
    const older = makeMeta('older', new Date('2020-01-01').getTime());
    const newer = makeMeta('newer', new Date('2024-01-01').getTime());
    const middle = makeMeta('middle', new Date('2022-01-01').getTime());
    (getPostsMetadata as jest.Mock).mockResolvedValue([older, newer, middle]);

    const { posts } = await getBlogPageData();

    expect(posts.map((p) => p.data.slug)).toEqual(['newer', 'middle', 'older']);
  });

  test('caps the JSON-LD blogPost array at the 25 most recent entries', async () => {
    const posts = Array.from({ length: 30 }, (_, i) =>
      makeMeta(`p${i}`, new Date(2000, 0, 1).getTime() + i * 86400000),
    );
    (getPostsMetadata as jest.Mock).mockResolvedValue(posts);

    const { jsonLd } = await getBlogPageData();

    expect(jsonLd.blogPost).toHaveLength(25);
    expect(jsonLd.blogPost[0].url).toBe('https://shramko.dev/blog/p29');
  });

  test('builds JSON-LD entries from each post heading/description/slug', async () => {
    const post = makeMeta('hello-world', Date.now(), {
      heading: 'Hello, world',
      description: 'A greeting',
    });
    (getPostsMetadata as jest.Mock).mockResolvedValue([post]);

    const { jsonLd } = await getBlogPageData();

    expect(jsonLd.blogPost[0]).toEqual(
      expect.objectContaining({
        '@type': 'BlogPosting',
        headline: 'Hello, world',
        description: 'A greeting',
        url: 'https://shramko.dev/blog/hello-world',
      }),
    );
  });

  test('forwards categories from the data layer untouched', async () => {
    const cats = [PostCategory.React, PostCategory.TS];
    (getPostsMetadata as jest.Mock).mockResolvedValue([]);
    (getPostsCategories as jest.Mock).mockResolvedValue(cats);

    const { categories } = await getBlogPageData();

    expect(categories).toEqual(cats);
  });
});

describe('getHomePageData', () => {
  test('splits featured, advanced-react and the three latest other posts', async () => {
    const featured = makeMeta('featured', 5, { featured: true });
    const advanced = makeMeta('advanced', 4, {
      categories: [PostCategory.AdvancedReact],
    });
    const others = [1, 2, 3, 6].map((t) => makeMeta(`other-${t}`, t));
    (getPostsMetadata as jest.Mock).mockResolvedValue([
      ...others,
      featured,
      advanced,
    ]);

    const data = await getHomePageData();

    expect(data.featuredPosts.map((p) => p.data.slug)).toEqual(['featured']);
    expect(data.advancedReactPosts.map((p) => p.data.slug)).toEqual([
      'advanced',
    ]);
    expect(data.otherPosts.map((p) => p.data.slug)).toEqual([
      'other-6',
      'other-3',
      'other-2',
    ]);
  });

  test('lists advanced-react posts oldest-first', async () => {
    const a = makeMeta('a', 1, { categories: [PostCategory.AdvancedReact] });
    const b = makeMeta('b', 2, { categories: [PostCategory.AdvancedReact] });
    (getPostsMetadata as jest.Mock).mockResolvedValue([b, a]);

    const { advancedReactPosts } = await getHomePageData();

    expect(advancedReactPosts.map((p) => p.data.slug)).toEqual(['a', 'b']);
  });
});

describe('getCategoryPageData', () => {
  test('filters and sorts posts of the category and returns its SEO data', async () => {
    const js1 = makeMeta('js-old', 1, { categories: ['JS' as PostCategory] });
    const js2 = makeMeta('js-new', 2, { categories: ['JS' as PostCategory] });
    const css = makeMeta('css', 3, { categories: ['CSS' as PostCategory] });
    (getPostsMetadata as jest.Mock).mockResolvedValue([js1, css, js2]);

    const data = await getCategoryPageData('js');

    expect(data).not.toBeNull();
    expect(data!.posts.map((p) => p.data.slug)).toEqual(['js-new', 'js-old']);
    expect(data!.category).toBe('JS');
    expect(data!.categories).toEqual(['JS', 'CSS']);
    expect(data!.seoTitle).toBe('JavaScript Tips to Enhance Coding Skills');
    expect(data!.seoKeywords).toBe('JavaScript, Programming, Development');
    expect(data!.seoDescription).toMatch(/Master JavaScript/);
  });

  test('returns null for an unknown category', async () => {
    (getPostsMetadata as jest.Mock).mockResolvedValue([
      makeMeta('js', 1, { categories: ['JS' as PostCategory] }),
    ]);

    expect(await getCategoryPageData('rust')).toBeNull();
  });
});
