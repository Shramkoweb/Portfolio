import { act, fireEvent, render, screen } from '@testing-library/react';

import { BlogList } from '@/components/blog-list';
import { PostCategory, PostMetadata } from '@/lib/types';

jest.mock('@/components/categories');

const CATEGORIES = [PostCategory.JS, PostCategory.React];
const POSTS: PostMetadata[] = [
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
  },
];

describe('BlogList', () => {
  test('renders one link per post', () => {
    render(<BlogList posts={POSTS} categories={CATEGORIES} />);

    expect(screen.getAllByRole('link')).toHaveLength(POSTS.length);
  });

  describe('search behaviour', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    test('debounces search input by 300ms before applying the filter', async () => {
      render(<BlogList posts={POSTS} categories={CATEGORIES} />);
      const input = screen.getByLabelText('Search articles');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'no-match-anywhere' } });
      });
      await act(async () => {
        jest.advanceTimersByTime(299);
      });
      expect(
        screen.queryByText(/We couldn't find any articles matching/),
      ).not.toBeInTheDocument();

      await act(async () => {
        jest.advanceTimersByTime(1);
      });
      expect(
        screen.getByText(/We couldn't find any articles matching/),
      ).toBeInTheDocument();
    });

    test('renders only the matching post while searching', async () => {
      render(<BlogList posts={POSTS} categories={CATEGORIES} />);
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

    test('renders the empty state when nothing matches', async () => {
      render(<BlogList posts={POSTS} categories={CATEGORIES} />);
      const input = screen.getByLabelText('Search articles');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'zzz-nothing-matches' } });
        jest.advanceTimersByTime(300);
      });

      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });
  });
});
