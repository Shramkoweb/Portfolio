/** @type {import("next-sitemap").IConfig} */

module.exports = {
  siteUrl: 'https://shramko.dev',
  generateIndexSitemap: false,
  changefreq: 'weekly',
  // TODO add lastmod with node file info from posts dir
  autoLastmod: false
};
