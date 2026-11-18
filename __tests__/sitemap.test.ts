/** @jest-environment node */
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { getPostsMetadata } from '@/lib/posts/api';
import { getSnippetsMetadata } from '@/lib/snippets/api';

import sitemapConfig from '../next-sitemap.config.cjs';

const projectDirectory = process.cwd();

describe('sitemap content dates', () => {
  let directory: string;
  let cwd: jest.SpyInstance;
  let exitCode: typeof process.exitCode;

  beforeAll(() => {
    directory = mkdtempSync(join(tmpdir(), 'portfolio-sitemap-'));
    mkdirSync(join(directory, '_posts'));
    mkdirSync(join(directory, '_snippets'));
  });

  beforeEach(() => {
    exitCode = process.exitCode;
    cwd = jest.spyOn(process, 'cwd').mockReturnValue(directory);
    jest.useFakeTimers().setSystemTime(new Date('2026-11-18T12:00:00Z'));
  });

  afterEach(() => {
    process.exitCode = exitCode;
    cwd.mockRestore();
    jest.useRealTimers();
  });

  afterAll(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  function writeContent(frontmatter: string, type = '_posts') {
    writeFileSync(
      join(directory, type, 'example.md'),
      `---\n${frontmatter}\n---\nArticle body`,
    );
  }

  const transform = (url = '/blog/example') =>
    sitemapConfig.transform(sitemapConfig, url);

  it.each([
    ['2026-01-01T12:00:00.973Z', '2026-01-01T12:00:00.973Z'],
    ['"2026-01-01T12:00:00.973Z"', '2026-01-01T12:00:00.973Z'],
    ["'2026-01-01'", '2026-01-01T00:00:00.000Z'],
    ['2026-01-01 # published', '2026-01-01T00:00:00.000Z'],
    ['"2026-01-01T13:00:00.973+02:00"', '2026-01-01T11:00:00.973Z'],
  ])('reads YAML createDate %s', async (date, expected) => {
    writeContent(`createDate: ${date}`);

    expect((await transform()).lastmod).toBe(expected);
  });

  it.each(['_posts', '_snippets'])('prefers updateDate in %s', async (type) => {
    writeContent(
      'createDate: 2026-01-01\nupdateDate: "2026-02-03T12:00:00.123Z" # updated',
      type,
    );

    const url = type === '_posts' ? '/blog/example' : '/snippets/example';
    expect((await transform(url)).lastmod).toBe('2026-02-03T12:00:00.123Z');
  });

  it.each(['', 'null'])(
    'falls back for an empty updateDate: %s',
    async (value) => {
      writeContent(
        `createDate: 2026-01-01\nupdateDate: ${value}\ntitle: Example`,
      );

      expect((await transform()).lastmod).toBe('2026-01-01T00:00:00.000Z');
    },
  );

  it.each([
    ['', 'createDate'],
    ['createDate: not-a-date', 'createDate'],
    ['createDate: 123', 'createDate'],
    ['createDate: false', 'createDate'],
    ['createDate: "2026-01-01T12:00:00"', 'timezone'],
    ['createDate: 2099-01-01', 'future'],
    ['createDate: 2026-01-01\nupdateDate: ""', 'updateDate'],
    ['createDate: 2026-01-01\nupdateDate: not-a-date', 'updateDate'],
    ['createDate: 2026-01-01\nupdateDate: 2099-01-01', 'future'],
    ['createDate: 2026-01-01\nupdateDate: 2025-12-31', 'precede'],
  ])('rejects invalid content dates: %s', async (frontmatter, reason) => {
    writeContent(frontmatter);

    await expect(transform()).rejects.toThrow(`/blog/example`);
    await expect(transform()).rejects.toThrow(reason);
  });

  it('fails when a content route has no source file', async () => {
    await expect(transform('/blog/missing')).rejects.toThrow('/blog/missing');
  });

  it('makes the next-sitemap CLI exit unsuccessfully for invalid dates', () => {
    mkdirSync(join(directory, '.next'));
    writeFileSync(
      join(directory, '.next', 'build-manifest.json'),
      JSON.stringify({ pages: { '/blog/example': [] } }),
    );
    writeContent('createDate: not-a-date');

    const result = spawnSync(
      process.execPath,
      [
        join(
          projectDirectory,
          'node_modules/next-sitemap/bin/next-sitemap.mjs',
        ),
        '--config',
        join(projectDirectory, 'next-sitemap.config.cjs'),
      ],
      { cwd: directory, encoding: 'utf8' },
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('_posts/example.md');
    expect(result.stderr).toContain('createDate');
  });

  it('keeps the same lastmod across builds without a content change', async () => {
    writeContent('createDate: 2026-01-01');
    const first = await transform();
    jest.setSystemTime(new Date('2026-12-01T00:00:00Z'));

    expect(await transform()).toEqual(first);
  });

  it.each([
    '/',
    '/blog',
    '/snippets',
    '/blog/category/react',
    '/quizlet-list/to/anki',
  ])('omits unknown dates for %s', async (url) => {
    expect(await transform(url)).not.toHaveProperty('lastmod');
    expect(sitemapConfig.autoLastmod).toBe(false);
  });
});

it('matches the page metadata dates of every published post and snippet', async () => {
  const [posts, snippets] = await Promise.all([
    getPostsMetadata(),
    getSnippetsMetadata(),
  ]);

  for (const [prefix, items] of [
    ['/blog', posts],
    ['/snippets', snippets],
  ] as const) {
    for (const { data } of items) {
      const entry = await sitemapConfig.transform(
        sitemapConfig,
        `${prefix}/${data.slug}`,
      );

      expect(entry.lastmod).toBe(
        new Date(data.updateDate ?? data.createDate).toISOString(),
      );
    }
  }
});
