import { render, screen } from '@testing-library/react';

import { Badge } from '@/components/badge';

describe('Badge', () => {
  it('renders its label as plain text, not as a link or a button', () => {
    render(<Badge label="New" />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('uses the accent tone by default', () => {
    render(<Badge label="New" />);

    expect(screen.getByText('New').className).toContain('emerald');
  });

  it('switches palette on the neutral tone', () => {
    render(<Badge label="Draft" tone="neutral" />);

    const badge = screen.getByText('Draft');

    expect(badge.className).toContain('gray');
    expect(badge.className).not.toContain('emerald');
  });

  it.each(['bg', 'text', 'ring'])(
    'sets both a light and a dark %s colour',
    (property) => {
      render(<Badge label="New" />);

      const classes = screen.getByText('New').className.split(' ');

      expect(classes.some((c) => c.startsWith(`${property}-emerald`))).toBe(
        true,
      );
      expect(
        classes.some((c) => c.startsWith(`dark:${property}-emerald`)),
      ).toBe(true);
    },
  );
});
