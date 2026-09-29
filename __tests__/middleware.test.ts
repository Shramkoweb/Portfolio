/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { middleware } from '../middleware';

function makeRequest(
  userAgent: string | null,
  extraHeaders: Record<string, string> = {},
): NextRequest {
  const headers = new Headers(extraHeaders);
  if (userAgent !== null) headers.set('user-agent', userAgent);
  return new NextRequest(new URL('/', 'http://localhost'), { headers });
}

const BLOCK_BODY =
  'Automated AI training and scraping crawlers are not permitted on this site.\n';

const DESKTOP_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('middleware', () => {
  it('returns 403 with policy body for a blocked UA', async () => {
    const res = middleware(makeRequest('GPTBot/1.2'));
    expect(res.status).toBe(403);
    expect(await res.text()).toBe(BLOCK_BODY);
    expect(res.headers.get('x-robots-tag')).toBe('noindex, noai, noimageai');
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.headers.get('content-type')).toBe('text/plain; charset=utf-8');
  });

  it('passes through (no 403) for a typical desktop UA', async () => {
    const res = middleware(makeRequest(DESKTOP_UA));
    expect(res.status).not.toBe(403);
    expect(await res.text()).not.toBe(BLOCK_BODY);
  });

  it('passes through for a request with no User-Agent header', async () => {
    const res = middleware(makeRequest(null));
    expect(res.status).not.toBe(403);
  });

  it('allows a user-directed browser regardless of Signature-Agent', () => {
    const res = middleware(
      makeRequest(DESKTOP_UA, { 'Signature-Agent': '"https://chatgpt.com"' }),
    );
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });

  it('does not let a signature header exempt a training crawler', () => {
    const res = middleware(
      makeRequest('GPTBot/1.2', { 'Signature-Agent': '"https://chatgpt.com"' }),
    );
    expect(res.status).toBe(403);
  });

  it.each([
    'Google-Agent',
    'Amzn-SearchBot',
    'Diffbot-User',
    'MistralAI-Index',
    'Kimi-User',
    'Slackbot-LinkExpanding',
  ])('passes through %s', (ua) => {
    expect(
      middleware(makeRequest(`${ua}/1.0`)).headers.get('x-middleware-next'),
    ).toBe('1');
  });

  it('passes through a signed request from a robots.txt-allowed fetcher UA', async () => {
    const res = middleware(
      makeRequest(
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ' +
          'ChatGPT-User/1.0; +https://openai.com/bot',
        { 'Signature-Agent': '"https://chatgpt.com"' },
      ),
    );
    expect(res.status).not.toBe(403);
  });
});
