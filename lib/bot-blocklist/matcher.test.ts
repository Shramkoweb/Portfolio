import { isBlockedUserAgent } from '@/lib/bot-blocklist/matcher';
import {
  TRAINING_CRAWLER_TOKENS,
  SCRAPING_CRAWLER_TOKENS,
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

  describe('bulk scraping', () => {
    it.each([
      'ApifyBot',
      'ApifyWebsiteContentCrawler',
      'AgentDataBot',
      'BixelBot',
      'CragCrawler',
      'FirecrawlAgent',
      'Scrapy',
      'Awario',
    ])('blocks %s', (ua) => {
      expect(isBlockedUserAgent(`${ua}/1.0`)).toMatchObject({
        blocked: true,
        group: 'scraping',
      });
    });
  });

  it.each(['MistralAI-Training', 'KimiBot', 'ERNIEBot', 'QwenBot'])(
    'blocks training crawler %s',
    (ua) => {
      expect(
        isBlockedUserAgent(`Mozilla/5.0 (compatible; ${ua}/1.0)`),
      ).toMatchObject({ blocked: true, group: 'training' });
    },
  );

  it.each([
    'ChatGPT Agent',
    'Devin',
    'Operator',
    'Google-Agent',
    'GoogleAgent-Mariner',
    'Google-GeminiNotebook',
    'Google-NotebookLM',
    'GoogleAgent-URLContext',
    'Claude-User',
    'Claude-SearchBot',
    'Claude-Code',
    'Cursor',
    'Code',
    'Perplexity-User',
    'PerplexityBot',
    'MistralAI-User',
    'MistralAI-Index',
    'Kimi-User',
    'Kimi-SearchBot',
    'Kimi-Agent',
    'Amzn-SearchBot',
    'Amzn-User',
    'Diffbot-User',
    'Diffbot',
    'Meta-ExternalFetcher',
    'meta-webindexer',
    'Applebot',
    'Googlebot',
    'bingbot',
    'DuckAssistBot',
    'ShapBot',
    'Shap-User',
    'ExaSearchBot',
    'PetalBot',
    'YouBot',
    'TavilyBot',
    'atlassian-bot',
    'Slackbot-LinkExpanding',
    'Slack-ImgProxy',
    'TelegramBot',
    'Twitterbot',
    'facebookexternalhit',
    'WhatsApp',
    'LinkedInBot',
    'Discordbot',
    'redditbot',
    'Pinterestbot',
    'UnknownAIClient',
    'OpenAI',
    'Claude-Web',
  ])('allows search, user, preview or unclassified client %s', (ua) => {
    expect(isBlockedUserAgent(`Mozilla/5.0 (compatible; ${ua}/1.0)`)).toEqual({
      blocked: false,
    });
  });

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
  });
});

describe('hygiene — short/generic tokens must not collide with real UAs', () => {
  const cases: Array<{ ua: string; mentions: string }> = [
    { ua: 'Mozilla/5.0 LccDataReader/1.0', mentions: 'lcc' },
    { ua: 'Mozilla/5.0 CotoyogiViewer/1.0', mentions: 'cotoyogi' },
    { ua: 'Mozilla/5.0 YakDocReader/1.0', mentions: 'yak' },
    { ua: 'Mozilla/5.0 NewsAIReader/1.0', mentions: 'newsai' },
  ];

  for (const { ua, mentions } of cases) {
    it(`does not falsely block UA mentioning ${mentions}: ${ua}`, () => {
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    });
  }
});

describe('AI2 product names', () => {
  it.each([
    'AI2Bot',
    'AI2Bot/1.0',
    'Mozilla/5.0 (AI2Bot; +https://allenai.org/crawler)',
  ])('blocks the training product: %s', (ua) => {
    expect(isBlockedUserAgent(ua).blocked).toBe(true);
  });

  it.each([
    'AI2Bot-DeepResearchEval',
    'AI2Bot-DeepResearchEval/1.0',
    'Mozilla/5.0 (compatible; AI2Bot-DeepResearchEval/1.0)',
  ])(
    'does not classify an undocumented research client as training: %s',
    (ua) => {
      expect(isBlockedUserAgent(ua)).toEqual({ blocked: false });
    },
  );

  it('still blocks an actual training product alongside a research identity', () => {
    expect(
      isBlockedUserAgent('AI2Bot-DeepResearchEval/1.0 GPTBot/1.2').blocked,
    ).toBe(true);
  });
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
      group: 'scraping',
    });
  });

  it('reports omgilibot (not omgili) for Omgilibot UA', () => {
    expect(isBlockedUserAgent('Omgilibot/0.5')).toEqual({
      blocked: true,
      token: 'omgilibot',
      group: 'scraping',
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
    for (const t of [...TRAINING_CRAWLER_TOKENS, ...SCRAPING_CRAWLER_TOKENS]) {
      expect(t.value).toBe(t.value.toLowerCase());
    }
  });

  it('every scraping token has a scraping group mapping', () => {
    for (const t of SCRAPING_CRAWLER_TOKENS) {
      expect(BLOCKED_BOT_GROUPS[t.value]).toBe('scraping');
    }
  });
});

describe('isBlockedUserAgent with only substring tokens', () => {
  function loadMatcher() {
    let matcher!: typeof import('@/lib/bot-blocklist/matcher');
    jest.isolateModules(() => {
      jest.doMock('@/lib/bot-blocklist/tokens', () => ({
        BLOCKED_BOT_TOKENS: [{ value: 'gptbot', kind: 'substring' }],
        BLOCKED_BOT_GROUPS: { gptbot: 'training' },
      }));
      matcher = require('@/lib/bot-blocklist/matcher');
    });
    return matcher;
  }

  it('still matches substrings and lets everything else through', () => {
    const { isBlockedUserAgent: match } = loadMatcher();

    expect(match('GPTBot/1.2')).toEqual({
      blocked: true,
      token: 'gptbot',
      group: 'training',
    });
    expect(match('lcc cotoyogi')).toEqual({ blocked: false });
  });
});
