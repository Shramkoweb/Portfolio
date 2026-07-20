import { render, screen } from '@testing-library/react';

import { PostCategory, PostMetadata, SnippetMetadata } from '@/lib/types';
import IndexPage, {
  getStaticProps as getIndexStaticProps,
} from '@/pages/index';
import SnippetsPage, {
  getStaticProps as getSnippetsStaticProps,
} from '@/pages/snippets';

const makePost = (slug: string, featured = false): PostMetadata => ({
  data: {
    slug,
    title: `${slug} title`,
    heading: `${slug} heading`,
    description: `${slug} description`,
    createDate: 1700000000000,
    keywords: [],
    updateDate: null,
    readTime: '3 min read',
    featured,
    categories: featured ? [PostCategory.JS] : [PostCategory.AdvancedReact],
  },
});

const makeSnippet = (slug: string): SnippetMetadata => ({
  data: {
    slug,
    title: `${slug} title`,
    heading: `${slug} heading`,
    description: `${slug} description`,
    createDate: 1700000000000,
    keywords: [],
    updateDate: null,
  },
});

describe('list pages static props payload', () => {
  test('homepage props contain post metadata only, no content', async () => {
    const result = await getIndexStaticProps();

    if (!('props' in result)) {
      throw new Error('expected getStaticProps to return props');
    }

    const { featuredPosts, otherPosts, advancedReactPosts } = result.props;
    const allPosts = [...featuredPosts, ...otherPosts, ...advancedReactPosts];

    expect(allPosts.length).toBeGreaterThan(0);
    for (const post of allPosts) {
      expect(post).not.toHaveProperty('content');
      expect(post.data.slug).toEqual(expect.any(String));
      expect(post.data.heading).toEqual(expect.any(String));
    }
  });

  test('snippets page props contain snippet metadata only, no content', async () => {
    const result = await getSnippetsStaticProps();

    if (!('props' in result)) {
      throw new Error('expected getStaticProps to return props');
    }

    const { snippets, jsonLd } = result.props;

    expect(snippets.length).toBeGreaterThan(0);
    for (const snippet of snippets) {
      expect(snippet).not.toHaveProperty('content');
      expect(snippet.data.heading).toEqual(expect.any(String));
    }
    expect(jsonLd).toHaveProperty('@type', 'CollectionPage');
  });
});

describe('list pages render from metadata-only props', () => {
  test('homepage renders post headings', () => {
    render(
      <IndexPage
        featuredPosts={[makePost('feat-one', true)]}
        otherPosts={[makePost('other-one')]}
        advancedReactPosts={[makePost('react-one')]}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Serhii Shramko' }),
    ).toBeInTheDocument();
    expect(screen.getByText('feat-one heading')).toBeInTheDocument();
    expect(screen.getByText('react-one heading')).toBeInTheDocument();
    expect(screen.getByText('other-one heading')).toBeInTheDocument();
  });

  test('snippets page renders snippet cards', () => {
    render(
      <SnippetsPage snippets={[makeSnippet('use-debounce')]} jsonLd={{}} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Code Snippets' }),
    ).toBeInTheDocument();
    expect(screen.getByText('use-debounce heading')).toBeInTheDocument();
  });
});
