import { fireEvent, render, screen } from '@testing-library/react';

import { CategoryPostList } from '@/components/category-post-list';
import { PostCategory, PostMetadata } from '@/lib/types';

jest.mock('@/components/categories');

const post = (slug: string, heading: string): PostMetadata => ({
  data: {
    slug,
    heading,
    title: heading,
    description: `${heading} description`,
    categories: [PostCategory.JS],
    featured: false,
    keywords: [],
    readTime: '1 min read',
    createDate: 1,
    updateDate: null,
  },
});

const POSTS = [post('closures', 'Closures'), post('promises', 'Promises')];

describe('CategoryPostList', () => {
  test('renders every post before searching', () => {
    render(<CategoryPostList posts={POSTS} categories={[PostCategory.JS]} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  test('filters by heading as the user types', () => {
    render(<CategoryPostList posts={POSTS} categories={[PostCategory.JS]} />);

    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'clos' },
    });

    expect(
      screen.getByRole('heading', { name: 'Closures' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Promises' }),
    ).not.toBeInTheDocument();
  });

  test('shows the empty state when nothing matches', () => {
    render(<CategoryPostList posts={POSTS} categories={[PostCategory.JS]} />);

    fireEvent.change(screen.getByLabelText('Search articles'), {
      target: { value: 'zzz' },
    });

    expect(
      screen.getByText(/We couldn't find any articles matching/),
    ).toBeInTheDocument();
  });
});
