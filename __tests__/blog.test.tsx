import { fireEvent, render, screen } from '@testing-library/react';

import BlogPage from '@/pages/blog';
import { Post } from '@/lib/types';

jest.mock('@/lib/posts/api');
jest.mock('@/components/categories');

const CATEGORIES = ['JS', 'React'];
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
      updateData: 12,
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
      updateData: 123,
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

    expect(blogPostsLinks).toHaveLength(POSTS.length);
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

  test('on search render "No articles found" if unknown article', () => {
    render(<BlogPage posts={POSTS} categories={CATEGORIES} />);
    const inputElement = screen.getByLabelText('Search articles');

    fireEvent.change(inputElement, { target: { value: 'Unknown article' } });
    const post = screen.getByText(/No articles found/);

    expect(post).toBeInTheDocument();
  });
});
