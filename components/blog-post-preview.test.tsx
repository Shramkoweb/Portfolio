import { act, render, screen, waitFor } from '@testing-library/react';

import { BlogPostPreview } from '@/components/blog-post-preview';

function makeProps(slug: string) {
  return { slug, heading: 'Heading', excerpt: 'Excerpt body' };
}

describe('BlogPostPreview — view-count formatting (business logic)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders '--- views' while SWR has no data yet", async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    await act(async () => {
      render(<BlogPostPreview {...makeProps('preview-loading')} />);
    });

    expect(screen.getByText('--- views')).toBeInTheDocument();
  });

  test("renders '--- views' when API responds with total = 0", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 0 }),
    });

    await act(async () => {
      render(<BlogPostPreview {...makeProps('preview-zero')} />);
    });

    await waitFor(() => {
      expect(screen.getByText('--- views')).toBeInTheDocument();
    });
  });

  test('formats the view count with locale grouping separators', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 12345 }),
    });

    await act(async () => {
      render(<BlogPostPreview {...makeProps('preview-12345')} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText(`${(12345).toLocaleString()} views`),
      ).toBeInTheDocument();
    });
  });

  test('points the link at the post route derived from the slug', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 1 }),
    });

    await act(async () => {
      render(<BlogPostPreview {...makeProps('my-amazing-post')} />);
    });

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/blog/my-amazing-post',
    );
  });
});
