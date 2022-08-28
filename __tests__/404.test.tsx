import { render, screen } from '@testing-library/react';
import * as Sentry from '@sentry/nextjs';

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

  test('send sentry error on render', () => {
    render(<NotFoundPage />);

    expect(Sentry.captureException).toHaveBeenCalledWith(new Error('404'));
  });

  test('send sentry error only on initial render', () => {
    render(<NotFoundPage />);

    expect(Sentry.captureException).toBeCalledTimes(1);
  });
});
