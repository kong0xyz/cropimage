import _ from "lodash";

import { siteConfig, metaConfig } from "@/config/site";
import { Metadata } from "next";
import { useMemo } from "react";

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

export type ConstructMetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  pathname: string;
  keywords?: string[];
};

// Metadata
export function constructMetadata({
  title = metaConfig.title,
  description = metaConfig.description,
  image = metaConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  pathname,
  keywords = []
}: ConstructMetadataProps): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [...keywords, ...metaConfig.keywords],
    authors: [
      {
        name: siteConfig.author.name,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [image],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaConfig.title,
      description: metaConfig.description,
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
      canonical: `${siteConfig.url}${pathname}`,
      languages: {
        "de-DE": `${siteConfig.url}/de${pathname}`,
        "en-US": `${siteConfig.url}/en${pathname}`,
        "es-ES": `${siteConfig.url}/es${pathname}`,
        "fr-FR": `${siteConfig.url}/fr${pathname}`,
        "hi-IN": `${siteConfig.url}/hi${pathname}`,
        "ja-JP": `${siteConfig.url}/ja${pathname}`,
        "ko-KR": `${siteConfig.url}/ko${pathname}`,
        "ru-RU": `${siteConfig.url}/ru${pathname}`,
        "zh-CN": `${siteConfig.url}/zh${pathname}`,
      },
    },
  };
}
