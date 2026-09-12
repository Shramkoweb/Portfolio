import { render, screen } from '@testing-library/react';

import BlogPage from '@/app/blog/page';
import { getBlogPageData } from '@/lib/posts/page-data';
import { PostCategory, PostMetadata } from '@/lib/types';

jest.mock('@/lib/posts/page-data');
// The list is covered by components/blog-list.test.tsx; this file is about the
// page chrome that used to be asserted in the deleted __tests__/blog.test.tsx.
jest.mock('@/components/blog-list', () => ({
  BlogList: () => null,
}));

const makePost = (slug: string): PostMetadata => ({
  data: {
    slug,
    title: `${slug} title`,
    heading: `${slug} heading`,
    description: `${slug} description`,
    categories: [PostCategory.JS],
    featured: false,
    keywords: [],
    readTime: '1 min read',
    createDate: 1,
    updateDate: null,
  },
});

function mockPageData(posts: PostMetadata[]) {
  (getBlogPageData as jest.Mock).mockResolvedValue({
    posts,
    categories: [PostCategory.JS],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      blogPost: [],
    },
  });
}

describe('Blog page chrome', () => {
  test('pluralises the article counter for many posts', async () => {
    mockPageData([makePost('a'), makePost('b')]);

    render(await BlogPage());

    expect(
      screen.getByRole('heading', { level: 1, name: 'Blog 2 articles' }),
    ).toBeInTheDocument();
  });

  test('uses the singular counter for exactly one post', async () => {
    mockPageData([makePost('only')]);

    render(await BlogPage());

    expect(
      screen.getByRole('heading', { level: 1, name: 'Blog 1 article' }),
    ).toBeInTheDocument();
  });

  test('renders the RSS link', async () => {
    mockPageData([makePost('a')]);

    render(await BlogPage());

    expect(screen.getByRole('link', { name: /RSS/ })).toHaveAttribute(
      'href',
      '/feed.xml',
    );
  });
});
