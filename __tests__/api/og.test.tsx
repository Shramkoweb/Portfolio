import { render, screen } from '@testing-library/react';
import type { NextRequest } from 'next/server';
import type { ReactElement } from 'react';

import handler, { config } from '@/pages/api/og';

const mockImageResponse = jest.fn();

jest.mock('@vercel/og', () => ({
  ImageResponse: function ImageResponse(
    element: ReactElement,
    options: unknown,
  ) {
    mockImageResponse(element, options);
  },
}));

async function renderOg(query = '') {
  await handler({
    url: `https://shramko.dev/api/og${query}`,
  } as NextRequest);
  const [element, options] = mockImageResponse.mock.calls[0];
  render(element);
  return options;
}

describe('API /api/og', () => {
  it('runs on the edge runtime', () => {
    expect(config).toEqual({ runtime: 'edge' });
  });

  it('renders the title from the query string', async () => {
    await renderOg('?title=Hello%20%26%20welcome');

    expect(screen.getByText('Hello & welcome')).toBeInTheDocument();
    expect(screen.getByText('shramko.dev')).toBeInTheDocument();
  });

  it('falls back to the site owner name without a title', async () => {
    await renderOg();

    expect(screen.getByText('Serhii Shramko')).toBeInTheDocument();
  });

  it('draws the background image from the request origin', async () => {
    await renderOg();

    expect(screen.getByText('Serhii Shramko').parentElement).toHaveStyle({
      backgroundImage:
        'url(https://shramko.dev/static/images/og-background.jpg)',
    });
  });

  it('keeps a title of exactly 100 characters intact', async () => {
    const title = 'a'.repeat(100);
    await renderOg(`?title=${title}`);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('truncates longer titles to 100 characters plus an ellipsis', async () => {
    await renderOg(`?title=${'a'.repeat(101)}`);

    expect(screen.getByText(`${'a'.repeat(100)}…`)).toBeInTheDocument();
  });

  it('renders a 1200x630 image the CDN may cache', async () => {
    const options = await renderOg();

    expect(options).toEqual({
      width: 1200,
      height: 630,
      headers: {
        'cache-control':
          'public, no-transform, max-age=3600, s-maxage=31536000',
      },
    });
  });
});
