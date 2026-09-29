// Curated from ai-robots-txt/ai.robots.txt @ 987266f (2026-09-29).
// Upstream includes search and user agents; never import its deny list wholesale.
// Sources: https://github.com/ai-robots-txt/ai.robots.txt/blob/987266f3c581bc6bb71aa075051731188ab2a075/robots.json
// https://developers.openai.com/api/docs/bots
// https://docs.mistral.ai/robots
// https://www.kimi.ai/policies/kimi-crawlers
// Keep the Disallow: / groups in public/robots.txt in sync (covered by tests).
// Unknown agents, search indexing and user-directed browsing are allowed.

export type BlockToken =
  | { value: string; kind: 'substring' }
  | { value: string; kind: 'word-boundary' }
  | { value: string; kind: 'product' };

export type BlockGroup = 'training' | 'scraping';

export const TRAINING_CRAWLER_TOKENS: readonly BlockToken[] = [
  // The separately named DeepResearchEval client is not documented as training.
  { value: 'ai2bot', kind: 'product' },
  { value: 'ai2bot-dolma', kind: 'substring' },
  { value: 'amazonbot', kind: 'substring' },
  { value: 'anthropic-ai', kind: 'substring' },
  { value: 'applebot-extended', kind: 'substring' },
  { value: 'bytespider', kind: 'substring' },
  { value: 'ccbot', kind: 'substring' },
  { value: 'claudebot', kind: 'substring' },
  { value: 'cohere-training-data-crawler', kind: 'substring' },
  { value: 'cotoyogi', kind: 'word-boundary' },
  { value: 'deepseekbot', kind: 'substring' },
  { value: 'erniebot', kind: 'substring' },
  { value: 'facebookbot', kind: 'substring' },
  { value: 'factset_spyderbot', kind: 'substring' },
  { value: 'friendlycrawler', kind: 'substring' },
  { value: 'google-extended', kind: 'substring' },
  { value: 'gptbot', kind: 'substring' },
  { value: 'icc-crawler', kind: 'substring' },
  { value: 'img2dataset', kind: 'substring' },
  { value: 'isscyberriskcrawler', kind: 'substring' },
  { value: 'kangaroo bot', kind: 'substring' },
  { value: 'kimibot', kind: 'substring' },
  { value: 'laion-huggingface-processor', kind: 'substring' },
  { value: 'laiondownloader', kind: 'substring' },
  { value: 'linguee bot', kind: 'substring' },
  { value: 'meta-externalagent', kind: 'substring' },
  { value: 'mistralai-training', kind: 'substring' },
  { value: 'pangubot', kind: 'substring' },
  { value: 'qwenbot', kind: 'substring' },
  { value: 'sbintuitionsbot', kind: 'substring' },
  { value: 'sidetrade indexer bot', kind: 'substring' },
  { value: 'tiktokspider', kind: 'substring' },
  { value: 'timpibot', kind: 'substring' },
  { value: 'velenpublicwebcrawler', kind: 'substring' },
  { value: 'webzio-extended', kind: 'substring' },
];

export const SCRAPING_CRAWLER_TOKENS: readonly BlockToken[] = [
  { value: 'agentdatabot', kind: 'substring' },
  { value: 'agenttimes', kind: 'substring' },
  { value: 'aihitbot', kind: 'substring' },
  // Customer-directed bulk imports into private indexes/knowledge bases.
  // https://docs.aws.amazon.com/kendra/latest/dg/stop-web-crawler.html
  { value: 'amazon-kendra', kind: 'substring' },
  { value: 'apifybot', kind: 'substring' },
  { value: 'apifywebsitecontentcrawler', kind: 'substring' },
  { value: 'awario', kind: 'substring' },
  // Covers bedrockbot-UUID and optional customer User-Agent suffixes.
  // https://docs.aws.amazon.com/bedrock/latest/userguide/webcrawl-data-source-connector.html
  { value: 'bedrockbot', kind: 'substring' },
  { value: 'bixelbot', kind: 'substring' },
  { value: 'brightbot', kind: 'substring' },
  { value: 'chatglm-spider', kind: 'substring' },
  { value: 'cragcrawler', kind: 'substring' },
  { value: 'crawl4ai', kind: 'substring' },
  { value: 'crawlspace', kind: 'substring' },
  { value: 'datenbank crawler', kind: 'substring' },
  { value: 'echobot bot', kind: 'substring' },
  { value: 'firecrawlagent', kind: 'substring' },
  { value: 'googleother', kind: 'substring' },
  { value: 'googleother-image', kind: 'substring' },
  { value: 'googleother-video', kind: 'substring' },
  { value: 'imagespider', kind: 'substring' },
  { value: 'lcc', kind: 'word-boundary' },
  { value: 'mycentralaiscraperbot', kind: 'substring' },
  { value: 'nagetbot', kind: 'substring' },
  { value: 'netestate imprint crawler', kind: 'substring' },
  { value: 'newsai', kind: 'word-boundary' },
  { value: 'omgili', kind: 'substring' },
  { value: 'omgilibot', kind: 'substring' },
  { value: 'panscient', kind: 'substring' },
  { value: 'poseidon research crawler', kind: 'substring' },
  { value: 'scrapy', kind: 'substring' },
  { value: 'thinkbot', kind: 'substring' },
  { value: 'wardbot', kind: 'substring' },
  { value: 'yak', kind: 'word-boundary' },
];

export const BLOCKED_BOT_TOKENS: readonly BlockToken[] = [
  ...TRAINING_CRAWLER_TOKENS,
  ...SCRAPING_CRAWLER_TOKENS,
];

export const BLOCKED_BOT_GROUPS: Readonly<Record<string, BlockGroup>> = {
  ...Object.fromEntries(
    TRAINING_CRAWLER_TOKENS.map(({ value }) => [value, 'training' as const]),
  ),
  ...Object.fromEntries(
    SCRAPING_CRAWLER_TOKENS.map(({ value }) => [value, 'scraping' as const]),
  ),
};
