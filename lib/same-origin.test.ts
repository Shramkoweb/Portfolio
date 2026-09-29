import type { NextApiRequest } from 'next';

import { isCrossSiteRequest, isJsonRequest } from './same-origin';

function req(headers: Record<string, string>) {
  return { headers } as unknown as NextApiRequest;
}

describe('isCrossSiteRequest', () => {
  it('allows same-origin fetches', () => {
    expect(isCrossSiteRequest(req({ 'sec-fetch-site': 'same-origin' }))).toBe(
      false,
    );
  });

  it.each(['cross-site', 'same-site', 'none'])(
    'rejects browser requests with sec-fetch-site %s',
    (site) => {
      expect(isCrossSiteRequest(req({ 'sec-fetch-site': site }))).toBe(true);
    },
  );

  it('allows requests without the header (non-browser clients)', () => {
    expect(isCrossSiteRequest(req({}))).toBe(false);
  });
});

describe('isJsonRequest', () => {
  it.each([
    'application/json',
    'application/json; charset=utf-8',
    'Application/JSON',
  ])('accepts %s', (contentType) => {
    expect(isJsonRequest(req({ 'content-type': contentType }))).toBe(true);
  });

  it.each([
    'application/x-www-form-urlencoded',
    'text/plain',
    'multipart/form-data',
  ])('rejects %s', (contentType) => {
    expect(isJsonRequest(req({ 'content-type': contentType }))).toBe(false);
  });

  it('rejects a missing content type', () => {
    expect(isJsonRequest(req({}))).toBe(false);
  });
});
