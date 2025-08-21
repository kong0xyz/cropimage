import { locales, defaultLocale } from "@/config/i18n";
import { denyRoutes } from "@/config/menu";
import { blogSource, source } from "@/lib/source";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const staticPaths = ["", "/about", "/privacy", "/terms", "/compress", "/resize"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;
  const urls: MetadataRoute.Sitemap = [];

  // static
  for (const path of staticPaths) {
    // exclude deny routes
    if (denyRoutes.includes(path)) {
      console.warn(`Sitemap excludes denied route: ${path}`);
      continue;
    }

    // 创建一个符合MetadataRoute.Sitemap中alternates.languages类型的对象
    const languages: Record<string, string> = {
      "x-default": `${siteUrl}${path}`,
      [defaultLocale]: `${siteUrl}${path}`,
    };

    locales
      .filter((locale) => locale !== defaultLocale)
      .forEach((locale) => {
        languages[locale] =
          `${siteUrl}/${locale}${path}`;
      });

    urls.push({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      alternates: {
        languages,
      },
    });
  }

  // blog
  if (!denyRoutes.includes("/blog")) {
    const pages = blogSource.getPages();
    const blogurls = pages.map((page) => {
      const path = `/blog/${page.slugs.join("/")}`;

      // languages for blog
      const blogLanguages: Record<string, string> = {
        "x-default": `${siteUrl}${path}`,
        [defaultLocale]: `${siteUrl}${path}`,
      };
      locales
        .filter((locale) => locale !== defaultLocale)
        .forEach((locale) => {
          blogLanguages[locale] =
            `${siteUrl}/${locale}${path}`;
        });

      return {
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
        alternates: {
          languages: blogLanguages,
        },
      };
    });
    urls.push(...blogurls);
  }

  // fumadocs
  if (!denyRoutes.includes("/docs")) {
    const entries = source.getLanguages();
    const docsurls = entries.flatMap(({ language, pages }) =>
      pages.map((page) => ({
        url: `${siteUrl}${page.url}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      }))
    );
    urls.push(...docsurls);
  }

  return urls;
}
