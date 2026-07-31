// NOTE: We deliberately keep the legacy `middleware.ts` filename rather than
// renaming to `proxy.ts`. In Next.js 16 the `proxy` convention runs on Node
// runtime, while `middleware` keeps edge runtime — which we need for per-POP
// bot rejection without a Node function invocation. Revisit when Next adds
// edge support to `proxy`.
//   https://nextjs.org/docs/app/guides/upgrading/version-16
import { NextResponse, type NextRequest } from 'next/server';

import { isBlockedUserAgent } from '@/lib/bot-blocklist/matcher';
import { isBlockedSignatureAgent } from '@/lib/bot-blocklist/signature-agent';

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

  // Agentic browsers with plain browser UAs (ChatGPT agent) identify only
  // via Web Bot Auth — see lib/bot-blocklist/signature-agent.ts.
  if (isBlockedSignatureAgent(request.headers.get('signature-agent'), ua)) {
    return policyResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|feed\\.xml$|api/feed$).*)',
  ],
};
