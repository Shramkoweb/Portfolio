import { render, screen } from '@testing-library/react';

import { SeriesLabel, SeriesNav } from '@/components/series-nav';

const middle = {
  part: 2,
  total: 4,
  prev: { slug: 'react-rerender', heading: 'React Re-Renders' },
  next: { slug: 'react-elements-children', heading: 'React Elements' },
};

describe('SeriesLabel', () => {
  it('shows the part number and links to the series category', () => {
    render(<SeriesLabel series={middle} />);

    expect(screen.getByText(/Part 2 of 4/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Advanced React' }),
    ).toHaveAttribute('href', '/blog/category/advanced-react');
  });
});

describe('SeriesNav', () => {
  it('links to the previous and next parts', () => {
    render(<SeriesNav series={middle} />);

    expect(screen.getByRole('link', { name: /Part 1/ })).toHaveAttribute(
      'href',
      '/blog/react-rerender',
    );
    expect(screen.getByRole('link', { name: /Part 3/ })).toHaveAttribute(
      'href',
      '/blog/react-elements-children',
    );
  });

  it('shows only the previous part on the latest post', () => {
    render(<SeriesNav series={{ ...middle, part: 4, next: null }} />);

    expect(screen.getByRole('link', { name: /Part 3/ })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders nothing for a single-post series', () => {
    const { container } = render(
      <SeriesNav series={{ part: 1, total: 1, prev: null, next: null }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
