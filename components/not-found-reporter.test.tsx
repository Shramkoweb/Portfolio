import * as Sentry from '@sentry/nextjs';
import { render } from '@testing-library/react';

import { NotFoundReporter } from '@/components/not-found-reporter';

jest.mock('@sentry/nextjs');
jest.mock('next/navigation', () => ({ usePathname: () => '/missing-page' }));

describe('NotFoundReporter', () => {
  test('reports the pathname once with the referrer tag', () => {
    render(<NotFoundReporter />);

    expect(Sentry.captureMessage).toHaveBeenCalledTimes(1);
    expect(Sentry.captureMessage).toHaveBeenCalledWith('404: /missing-page', {
      level: 'info',
      tags: { referrer: 'direct' },
    });
  });

  test('renders nothing', () => {
    const { container } = render(<NotFoundReporter />);

    expect(container).toBeEmptyDOMElement();
  });
});
