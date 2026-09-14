import { act, render, screen, waitFor } from '@testing-library/react';

import { PostGrid } from '@/components/post-grid';

const ITEMS = [
  { slug: 'a', heading: 'Post A', classNames: 'x' },
  { slug: 'b', heading: 'Post B', classNames: 'y' },
];

describe('PostGrid', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ views: { a: 1234 } }),
    });
  });

  test('renders a link per item and fetches all views once', async () => {
    await act(async () => {
      render(<PostGrid items={ITEMS} />);
    });

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(global.fetch).toHaveBeenCalledWith('/api/views', undefined);
  });

  test('shows the view count for slugs present in the response', async () => {
    await act(async () => {
      render(<PostGrid items={ITEMS} />);
    });

    await waitFor(() => {
      expect(screen.getByText('1,234')).toBeInTheDocument();
    });
  });
});
