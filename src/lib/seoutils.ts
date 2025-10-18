import _ from "lodash";

import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { useMemo } from "react";
import { getLocale } from "next-intl/server";
import { defaultLocale, isI18nEnabled, locales } from "@/config/i18n";

export const useExternalURL = (baseUrl: string) => {
  return useMemo(() => {
    const params = new URLSearchParams({
      utm_source: siteConfig.utm.source,
      utm_medium: siteConfig.utm.medium,
      utm_campaign: siteConfig.utm.campaign,
    });

    const searchParams = new URLSearchParams(params);
    return `${baseUrl}?${searchParams.toString()}`;
  }, [baseUrl]);
};

// 根据 i18n 配置生成语言替代链接
function generateLanguageAlternates(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}${pathname}`,
    [defaultLocale]: `${siteConfig.url}${pathname}`,
  };

  // 只在启用 i18n 时添加其他语言的链接
  if (isI18nEnabled) {
    locales
      .filter((locale) => locale !== defaultLocale)
      .forEach((locale) => {
        languages[locale] = `${siteConfig.url}/${locale}${pathname}`;
      });
  }

  return languages;
}

export type ConstructMetadataProps = {
  title: string;
  description: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  pathname: string;
  keywords?: string[];
};

// Metadata
export async function constructMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  pathname,
  keywords = [],
}: ConstructMetadataProps): Promise<Metadata> {
  const locale = await getLocale();

  // 在非 i18n 模式下，不添加 locale 路径前缀
  const localePath =
    !isI18nEnabled || !locale || locale === defaultLocale ? "" : `/${locale}`;
  const defaultPath = `${siteConfig.url}${pathname}`;
  const canonicalPath = `${siteConfig.url}${localePath}${pathname}`;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [...keywords],
    authors: [
      {
        name: siteConfig.author.name,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.name,
      images: [image],
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: siteConfig.author.name,
      images: [image],
      site: siteConfig.url,
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/manifest.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: canonicalPath,
      languages: generateLanguageAlternates(pathname),
    },
  };
}

export type ConstructJSONLDProps = {
  title: string;
  description: string;
  image?: string;
  pathname: string;
  graph?: object;
};

export function constructJSONLD({
  title,
  description,
  image = siteConfig.ogImage,
  pathname = "/",
  graph,
}: ConstructJSONLDProps): string {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: description,
    url: `${siteConfig.url}${pathname}`,
    image: image,
    operatingSystem: "Web",
    applicationCategory: "Utility",
    applicationSubCategory: "WebApplication",
    applicationSuite: "WebApplication",
    applicationPlatform: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.author.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    ...(graph && { "@graph": graph }),
  };

  return JSON.stringify(jsonld).replace(/</g, "\\u003c");
}
