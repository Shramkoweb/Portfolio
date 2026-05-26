import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DISMISS_DURATION_MS,
  isDismissed,
  SiteBanner,
  STORAGE_KEY,
} from '@/components/site-banner';

describe('isDismissed', () => {
  const NOW = 1_700_000_000_000;

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns false when the key is missing', () => {
    expect(isDismissed(NOW)).toBe(false);
  });

  it('returns false when the stored value is not numeric', () => {
    window.localStorage.setItem(STORAGE_KEY, 'not-a-number');
    expect(isDismissed(NOW)).toBe(false);
  });

  it('returns false when the dismissal is older than 30 days', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      String(NOW - DISMISS_DURATION_MS - 1),
    );
    expect(isDismissed(NOW)).toBe(false);
  });

  it('returns false when the dismissal is exactly 30 days old', () => {
    window.localStorage.setItem(STORAGE_KEY, String(NOW - DISMISS_DURATION_MS));
    expect(isDismissed(NOW)).toBe(false);
  });

  it('returns true when the dismissal is within 30 days', () => {
    window.localStorage.setItem(STORAGE_KEY, String(NOW - 1000));
    expect(isDismissed(NOW)).toBe(true);
  });
});

describe('SiteBanner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the banner message and external link for a fresh visitor', () => {
    render(<SiteBanner />);

    expect(
      screen.getByRole('region', { name: /site notice/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/blog paused/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /read what inspired this/i });
    expect(link).toHaveAttribute(
      'href',
      'https://newsletter.ownyourweb.site/archive/own-your-web-issue-18-curators/',
    );
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('hides the banner when a recent dismissal is stored', () => {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));

    render(<SiteBanner />);

    expect(
      screen.queryByRole('region', { name: /site notice/i }),
    ).not.toBeInTheDocument();
  });

  it('writes a timestamp to localStorage and removes the banner when dismissed', async () => {
    const user = userEvent.setup();
    render(<SiteBanner />);

    await user.click(screen.getByRole('button', { name: /dismiss banner/i }));

    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(Number(window.localStorage.getItem(STORAGE_KEY))).toBeGreaterThan(0);
    expect(
      screen.queryByRole('region', { name: /site notice/i }),
    ).not.toBeInTheDocument();
  });
});
