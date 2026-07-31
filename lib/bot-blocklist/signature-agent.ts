// lib/bot-blocklist/signature-agent.ts
//
// Agentic browsers increasingly identify via Web Bot Auth (RFC 9421) instead
// of a distinctive User-Agent token: ChatGPT agent browses with a plain
// browser UA and is only recognizable by its `Signature-Agent` header
// (https://help.openai.com/en/articles/11845367-chatgpt-agent-allowlisting).
// This complements matcher.ts, which cannot see such clients.
//
// Matching the unverified header value (without validating the RFC 9421
// signature) is sound for a block-list: forging the header only gets a
// request blocked, so there is no incentive to spoof it.

const BLOCKED_SIGNATURE_AGENTS: ReadonlySet<string> = new Set([
  // ChatGPT agent (ex-Operator) — blocked in public/robots.txt.
  'https://chatgpt.com',
]);

// OpenAI fetchers allowed in public/robots.txt self-identify in the UA. If
// they ever start signing with the agent's origin, the UA token must keep
// winning.
const ALLOWED_UA_OVERRIDES: readonly string[] = [
  'chatgpt-user',
  'oai-searchbot',
];

export function isBlockedSignatureAgent(
  signatureAgent: string | null,
  userAgent: string | null,
): boolean {
  if (!signatureAgent) return false;
  if (!BLOCKED_SIGNATURE_AGENTS.has(normalizeOrigin(signatureAgent))) {
    return false;
  }

  const ua = userAgent?.toLowerCase() ?? '';
  return !ALLOWED_UA_OVERRIDES.some((token) => ua.includes(token));
}

// The header value is an RFC 8941 sf-string, e.g. `"https://chatgpt.com"`.
function normalizeOrigin(value: string): string {
  return value
    .trim()
    .replace(/^"+|"+$/g, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}
