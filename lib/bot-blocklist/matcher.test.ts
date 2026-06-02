import { isBlockedUserAgent } from '@/lib/bot-blocklist/matcher';
import {
  TRAINING_CRAWLER_TOKENS,
  AUTONOMOUS_AGENT_TOKENS,
  BLOCKED_BOT_GROUPS,
} from '@/lib/bot-blocklist/tokens';

describe('isBlockedUserAgent', () => {
  describe('non-blocking inputs', () => {
    it('returns blocked: false for null user-agent', () => {
      expect(isBlockedUserAgent(null)).toEqual({ blocked: false });
    });

    it('returns blocked: false for empty string user-agent', () => {
      expect(isBlockedUserAgent('')).toEqual({ blocked: false });
    });

    it('returns blocked: false for a typical desktop Chrome user-agent', () => {
      const ua =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    });
  });

  describe('training crawlers', () => {
    it('blocks the canonical GPTBot user-agent with token + group', () => {
      const ua =
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ' +
        'GPTBot/1.2; +https://openai.com/gptbot)';
      expect(isBlockedUserAgent(ua)).toEqual({
        blocked: true,
        token: 'gptbot',
        group: 'training',
      });
    });

    it('blocks ClaudeBot', () => {
      expect(
        isBlockedUserAgent('ClaudeBot/1.0 (+claudebot@anthropic.com)'),
      ).toEqual({
        blocked: true,
        token: 'claudebot',
        group: 'training',
      });
    });

    it('blocks Bytespider (bare token)', () => {
      expect(isBlockedUserAgent('Bytespider')).toEqual({
        blocked: true,
        token: 'bytespider',
        group: 'training',
      });
    });

    it('blocks Meta-ExternalAgent', () => {
      expect(
        isBlockedUserAgent(
          'meta-externalagent/1.1 (+https://developers.facebook.com/)',
        ),
      ).toEqual({
        blocked: true,
        token: 'meta-externalagent',
        group: 'training',
      });
    });

    it('is case-insensitive (GPTBOT uppercase)', () => {
      expect(isBlockedUserAgent('GPTBOT/2.0')).toEqual({
        blocked: true,
        token: 'gptbot',
        group: 'training',
      });
    });
  });

  describe('autonomous agents', () => {
    it('blocks Devin', () => {
      expect(isBlockedUserAgent('Devin/1.0')).toEqual({
        blocked: true,
        token: 'devin',
        group: 'agent',
      });
    });

    it('blocks Operator', () => {
      expect(isBlockedUserAgent('Mozilla/5.0 Operator/2.0')).toEqual({
        blocked: true,
        token: 'operator',
        group: 'agent',
      });
    });

    it('blocks ChatGPT Agent (token with internal space)', () => {
      expect(isBlockedUserAgent('something ChatGPT Agent/1 else')).toEqual({
        blocked: true,
        token: 'chatgpt agent',
        group: 'agent',
      });
    });
  });

  // robots.txt explicitly allows OpenAI's user-triggered + search bots. Every
  // OpenAI bot's UA contains `+https://openai.com/...`, so the `openai` token
  // must match the product-UA shape (`OpenAI/<ver>`) only, not the self-link.
  describe('OpenAI user-triggered fetchers — allowed per robots.txt', () => {
    it('does not block ChatGPT-User (user-initiated, not training)', () => {
      const ua =
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ' +
        'ChatGPT-User/1.0; +https://openai.com/bot';
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    });

    it('does not block OAI-SearchBot (search referral, not training)', () => {
      const ua =
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ' +
        'OAI-SearchBot/1.0; +https://openai.com/searchbot';
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    });

    it('still blocks the literal OpenAI/<version> product user-agent', () => {
      expect(isBlockedUserAgent('OpenAI/1.0')).toEqual({
        blocked: true,
        token: 'openai/',
        group: 'training',
      });
    });
  });
});

describe('hygiene — short/generic tokens must not collide with real UAs', () => {
  const cases: Array<{ ua: string; mentions: string }> = [
    { ua: 'Mozilla/5.0 (SpiderMonkey/115)', mentions: 'spider' },
    {
      ua: 'SomeOperatorService/3.4 (+https://example.com)',
      mentions: 'operator',
    },
    { ua: 'Mozilla/5.0 LccDataReader/1.0', mentions: 'lcc' },
    { ua: 'Mozilla/5.0 CotoyogiViewer/1.0', mentions: 'cotoyogi' },
    { ua: 'Mozilla/5.0 AnomuraReader/2.0', mentions: 'anomura' },
    { ua: 'Mozilla/5.0 YakDocReader/1.0', mentions: 'yak' },
    { ua: 'Mozilla/5.0 DevinDocViewer/1.0', mentions: 'devin' },
    { ua: 'Mozilla/5.0 openaitest/1.0 — fictional', mentions: 'openai' },
  ];

  for (const { ua, mentions } of cases) {
    it(`does not falsely block UA mentioning ${mentions}: ${ua}`, () => {
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    });
  }
});

describe('longest-match-wins for overlapping substring tokens', () => {
  it('reports ai2bot-dolma (not ai2bot) for Ai2Bot-Dolma UA', () => {
    expect(isBlockedUserAgent('Ai2Bot-Dolma/1.0')).toEqual({
      blocked: true,
      token: 'ai2bot-dolma',
      group: 'training',
    });
  });

  it('reports googleother-image (not googleother) for GoogleOther-Image UA', () => {
    expect(isBlockedUserAgent('Mozilla/5.0 GoogleOther-Image/1.1')).toEqual({
      blocked: true,
      token: 'googleother-image',
      group: 'training',
    });
  });

  it('reports omgilibot (not omgili) for Omgilibot UA', () => {
    expect(isBlockedUserAgent('Omgilibot/0.5')).toEqual({
      blocked: true,
      token: 'omgilibot',
      group: 'training',
    });
  });
});

describe('blocklist data integrity', () => {
  it('every training token has a training group mapping', () => {
    for (const t of TRAINING_CRAWLER_TOKENS) {
      expect(BLOCKED_BOT_GROUPS[t.value]).toBe('training');
    }
  });

  it('all token values are lowercase', () => {
    for (const t of [...TRAINING_CRAWLER_TOKENS, ...AUTONOMOUS_AGENT_TOKENS]) {
      expect(t.value).toBe(t.value.toLowerCase());
    }
  });

  it('every agent token has an agent group mapping', () => {
    for (const t of AUTONOMOUS_AGENT_TOKENS) {
      expect(BLOCKED_BOT_GROUPS[t.value]).toBe('agent');
    }
  });
});
