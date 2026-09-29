import {
  BLOCKED_BOT_TOKENS,
  BLOCKED_BOT_GROUPS,
  type BlockGroup,
} from '@/lib/bot-blocklist/tokens';

export type MatchResult =
  | { blocked: false }
  | { blocked: true; token: string; group: BlockGroup };

const SUBSTRING_TOKENS = BLOCKED_BOT_TOKENS.filter(
  (t) => t.kind === 'substring',
)
  .slice()
  .sort((a, b) => b.value.length - a.value.length);

const WORD_BOUNDARY_PATTERN = buildWordBoundaryPattern();
const PRODUCT_PATTERN = buildProductPattern();

export function isBlockedUserAgent(userAgent: string | null): MatchResult {
  if (!userAgent) return { blocked: false };

  const lower = userAgent.toLowerCase();

  for (const entry of SUBSTRING_TOKENS) {
    if (lower.includes(entry.value)) {
      return {
        blocked: true,
        token: entry.value,
        group: BLOCKED_BOT_GROUPS[entry.value] as BlockGroup,
      };
    }
  }

  const product = PRODUCT_PATTERN?.exec(lower)?.[1];
  if (product) {
    return {
      blocked: true,
      token: product,
      group: BLOCKED_BOT_GROUPS[product] as BlockGroup,
    };
  }

  if (WORD_BOUNDARY_PATTERN) {
    const match = WORD_BOUNDARY_PATTERN.exec(lower);
    if (match) {
      const token = match[0];
      return {
        blocked: true,
        token,
        group: BLOCKED_BOT_GROUPS[token] as BlockGroup,
      };
    }
  }

  return { blocked: false };
}

function buildProductPattern(): RegExp | null {
  const values = BLOCKED_BOT_TOKENS.filter((t) => t.kind === 'product').map(
    (t) => escapeRegExp(t.value),
  );
  if (values.length === 0) return null;
  // A hyphen starts a different product name, not a version of this crawler.
  return new RegExp(`(?:^|[\\s;(])(${values.join('|')})(?=[/\\s;)]|$)`, 'i');
}

function buildWordBoundaryPattern(): RegExp | null {
  const wbValues = BLOCKED_BOT_TOKENS.filter(
    (t) => t.kind === 'word-boundary',
  ).map((t) => escapeRegExp(t.value));
  if (wbValues.length === 0) return null;
  return new RegExp(`\\b(?:${wbValues.join('|')})\\b`, 'i');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
