import { act, fireEvent, render, screen } from '@testing-library/react';

import { getPostsCategories, getPostsMetadata } from '@/lib/posts/api';
import { Post, PostCategory, PostMetadata } from '@/lib/types';
import BlogPage, { getStaticProps } from '@/pages/blog';

jest.mock('@/lib/posts/api');
jest.mock('@/components/categories');

const CATEGORIES = [PostCategory.JS, PostCategory.React];
const POSTS: Post[] = [
  {
    data: {
      slug: 'first-article',
      description: 'First article description',
      featured: true,
      readTime: '1',
      categories: CATEGORIES,
      keywords: ['JS', 'React'],
      title: 'First article title',
      heading: 'First article title',
      createDate: 11,
      updateDate: 12,
    },
    content: 'First article long text',
  },
  {
    data: {
      slug: 'second-article',
      description: 'Second article description',
      featured: false,
      readTime: '2',
      categories: CATEGORIES,
      keywords: ['TS', 'Redux'],
      title: 'Second article title',
      heading: 'Second article title',
      createDate: 124,
      updateDate: 123,
    },
    content: 'Second article text',
  },
];

describe('Blog Page', () => {
  test('renders with correct heading', () => {
    render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
    const heading = screen.getByRole('heading', {
      name: `Blog ${POSTS.length} articles`,
    });

    expect(heading).toBeInTheDocument();
  });

  test('renders with initial posts', () => {
    render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
    const blogPostsLinks = screen.getAllByRole('link');

    expect(blogPostsLinks).toHaveLength(POSTS.length + 1);
  });

  test('on search correct filtered exist articles', () => {
    render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
    const inputElement = screen.getByLabelText('Search articles');

    fireEvent.change(inputElement, { target: { value: POSTS[0].data.title } });
    const post = screen.getByRole('heading', {
      name: POSTS[0].data.title,
    });

    expect(post).toBeInTheDocument();
  });

  describe('search behaviour (business logic)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    test('debounces search input by 300ms before applying the filter', async () => {
      render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
      const input = screen.getByLabelText('Search articles');

      // Type a query that won't match anything
      await act(async () => {
        fireEvent.change(input, { target: { value: 'no-match-anywhere' } });
      });

      // Before the debounce expires, the unfiltered list is still shown
      await act(async () => {
        jest.advanceTimersByTime(299);
      });
      expect(
        screen.queryByText(/We couldn't find any articles matching/),
      ).not.toBeInTheDocument();

      // After 300ms the filter applies and the empty-state appears
      await act(async () => {
        jest.advanceTimersByTime(1);
      });
      expect(
        screen.getByText(/We couldn't find any articles matching/),
      ).toBeInTheDocument();
    });

    test('renders the empty-state when the debounced query has no matches', async () => {
      render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
      const input = screen.getByLabelText('Search articles');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'zzz-nothing-matches' } });
        jest.advanceTimersByTime(300);
      });

      // No article links remain — only the RSS link in the page chrome
      const links = screen.getAllByRole('link');
      const articleLinks = links.filter((a) =>
        a.getAttribute('href')?.startsWith('/blog/'),
      );
      expect(articleLinks).toHaveLength(0);
    });
  });
});

describe('Blog Page — getStaticProps (business logic)', () => {
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
    jest.clearAllMocks();
  });

  test('sorts posts newest-first by createDate', async () => {
    const older = makeMeta('older', new Date('2020-01-01').getTime());
    const newer = makeMeta('newer', new Date('2024-01-01').getTime());
    const middle = makeMeta('middle', new Date('2022-01-01').getTime());

    (getPostsMetadata as jest.Mock).mockResolvedValue([older, newer, middle]);
    (getPostsCategories as jest.Mock).mockResolvedValue([PostCategory.JS]);

    const result = await getStaticProps();

    expect(result.props.posts.map((p) => p.data.slug)).toEqual([
      'newer',
      'middle',
      'older',
    ]);
  });

  test('caps the JSON-LD blogPost array at the 25 most recent entries', async () => {
    const posts: PostMetadata[] = Array.from({ length: 30 }, (_, i) =>
      makeMeta(`p${i}`, new Date(2000, 0, 1).getTime() + i * 86400000),
    );

    (getPostsMetadata as jest.Mock).mockResolvedValue(posts);
    (getPostsCategories as jest.Mock).mockResolvedValue([]);

    const result = await getStaticProps();

    expect(result.props.jsonLd!.blogPost).toHaveLength(25);
    // Newest first — last seeded post should be first in jsonLd
    expect(result.props.jsonLd!.blogPost[0].url).toBe(
      'https://shramko.dev/blog/p29',
    );
  });

  test('builds JSON-LD entries from each post heading/description/slug', async () => {
    const post = makeMeta('hello-world', Date.now(), {
      heading: 'Hello, world',
      description: 'A greeting',
    });
    (getPostsMetadata as jest.Mock).mockResolvedValue([post]);
    (getPostsCategories as jest.Mock).mockResolvedValue([]);

    const result = await getStaticProps();
    const [entry] = result.props.jsonLd!.blogPost;

    expect(entry).toEqual(
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

    const result = await getStaticProps();

    expect(result.props.categories).toEqual(cats);
  });
});

describe('Blog Page — JSON-LD render path', () => {
  test('serialising the jsonLd prop does not throw', async () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Test',
      description: 'Test desc',
      blogPost: [
        {
          '@type': 'BlogPosting',
          headline: 'h',
          description: 'd',
          url: 'https://shramko.dev/blog/x',
        },
      ],
    };

    expect(() =>
      render(
        <BlogPage posts={POSTS} categories={CATEGORIES} jsonLd={jsonLd} />,
      ),
    ).not.toThrow();

    // Page chrome still renders alongside the head metadata
    expect(
      screen.getByRole('heading', { level: 1, name: /Blog/ }),
    ).toBeInTheDocument();
  });
});

describe('Blog Page — search match render path', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders only the matching post (and skips year separators) while searching', async () => {
    render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
    const input = screen.getByLabelText('Search articles');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'First article' } });
      jest.advanceTimersByTime(300);
    });

    expect(
      screen.getByRole('heading', { name: 'First article title' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Second article title' }),
    ).not.toBeInTheDocument();
  });
});
