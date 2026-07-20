import { render, screen } from '@testing-library/react';

import { Tag } from '@/components/tag';

describe('Tag', () => {
  it('renders an accessible link to a route (category navigation)', () => {
    render(<Tag label="All" href="/blog" />);

    expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute(
      'href',
      '/blog',
    );
  });

  it('keeps the link contract for the inline variant (post category tags)', () => {
    render(<Tag variant="inline" label="#react" href="/blog/category/react" />);

    expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
      'href',
      '/blog/category/react',
    );
  });

  it('renders an accessible in-page link for hash hrefs (section navigation)', () => {
    render(<Tag label="Podcasts" href="#podcasts" />);

    expect(screen.getByRole('link', { name: 'Podcasts' })).toHaveAttribute(
      'href',
      '#podcasts',
    );
  });
});
