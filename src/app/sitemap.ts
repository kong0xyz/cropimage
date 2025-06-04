import { locales, defaultLocale } from "@/config/i18n";
import { denyRoutes } from "@/config/menu";
import { blogSource, source } from "@/lib/source";
import type { MetadataRoute } from "next";

const staticPaths = ["", "/about", "/privacy", "/terms", "/pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // static
  for (const path of staticPaths) {
    // exclude deny routes
    if (denyRoutes.includes(path)) {
      console.warn(`Sitemap excludes denied route: ${path}`);
      continue;
    }

    // 创建一个符合MetadataRoute.Sitemap中alternates.languages类型的对象
    const languages: Record<string, string> = {};

    locales
      .filter((locale) => locale !== defaultLocale)
      .forEach((locale) => {
        languages[locale] =
          `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${path}`;
      });

    urls.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
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
      const blogLanguages: Record<string, string> = {};
      locales
        .filter((locale) => locale !== defaultLocale)
        .forEach((locale) => {
          blogLanguages[locale] =
            `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${path}`;
        });

      return {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.url}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      }))
    );
    urls.push(...docsurls);
  }

  return urls;
}
