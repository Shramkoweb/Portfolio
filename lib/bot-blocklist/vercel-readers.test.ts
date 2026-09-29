/**
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { BLOCKED_BOT_TOKENS } from './tokens';
import fixtures from './user-agents.fixture.json';
import policy from './vercel-readers.json';

// This artifact is applied to Vercel separately; a Next deployment does not sync it.
const { rule, verifiedUserAgents, robotsOnlyUserAgents } = policy;

function bypasses(userAgent: string, path = '/blog/linktree', method = 'GET') {
  return rule.conditionGroup.some(({ conditions }) =>
    conditions.every((condition) => {
      const request: Record<string, string> = {
        user_agent: userAgent,
        path,
        method,
      };
      const actual = request[condition.type];
      if (actual === undefined)
        throw new Error(`Unexpected condition: ${condition.type}`);
      const value = condition.value;
      const matches =
        condition.op === 'inc'
          ? (value as string[]).includes(actual)
          : condition.op === 're'
            ? new RegExp(value as string, 'i').test(actual)
            : actual === value;
      return 'neg' in condition && condition.neg ? !matches : matches;
    }),
  );
}

describe('Vercel reader exception', () => {
  it.each(verifiedUserAgents)('leaves %s verification to Vercel', (name) => {
    expect(
      bypasses(`Mozilla/5.0 (compatible; ${name}/2.1) python-requests/2.32`),
    ).toBe(false);
  });

  it.each([
    'TavilyBot',
    'Poggio-Citations',
    'IbouBot',
    'ZanistaBot',
    'AzureAI-SearchBot',
    'LinkupBot',
    'iaskspider',
    ...robotsOnlyUserAgents,
  ])('does not grant an undocumented exception to %s', (name) => {
    expect(bypasses(`${name}/1.0`)).toBe(false);
  });

  it.each([
    'Cursor/1.0',
    'opencode/1.0',
    fixtures.find(({ name }) => name === 'Claude Code WebFetch')!.userAgent,
    'MistralAI-User/1.0',
    'Kimi-User/1.0',
    'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
    'TelegramBot (like TwitterBot)',
  ])('retains the explicit exception for %s', (ua) => {
    expect(bypasses(ua)).toBe(true);
    expect(bypasses(ua, '/blog/linktree', 'HEAD')).toBe(true);
    expect(bypasses(ua, '/blog/linktree', 'POST')).toBe(false);
    expect(bypasses(ua, '/api')).toBe(false);
    expect(bypasses(ua, '/api/views')).toBe(false);
  });

  it.each(BLOCKED_BOT_TOKENS)(
    'does not bypass the training/scraping identity $value',
    ({ value }) => {
      expect(bypasses(`${value}/1.0`)).toBe(false);
    },
  );

  it.each(fixtures.filter(({ blocked }) => blocked))(
    'does not bypass the full $name user-agent',
    ({ userAgent }) => {
      expect(bypasses(userAgent)).toBe(false);
    },
  );

  it('only bypasses the internal OG background for GET/HEAD', () => {
    expect(
      bypasses('Vercel Edge Functions', '/static/images/og-background.jpg'),
    ).toBe(true);
    expect(
      bypasses(
        'Vercel Edge Functions',
        '/static/images/og-background.jpg',
        'POST',
      ),
    ).toBe(false);
    expect(bypasses('Vercel Edge Functions', '/blog/linktree')).toBe(false);
  });

  it('keeps the AI regex aligned with robots allowances minus managed/undocumented clients', () => {
    const robots = readFileSync(
      join(process.cwd(), 'public/robots.txt'),
      'utf8',
    );
    const allowed = robots
      .split(/\n\s*\n/)
      .filter((group) => !/^Disallow: \/$/m.test(group))
      .flatMap((group) =>
        [...group.matchAll(/^User-agent: (.+)$/gm)].map((match) => match[1]),
      )
      .filter((name) => name !== '*');
    const excluded = [...verifiedUserAgents, ...robotsOnlyUserAgents];
    for (const name of excluded) expect(allowed).toContain(name);
    const names = allowed
      .filter((name) => !excluded.includes(name))
      .sort((a, b) => b.length - a.length || (a < b ? -1 : a > b ? 1 : 0));
    const escaped = names.map((name) =>
      name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    );
    const pattern = `(?:^|[\\s;(])(?:${escaped.join('|')})(?:[/\\s;)]|$)`;
    expect(rule.conditionGroup[1].conditions[0].value).toBe(pattern);
  });
});
