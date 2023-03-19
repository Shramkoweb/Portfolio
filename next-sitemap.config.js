const pathLevelToPriority = {
  0: 1,
  1: 0.9,
  2: 0.8,
  3: 0.7
};

const getPathDepthLevel = (path) => {
  if (path === '/') {
    return 0;
  }

  return path.split('/').length - 1;
};

/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: 'https://shramko.dev',
  generateIndexSitemap: false,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: pathLevelToPriority[getPathDepthLevel(path)],
      lastmod: config.autoLastmod ? new Date().toISOString() : null,
      alternateRefs: config.alternateRefs ?? []
    };
  }
};
