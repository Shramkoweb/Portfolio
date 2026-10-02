import { render, screen } from '@testing-library/react';

import { BlogPostPreview } from '@/components/blog-post-preview';

function makeProps(slug: string, views?: number) {
  return { slug, heading: 'Heading', excerpt: 'Excerpt body', views };
}

describe('BlogPostPreview — view-count formatting (business logic)', () => {
  test("renders '--- views' while the views map has not loaded", () => {
    render(<BlogPostPreview {...makeProps('preview-loading')} />);

    expect(screen.getByText('--- views')).toBeInTheDocument();
  });

  test("renders '--- views' when the post has 0 views", () => {
    render(<BlogPostPreview {...makeProps('preview-zero', 0)} />);

    expect(screen.getByText('--- views')).toBeInTheDocument();
  });

  test('formats the view count with locale grouping separators', () => {
    render(<BlogPostPreview {...makeProps('preview-12345', 12345)} />);

    expect(
      screen.getByText(`${(12345).toLocaleString()} views`),
    ).toBeInTheDocument();
  });

  test('does not fetch its own view count', () => {
    render(<BlogPostPreview {...makeProps('preview-no-fetch', 1)} />);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('points the link at the post route derived from the slug', () => {
    render(<BlogPostPreview {...makeProps('my-amazing-post', 1)} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/blog/my-amazing-post',
    );
  });
});
