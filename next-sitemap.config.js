/** @type {import('next-sitemap').IConfig} */

// const additionPaths = ["/search", "/category", "/tag", "/collection"];
const additionPaths = [];
const excludesPaths = ["/submit"];

module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
  exclude: excludesPaths,
  additionalPaths: async (config) => {
    const result = [];

    additionPaths?.length > 0 &&
      additionPaths.map((path) => {
        result.push({
          loc: path,
          changefreq: "daily",
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      });

    return result;
  },
};
