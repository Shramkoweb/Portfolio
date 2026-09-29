/**
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { isBlockedUserAgent } from './matcher';
import { BLOCKED_BOT_TOKENS } from './tokens';

const robots = readFileSync(join(process.cwd(), 'public/robots.txt'), 'utf8');
const groups = robots
  .split(/\n\s*\n/)
  .map((group) => ({
    agents: [...group.matchAll(/^User-agent: (.+)$/gm)].map(
      (match) => match[1],
    ),
    disallow: [...group.matchAll(/^Disallow: (.+)$/gm)].map(
      (match) => match[1],
    ),
  }))
  .filter(({ agents }) => agents.length > 0);

describe('robots.txt and request filtering agree', () => {
  const blocked = groups.filter(({ disallow }) => disallow.includes('/'));
  const allowed = groups.filter(({ disallow }) => !disallow.includes('/'));

  it('keeps the complete deny list synchronized in both directions', () => {
    const names = blocked.flatMap(({ agents }) =>
      agents.map((name) => name.toLowerCase()),
    );
    expect(names.sort()).toEqual(
      BLOCKED_BOT_TOKENS.map(({ value }) => value).sort(),
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(blocked.flatMap(({ agents }) => agents))(
    'enforces the robots exclusion for %s',
    (name) => {
      expect(isBlockedUserAgent(`${name}/1.0`).blocked).toBe(true);
    },
  );

  it.each(
    allowed.flatMap(({ agents }) => agents).filter((name) => name !== '*'),
  )('does not block explicitly allowed %s', (name) => {
    expect(isBlockedUserAgent(`${name}/1.0`)).toEqual({ blocked: false });
  });

  it('keeps API crawling excluded for every allowed group', () => {
    for (const { disallow } of allowed) expect(disallow).toContain('/api/');
    expect(allowed.some(({ agents }) => agents.includes('*'))).toBe(true);
  });
});
