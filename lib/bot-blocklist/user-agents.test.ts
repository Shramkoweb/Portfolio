/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { middleware } from '../../middleware';
import fixtures from './user-agents.fixture.json';

// References describe the clients; samples are not necessarily verbatim documentation.
describe('representative and observed user-agent samples through middleware', () => {
  it.each(fixtures)('$name has blocked=$blocked', ({ userAgent, blocked }) => {
    const request = new NextRequest('https://shramko.dev/blog/linktree', {
      headers: { 'user-agent': userAgent },
    });
    const response = middleware(request);
    expect(response.status).toBe(blocked ? 403 : 200);
    expect(response.headers.get('x-middleware-next')).toBe(
      blocked ? null : '1',
    );
  });
});
