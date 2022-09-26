import { fireEvent, render, screen } from '@testing-library/react';

import BlogPage from '@/pages/blog';
import { Post } from '@/lib/types';

jest.mock('@/lib/posts/api');

const posts: Post[] = [
  {
    data: {
      slug: 'first-article',
      description: 'First article description',
      featured: true,
      readTime: '1',
      categories: ['JS', 'React'],
      keywords: ['JS', 'React'],
      title: 'First article title',
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
      categories: ['TS', 'Redux'],
      keywords: ['TS', 'Redux'],
      title: 'Second article title',
      createDate: 124,
      updateData: 123,
    },
    content: 'Second article text',
  },
];

describe('Blog Page', () => {
  test('renders with correct heading', () => {
    render(<BlogPage posts={posts} postsAmount={posts.length} />);
    const heading = screen.getByRole('heading', {
      name: 'Blog',
    });

    expect(heading).toBeInTheDocument();
  });

  test('renders with initial posts', () => {
    render(<BlogPage posts={posts} postsAmount={posts.length} />);
    const blogPostsLinks = screen.getAllByRole('link');

    expect(blogPostsLinks).toHaveLength(posts.length);
  });

  test('on search correct filtered exist posts', () => {
    render(<BlogPage posts={posts} postsAmount={posts.length} />);
    const inputElement = screen.getByLabelText('Search articles');

    fireEvent.change(inputElement, { target: { value: posts[0].data.title } });
    const post = screen.getByRole('heading', {
      name: posts[0].data.title,
    });

    expect(post).toBeInTheDocument();
  });

  test('on search render "No posts found" if unknown post', () => {
    render(<BlogPage posts={posts} postsAmount={posts.length} />);
    const inputElement = screen.getByLabelText('Search articles');

    fireEvent.change(inputElement, { target: { value: 'Unknown post' } });
    const post = screen.getByText(/No posts found/);

    expect(post).toBeInTheDocument();
  });
});
