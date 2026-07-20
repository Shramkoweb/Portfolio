import { render, screen } from '@testing-library/react';

import { Categories } from '@/components/categories';
import { PostCategory } from '@/lib/types';

describe('Categories component', () => {
  test('renders "All" link pointing to /blog', () => {
    render(<Categories categories={[PostCategory.JS]} />);

    const allLink = screen.getByRole('link', { name: 'All' });

    expect(allLink).toHaveAttribute('href', '/blog');
  });

  test('renders category links with correct URLs', () => {
    render(
      <Categories categories={[PostCategory.JS, PostCategory.CleanCode]} />,
    );

    const jsLink = screen.getByRole('link', { name: 'js' });
    const cleanCodeLink = screen.getByRole('link', { name: 'clean code' });

    expect(jsLink).toHaveAttribute('href', '/blog/category/js');
    expect(cleanCodeLink).toHaveAttribute('href', '/blog/category/clean-code');
  });

  test('renders correct number of links including "All"', () => {
    const categories = [PostCategory.JS, PostCategory.TS];
    render(<Categories categories={categories} />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(categories.length + 1);
  });

  test('renders only "All" link when categories empty', () => {
    render(<Categories categories={[]} />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('All');
  });
});
