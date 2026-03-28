/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

const pathLevelToPriority = {
  0: 1,
  1: 0.9,
  2: 0.8,
  3: 0.7
};

const EXCLUDED_PATHS = ['/dashboard', '/quizlet-list', '/quizlet-list/privacy-policy', '/udemy-reset-progress', '/gear', '/feed.xml'];

const getPathDepthLevel = (path) => {
  if (path === '/') {
    return 0;
  }

  return path.split('/').length - 1;
};

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
    const updateMatch = content.match(/updateDate:\s*(.+)/);
    const createMatch = content.match(/createDate:\s*(.+)/);

    const dateStr = updateMatch ? updateMatch[1].trim() : createMatch ? createMatch[1].trim() : null;

    if (dateStr) {
      return new Date(dateStr).toISOString();
    }
  } catch {
    // File not found — fall through
  }

  return null;
}

/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: 'https://shramko.dev',
  generateIndexSitemap: false,
  exclude: EXCLUDED_PATHS,
  transform: async (config, path) => {
    if (EXCLUDED_PATHS.includes(path)) {
      return null;
    }

    const contentDate = getContentDate(path);

    return {
      loc: path,
      priority: pathLevelToPriority[getPathDepthLevel(path)],
      lastmod: contentDate || new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? []
    };
  }
};
