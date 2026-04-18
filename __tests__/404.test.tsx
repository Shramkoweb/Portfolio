import * as Sentry from '@sentry/nextjs';
import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404';

jest.mock('@sentry/nextjs');

describe('404 page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByRole('heading', {
      name: "YOU'RE IN THE WRONG PLACE",
    });

    expect(heading).toBeInTheDocument();
  });

  test('send sentry message with path on render', () => {
    render(<NotFoundPage />);

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      `404: ${window.location.pathname}`,
      {
        level: 'info',
        tags: { referrer: 'direct' },
      },
    );
  });

  test('send sentry message only on initial render', () => {
    render(<NotFoundPage />);

    expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
  });
});
