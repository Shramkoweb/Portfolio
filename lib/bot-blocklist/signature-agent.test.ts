import { isBlockedSignatureAgent } from '@/lib/bot-blocklist/signature-agent';

// ChatGPT agent presents a plain browser UA — the header is the only signal.
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('isBlockedSignatureAgent', () => {
  it('blocks ChatGPT agent by its quoted sf-string header value', () => {
    expect(isBlockedSignatureAgent('"https://chatgpt.com"', BROWSER_UA)).toBe(
      true,
    );
  });

  it('blocks unquoted and trailing-slash variants', () => {
    expect(isBlockedSignatureAgent('https://chatgpt.com', BROWSER_UA)).toBe(
      true,
    );
    expect(isBlockedSignatureAgent('"https://chatgpt.com/"', BROWSER_UA)).toBe(
      true,
    );
  });

  it('is case-insensitive', () => {
    expect(isBlockedSignatureAgent('"HTTPS://ChatGPT.com"', BROWSER_UA)).toBe(
      true,
    );
  });

  it('blocks when the UA is missing but the signature matches', () => {
    expect(isBlockedSignatureAgent('"https://chatgpt.com"', null)).toBe(true);
  });

  it('ignores requests without the header', () => {
    expect(isBlockedSignatureAgent(null, BROWSER_UA)).toBe(false);
    expect(isBlockedSignatureAgent('', BROWSER_UA)).toBe(false);
  });

  it('ignores signature agents that are not block-listed', () => {
    expect(
      isBlockedSignatureAgent('"https://www.browserbase.com"', BROWSER_UA),
    ).toBe(false);
  });

  it('lets robots.txt-allowed OpenAI fetchers through even when signed', () => {
    const ua =
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ' +
      'ChatGPT-User/1.0; +https://openai.com/bot';
    expect(isBlockedSignatureAgent('"https://chatgpt.com"', ua)).toBe(false);
  });
});
