/** @jest-environment node */
import { createServer, request as httpRequest } from 'node:http';
import type { AddressInfo } from 'node:net';

import type { NextApiRequest, NextApiResponse } from 'next';
import { apiResolver } from 'next/dist/server/api-utils/node/api-resolver';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { createMockReqRes } from '../helpers/api-mocks';

const mockImageResponse = jest.fn();
const mockPng = Buffer.from('png');

jest.mock('@vercel/og', () => ({
  ImageResponse: function ImageResponse(
    element: ReactElement,
    options: { headers: Record<string, string> },
  ) {
    const renderError = mockImageResponse(element, options);
    const response = new Response(mockPng, {
      headers: { 'content-type': 'image/png', ...options.headers },
    });
    if (renderError) {
      response.arrayBuffer = () => Promise.reject(renderError);
    }
    return response;
  },
}));

const TEXT = 'text/plain; charset=utf-8';
const ORIGIN_HEADERS = { host: 'shramko.dev', 'x-forwarded-proto': 'https' };

function loadModule(titles: string[] = []) {
  process.env.OG_CONTENT_TITLES = JSON.stringify(titles);
  let ogModule: typeof import('@/pages/api/og');
  jest.isolateModules(() => {
    ogModule = require('@/pages/api/og');
  });
  return ogModule!;
}

async function request({
  query = '',
  url = `/api/og${query}`,
  method = 'GET',
  headers = ORIGIN_HEADERS,
  titles = [],
}: {
  query?: string;
  url?: string;
  method?: string;
  headers?: NextApiRequest['headers'];
  titles?: string[];
} = {}) {
  const mocks = createMockReqRes({ url, method, headers });
  mocks.setHeader.mockReturnThis();
  const end = jest.fn();
  (mocks.res as NextApiResponse & { end: jest.Mock }).end = end;
  await loadModule(titles).default(mocks.req, mocks.res);
  return { ...mocks, end };
}

function renderedImage() {
  return renderToStaticMarkup(mockImageResponse.mock.calls[0][0]);
}

function backgroundFrom(origin: string) {
  return `background-image:url(${origin}/static/images/og-background.jpg)`;
}

function expectTextError(
  { status, setHeader, send }: Awaited<ReturnType<typeof request>>,
  code: number,
  body: string,
) {
  expect(status).toHaveBeenCalledWith(code);
  expect(setHeader).toHaveBeenCalledWith('Content-Type', TEXT);
  expect(setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
  expect(send).toHaveBeenCalledWith(body);
}

afterEach(() => {
  delete process.env.OG_CONTENT_TITLES;
});

describe('API /api/og', () => {
  it.each([
    'Serhii Shramko',
    'About | Serhii Shramko',
    'Mastering React: Advanced Tips and Techniques',
    'Published & trusted heading',
  ])('renders a trusted title: %s', async (title) => {
    await request({
      query: `?title=${encodeURIComponent(title)}`,
      titles: ['Published & trusted heading'],
    });

    const html = renderedImage();
    expect(html).toContain(title.replaceAll('&', '&amp;'));
    expect(html).toContain('shramko.dev');
  });

  it('falls back to the site owner and returns a cacheable image', async () => {
    const { setHeader, send } = await request();
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
    expect(setHeader).toHaveBeenCalledWith('content-type', 'image/png');
    expect(setHeader).toHaveBeenCalledWith(
      'cache-control',
      'public, no-transform, max-age=3600, s-maxage=31536000',
    );
    expect(send).toHaveBeenCalledWith(mockPng);
  });

  it('sends headers without a body for HEAD', async () => {
    const { setHeader, send, end } = await request({ method: 'HEAD' });
    expect(setHeader).toHaveBeenCalledWith('content-type', 'image/png');
    expect(send).not.toHaveBeenCalled();
    expect(end).toHaveBeenCalledWith();
  });

  it('answers a failed render with an uncacheable 500', async () => {
    mockImageResponse.mockReturnValueOnce(new Error('resvg failed'));
    const response = await request();
    expectTextError(response, 500, 'Internal Server Error');
    expect(response.setHeader).not.toHaveBeenCalledWith(
      'content-type',
      'image/png',
    );
    expect(response.setHeader).not.toHaveBeenCalledWith(
      'cache-control',
      expect.stringContaining('s-maxage'),
    );
  });

  it('draws the background image from the request origin', async () => {
    await request();
    expect(renderedImage()).toContain(backgroundFrom('https://shramko.dev'));
  });

  it('resolves the relative request URL against the host header', async () => {
    await request({ headers: { host: 'localhost:3000' } });
    expect(renderedImage()).toContain(backgroundFrom('http://localhost:3000'));
  });

  it.each([
    ['https', 'https'],
    ['https,http', 'https'],
    ['https, http', 'https'],
    ['http', 'http'],
    ['javascript', 'http'],
    ['https://evil.example/x?', 'http'],
    ['evil.example/x#', 'http'],
  ])('allowlists x-forwarded-proto %j as %s', async (proto, expected) => {
    await request({
      headers: { host: 'shramko.dev', 'x-forwarded-proto': proto },
    });
    expect(renderedImage()).toContain(
      backgroundFrom(`${expected}://shramko.dev`),
    );
  });

  it('ignores x-forwarded-host', async () => {
    await request({
      headers: { ...ORIGIN_HEADERS, 'x-forwarded-host': 'evil.example' },
    });
    expect(renderedImage()).toContain(backgroundFrom('https://shramko.dev'));
  });

  it('ignores the origin of an absolute-form request target', async () => {
    await request({ url: 'http://evil.example/api/og?title=Serhii%20Shramko' });
    expect(renderedImage()).toContain(backgroundFrom('https://shramko.dev'));
  });

  it.each([undefined, 'a b'])(
    'rejects an invalid host header: %s',
    async (host) => {
      expectTextError(
        await request({ headers: { host } }),
        400,
        'Invalid host',
      );
      expect(mockImageResponse).not.toHaveBeenCalled();
    },
  );

  it.each([100, 101])(
    'bounds published titles of length %i',
    async (length) => {
      const title = 'a'.repeat(length);
      await request({ query: `?title=${title}`, titles: [title] });
      expect(renderedImage()).toContain(
        length > 100 ? `${'a'.repeat(100)}…` : title,
      );
    },
  );

  it.each(['?title=untrusted', '?title=', `?title=${'a'.repeat(101)}`])(
    'rejects arbitrary titles without rendering an image: %s',
    async (query) => {
      expectTextError(await request({ query }), 404, 'Unknown title');
      expect(mockImageResponse).not.toHaveBeenCalled();
    },
  );

  it.each(['?title=Serhii%20Shramko&title=untrusted', '?cacheBust=123'])(
    'rejects ambiguous or cache-busting parameters: %s',
    async (query) => {
      expectTextError(
        await request({ query }),
        400,
        'Invalid query parameters',
      );
      expect(mockImageResponse).not.toHaveBeenCalled();
    },
  );

  it('rejects unsupported methods without rendering', async () => {
    const response = await request({ method: 'POST' });
    expectTextError(response, 405, 'Method not allowed');
    expect(response.setHeader).toHaveBeenCalledWith('Allow', 'GET, HEAD');
    expect(mockImageResponse).not.toHaveBeenCalled();
  });

  it('answers a malformed JSON POST with 405 through the Next resolver', async () => {
    const ogModule = loadModule();
    const server = createServer((req, res) =>
      apiResolver(
        req,
        res,
        {},
        ogModule,
        {
          previewModeId: '',
          previewModeEncryptionKey: '',
          previewModeSigningKey: '',
          dev: false,
        },
        false,
      ),
    );
    await new Promise<void>((resolve) => server.listen(0, resolve));
    try {
      const { port } = server.address() as AddressInfo;
      // jest.setup.js replaces global fetch, so talk to the server directly.
      const response = await new Promise<{
        status?: number;
        headers: Record<string, unknown>;
      }>((resolve, reject) => {
        httpRequest(
          {
            port,
            path: '/api/og',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
          },
          (res) => {
            res.resume();
            resolve({ status: res.statusCode, headers: res.headers });
          },
        )
          .on('error', reject)
          .end('{not json');
      });
      expect(response.status).toBe(405);
      expect(response.headers['content-type']).toBe(TEXT);
      expect(response.headers.allow).toBe('GET, HEAD');
    } finally {
      server.close();
    }
  });
});
