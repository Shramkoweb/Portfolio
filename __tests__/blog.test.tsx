import { fireEvent, render, screen } from '@testing-library/react';

import { Post, PostCategory } from '@/lib/types';
import BlogPage from '@/pages/blog';

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
});
