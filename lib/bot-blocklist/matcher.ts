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
