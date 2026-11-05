import { render, screen } from '@testing-library/react';

import { BlogPostPreview } from '@/components/blog-post-preview';

function makeProps(slug: string, views?: number) {
  return { slug, heading: 'Heading', excerpt: 'Excerpt body', views };
}

describe('BlogPostPreview — view-count formatting (business logic)', () => {
  test.each([
    ['while the views map has not loaded', undefined],
    ['when the post has 0 views', 0],
  ])('renders no count %s', (_, views) => {
    render(<BlogPostPreview {...makeProps('preview-empty', views)} />);

    expect(screen.queryByText(/views?$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/-/)).not.toBeInTheDocument();
  });

  test.each([
    [1, '1 view'],
    [56, '56 views'],
    [1299, '1.2K views'],
    [12345, '12K views'],
  ])('formats %d as %s', (views, text) => {
    render(<BlogPostPreview {...makeProps('preview-count', views)} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('does not fetch its own view count', () => {
    render(<BlogPostPreview {...makeProps('preview-no-fetch', 1)} />);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('shows the publish date and read time when given', () => {
    render(
      <BlogPostPreview
        {...makeProps('preview-dated')}
        createDate={Date.parse('2025-05-03T09:01:43.973Z')}
        readTime="5 min read"
      />,
    );

    expect(screen.getByText('May 3, 2025')).toHaveAttribute(
      'datetime',
      '2025-05-03T09:01:43.973Z',
    );
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  test('renders no date line without a publish date', () => {
    const { container } = render(
      <BlogPostPreview {...makeProps('preview-undated')} />,
    );

    expect(container.querySelector('time')).toBeNull();
  });

  test('points the link at the post route derived from the slug', () => {
    render(<BlogPostPreview {...makeProps('my-amazing-post', 1)} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/blog/my-amazing-post',
    );
  });
});
