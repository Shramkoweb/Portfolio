import * as Sentry from '@sentry/nextjs';
import { render, screen } from '@testing-library/react';

import NotFound from '@/app/not-found';

jest.mock('@sentry/nextjs');
jest.mock('next/navigation', () => ({ usePathname: () => '/nope' }));

describe('not-found page', () => {
  test('renders the heading and the home link', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { name: "YOU'RE IN THE WRONG PLACE" }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  test('reports the 404 to Sentry exactly once', () => {
    render(<NotFound />);

    expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
    expect(Sentry.captureMessage).toHaveBeenCalledWith('404: /nope', {
      level: 'info',
      tags: { referrer: 'direct' },
    });
  });
});
