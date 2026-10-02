// Kept as `middleware` (not `proxy`) for the edge runtime: bots are rejected at
// each POP without invoking a Node function on nearly every request. `proxy` is
// Node-only, and the v16 upgrade guide ("`middleware` to `proxy`") says to keep
// `middleware` for edge. The build's deprecation warning is expected and can't
// be silenced (having both files errors). Migrate when `proxy` supports edge, the
// warning becomes an error, or at the next major: lib/bot-blocklist is
// runtime-agnostic, so it's a rename plus updating the tests that import
// `middleware`: __tests__/middleware.test.ts and
// lib/bot-blocklist/user-agents.test.ts.
import { NextResponse, type NextRequest } from 'next/server';

import { isBlockedUserAgent } from '@/lib/bot-blocklist/matcher';

const POLICY_BODY =
  'Automated AI training and scraping crawlers are not permitted on this site.\n';

function policyResponse(): NextResponse {
  return new NextResponse(POLICY_BODY, {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, noai, noimageai',
      'Cache-Control': 'no-store',
    },
  });
}

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent');

  if (isBlockedUserAgent(ua).blocked) {
    return policyResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|feed\\.xml$|api/feed$).*)',
  ],
};
