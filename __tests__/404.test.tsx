import * as Sentry from '@sentry/nextjs';
import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404';

jest.mock('@sentry/nextjs');

describe('404 page', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
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

    expect(Sentry.captureMessage).toHaveBeenCalledWith('404 not found', {
      level: 'info',
      fingerprint: ['404'],
      tags: { path: window.location.pathname, referrer: 'direct' },
    });
  });

  test('strips query and fragment from the referrer tag', () => {
    jest
      .spyOn(document, 'referrer', 'get')
      .mockReturnValue('https://shramko.dev/blog?token=secret#top');

    render(<NotFoundPage />);

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      '404 not found',
      expect.objectContaining({
        tags: expect.objectContaining({
          referrer: 'https://shramko.dev/blog',
        }),
      }),
    );
  });

  test('send sentry message only on initial render', () => {
    render(<NotFoundPage />);

    expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
  });
});
