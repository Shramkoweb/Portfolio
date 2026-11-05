/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const matter = require('gray-matter');
/* eslint-enable @typescript-eslint/no-require-imports */

const EXCLUDED_PATHS = ['/feed.xml', '/og', '/favicon.ico'];

function readEntries(directory) {
  const directoryPath = path.join(process.cwd(), directory);

  return fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = matter(
        fs.readFileSync(path.join(directoryPath, file), 'utf-8'),
      );
      const time = new Date(data.updateDate ?? data.createDate).getTime();

      return {
        slug: file.slice(0, -'.md'.length),
        lastmod: Number.isNaN(time) ? null : new Date(time).toISOString(),
        categories: (data.categories ?? []).map((category) =>
          String(category).toLowerCase(),
        ),
      };
    });
}

function newestLastmod(entries) {
  return (
    entries
      .map(({ lastmod }) => lastmod)
      .filter(Boolean)
      .sort()
      .at(-1) ?? null
  );
}

function buildLastmodIndex() {
  const posts = readEntries('_posts');
  const snippets = readEntries('_snippets');
  const categories = [...new Set(posts.flatMap((post) => post.categories))];

  return new Map([
    ...posts.map((post) => [`/blog/${post.slug}`, post.lastmod]),
    ...snippets.map((snippet) => [
      `/snippets/${snippet.slug}`,
      snippet.lastmod,
    ]),
    ['/blog', newestLastmod(posts)],
    ['/snippets', newestLastmod(snippets)],
    ...categories.map((category) => [
      `/blog/category/${category}`,
      newestLastmod(posts.filter((post) => post.categories.includes(category))),
    ]),
  ]);
}

const lastmodByPath = buildLastmodIndex();

/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: 'https://shramko.dev',
  generateIndexSitemap: false,
  exclude: EXCLUDED_PATHS,
  transform: async (config, urlPath) => {
    const lastmod = lastmodByPath.get(urlPath);

    return {
      loc: urlPath,
      ...(lastmod && { lastmod }),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
