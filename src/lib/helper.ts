import _ from "lodash";

import { siteConfig } from "@/config/site";
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

// Metadata
export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: "Kong",
      },
    ],
    creator: "Kong",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      images: [image],
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@kong0xyz",
      site: siteConfig.url,
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
