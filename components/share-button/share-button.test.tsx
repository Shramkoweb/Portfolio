import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FacebookShare } from '@/components/share-button/facebook-share';
import { LinkedInShare } from '@/components/share-button/linkedin-share';
import { ShareButton } from '@/components/share-button/share-button';
import { TelegramShare } from '@/components/share-button/telegram-share';
import { TwitterShare } from '@/components/share-button/twitter-share';

describe('ShareButton', () => {
  it('calls onClick handler exactly once per click', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <ShareButton onClick={handleClick} ariaLabel="Share">
        Share
      </ShareButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('social sharing', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
    window.history.replaceState({}, '', '/');
    jest.restoreAllMocks();
  });

  it.each([
    [TwitterShare, 'Twitter', 'url', 'text'],
    [FacebookShare, 'Facebook', 'u', null],
    [LinkedInShare, 'LinkedIn', 'url', null],
    [TelegramShare, 'Telegram', 'url', 'text'],
  ] as const)(
    'preserves URL and title parameters for %p',
    async (Component, name, urlKey, textKey) => {
      const user = userEvent.setup();
      const open = jest.spyOn(window, 'open').mockImplementation(() => null);
      window.history.replaceState(
        {},
        '',
        '/blog/post?a=1&text=injected#section',
      );
      document.title = 'React & TypeScript # Україна ?text=unexpected';
      render(<Component />);

      await user.click(
        screen.getByRole('button', { name: `Share this post on ${name}` }),
      );

      expect(open).toHaveBeenCalledTimes(1);
      const [destination, , features] = open.mock.calls[0];
      const url = new URL(String(destination));
      expect(url.searchParams.getAll(urlKey)).toEqual([window.location.href]);
      expect(url.hash).toBe('');
      if (textKey) {
        expect(url.searchParams.getAll(textKey)).toEqual([
          `${document.title} Blog`,
        ]);
      } else {
        expect(url.searchParams.has('text')).toBe(false);
      }
      expect(features?.split(',')).toEqual(
        expect.arrayContaining(['noopener', 'noreferrer']),
      );
    },
  );
});
