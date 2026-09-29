/** @jest-environment node */
import type { NextRequest } from 'next/server';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const mockImageResponse = jest.fn();

jest.mock('@vercel/og', () => ({
  ImageResponse: function ImageResponse(
    element: ReactElement,
    options: unknown,
  ) {
    mockImageResponse(element, options);
  },
}));

function loadHandler(titles: string[] = []) {
  process.env.OG_CONTENT_TITLES = JSON.stringify(titles);
  let ogModule: typeof import('@/pages/api/og');
  jest.isolateModules(() => {
    ogModule = require('@/pages/api/og');
  });
  return ogModule!;
}

function request(query = '', method = 'GET') {
  return { url: `https://shramko.dev/api/og${query}`, method } as NextRequest;
}

afterEach(() => {
  delete process.env.OG_CONTENT_TITLES;
});

describe('API /api/og', () => {
  it('runs on the edge runtime', () => {
    expect(loadHandler().config).toEqual({ runtime: 'edge' });
  });

  it.each([
    'Serhii Shramko',
    'About | Serhii Shramko',
    'Mastering React: Advanced Tips and Techniques',
    'Published & trusted heading',
  ])('renders a trusted title: %s', async (title) => {
    const { default: handler } = loadHandler(['Published & trusted heading']);
    await handler(request(`?title=${encodeURIComponent(title)}`));

    const html = renderToStaticMarkup(mockImageResponse.mock.calls[0][0]);
    expect(html).toContain(title.replaceAll('&', '&amp;'));
    expect(html).toContain('shramko.dev');
  });

  it('falls back to the site owner and returns a cacheable image', async () => {
    await loadHandler().default(request());
    const [element, options] = mockImageResponse.mock.calls[0];
    expect(renderToStaticMarkup(element)).toContain('Serhii Shramko');
    expect(options).toEqual({
      width: 1200,
      height: 630,
      headers: {
        'cache-control':
          'public, no-transform, max-age=3600, s-maxage=31536000',
      },
    });
  });

  it.each([100, 101])(
    'bounds published titles of length %i',
    async (length) => {
      const title = 'a'.repeat(length);
      await loadHandler([title]).default(request(`?title=${title}`));
      expect(
        renderToStaticMarkup(mockImageResponse.mock.calls[0][0]),
      ).toContain(length > 100 ? `${'a'.repeat(100)}…` : title);
    },
  );

  it.each(['?title=untrusted', '?title=', `?title=${'a'.repeat(101)}`])(
    'rejects arbitrary titles without rendering an image: %s',
    async (query) => {
      const response = await loadHandler().default(request(query));
      expect(response.status).toBe(404);
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(mockImageResponse).not.toHaveBeenCalled();
    },
  );

  it.each(['?title=Serhii%20Shramko&title=untrusted', '?cacheBust=123'])(
    'rejects ambiguous or cache-busting parameters: %s',
    async (query) => {
      const response = await loadHandler().default(request(query));
      expect(response.status).toBe(400);
      expect(mockImageResponse).not.toHaveBeenCalled();
    },
  );

  it('rejects unsupported methods without rendering', async () => {
    const response = await loadHandler().default(request('', 'POST'));
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('GET, HEAD');
    expect(mockImageResponse).not.toHaveBeenCalled();
  });
});
