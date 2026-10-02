import { render, screen } from '@testing-library/react';

import { StoreRating } from '@/components/store-rating';

const RATING = {
  ratingValue: 5,
  ratingCount: 13,
  users: '1,000',
  storeUrl: 'https://chromewebstore.google.com/detail/example',
};

describe('StoreRating', () => {
  it('shows the score with one decimal, the count and the users', () => {
    render(<StoreRating rating={RATING} />);

    const line = screen.getByRole('link').closest('p');

    expect(line).toHaveTextContent(
      '★ 5.0 (13 ratings) • 1,000 users • Chrome Web Store',
    );
  });

  it('links to the store listing in a new tab', () => {
    render(<StoreRating rating={RATING} />);

    const link = screen.getByRole('link', { name: 'Chrome Web Store' });

    expect(link).toHaveAttribute('href', RATING.storeUrl);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('hides the decorative star from screen readers', () => {
    render(<StoreRating rating={RATING} />);

    expect(screen.getByText('★')).toHaveAttribute('aria-hidden', 'true');
  });
});
