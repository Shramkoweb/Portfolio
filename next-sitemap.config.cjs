/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
/* eslint-enable @typescript-eslint/no-require-imports */

const pathLevelToPriority = {
  0: 1,
  1: 0.9,
  2: 0.8,
  3: 0.7,
};

const EXCLUDED_PATHS = ['/feed.xml', '/og', '/favicon.ico'];

const getPathDepthLevel = (urlPath) => {
  if (urlPath === '/') {
    return 0;
  }

  return urlPath.split('/').length - 1;
};

function parseContentDate(value, field) {
  if (!(value instanceof Date) && typeof value !== 'string') {
    throw new Error(`${field} must be a date`);
  }

  if (
    typeof value === 'string' &&
    !/^\d{4}-\d{2}-\d{2}(?:T.+(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)
  ) {
    throw new Error(
      `${field} must be YYYY-MM-DD or an ISO timestamp with a timezone`,
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${field} is not a valid date`);
  }

  if (date.getTime() > Date.now()) {
    throw new Error(`${field} must not be in the future`);
  }

  return date;
}

function getContentDate(urlPath) {
  const blogMatch = urlPath.match(/^\/blog\/([^/]+)$/);
  const snippetMatch = urlPath.match(/^\/snippets\/([^/]+)$/);

  let dir;
  let slug;

  if (blogMatch) {
    dir = '_posts';
    slug = blogMatch[1];
  } else if (snippetMatch) {
    dir = '_snippets';
    slug = snippetMatch[1];
  } else {
    return null;
  }

  const filePath = path.join(process.cwd(), dir, `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    const created = parseContentDate(data.createDate, 'createDate');
    const updated =
      data.updateDate == null
        ? created
        : parseContentDate(data.updateDate, 'updateDate');

    if (updated < created) {
      throw new Error('updateDate must not precede createDate');
    }

    return updated.toISOString();
  } catch (error) {
    // next-sitemap's CLI catches errors without setting a failure exit code.
    process.exitCode = 1;
    throw new Error(
      `Cannot generate sitemap entry for ${urlPath} (${dir}/${slug}.md): ${error.message}`,
      {
        cause: error,
      },
    );
  }
}

/** @satisfies {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: 'https://shramko.dev',
  generateIndexSitemap: false,
  autoLastmod: false,
  exclude: EXCLUDED_PATHS,
  transform: async (config, urlPath) => {
    const contentDate = getContentDate(urlPath);

    return {
      loc: urlPath,
      priority: pathLevelToPriority[getPathDepthLevel(urlPath)],
      ...(contentDate && { lastmod: contentDate }),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
