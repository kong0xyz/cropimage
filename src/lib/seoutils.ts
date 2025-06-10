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
  keywords = [],
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
      url: `${siteConfig.url}${pathname}`,
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
        "x-default": `${siteConfig.url}${pathname}`,
        en: `${siteConfig.url}/${pathname}`,
        de: `${siteConfig.url}/de${pathname}`,
        es: `${siteConfig.url}/es${pathname}`,
        fr: `${siteConfig.url}/fr${pathname}`,
        hi: `${siteConfig.url}/hi${pathname}`,
        ja: `${siteConfig.url}/ja${pathname}`,
        ko: `${siteConfig.url}/ko${pathname}`,
        ru: `${siteConfig.url}/ru${pathname}`,
        zh: `${siteConfig.url}/zh${pathname}`,
        pt: `${siteConfig.url}/pt${pathname}`,
        it: `${siteConfig.url}/it${pathname}`,
      },
    },
  };
}

export type ConstructJSONLDProps = {
  title?: string;
  description?: string;
  image?: string;
  pathname: string;
};

export function constructJSONLD({
  title = metaConfig.title,
  description = metaConfig.description,
  image = metaConfig.ogImage,
  pathname = "/",
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
  };

  return JSON.stringify(jsonld);
}
