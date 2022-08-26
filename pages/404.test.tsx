import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/pages/404';
import * as Sentry from '@sentry/nextjs';

jest.mock('@sentry/nextjs');

beforeAll(() => {
  render(<NotFoundPage />);
});

describe('404 page', () => {
  test('renders with correct heading', () => {
    const heading = screen.getByRole('heading', {
      name: 'YOU\'RE IN THE WRONG PLACE',
    });

    expect(heading).toBeInTheDocument();
  });

  test('send sentry error on render', () => {
    expect(Sentry.captureException).toHaveBeenCalledWith(new Error('404'));
  });

  test('send sentry error only on initial render', () => {
    expect(Sentry.captureException).toBeCalledTimes(1);
  });
});
