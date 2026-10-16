import { withStoreUtm } from './store-links';

describe('withStoreUtm', () => {
  it('tags a store listing with source, medium and campaign', () => {
    const url = new URL(
      withStoreUtm(
        'https://chromewebstore.google.com/detail/example',
        'landing',
        'quizlet-list',
      ),
    );

    expect(url.origin + url.pathname).toBe(
      'https://chromewebstore.google.com/detail/example',
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      utm_source: 'shramko.dev',
      utm_medium: 'landing',
      utm_campaign: 'quizlet-list',
    });
  });

  it('keeps existing query parameters', () => {
    const url = new URL(
      withStoreUtm(
        'https://chromewebstore.google.com/detail/example?hl=en',
        'footer',
        'udemy-reset-progress',
      ),
    );

    expect(url.searchParams.get('hl')).toBe('en');
    expect(url.searchParams.get('utm_medium')).toBe('footer');
  });
});
