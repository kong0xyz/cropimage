import _ from "lodash";

import { clsx, type ClassValue } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * router url
 * @param searchParams
 * @param page
 * @returns
 */
export function searchParamsPageUrl(
  searchParams: URLSearchParams,
  page: string
) {
  const pageSearchParams = new URLSearchParams(searchParams);
  pageSearchParams.set("page", page);

  return pageSearchParams.toString();
}

/**
 * page number >= 1
 * @param value
 * @returns
 */
export function isGreaterThanOrEqualToOneInteger(
  value: string | number | null | undefined
) {
  const val = Number(value);
  return _.isInteger(val) && _.gte(val, 1);
}

export const imgPlaceholder =
  "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9Im5vbmUiPgogICAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iMTIwMCIgZmlsbD0iI0VBRUFFQSIgcng9IjMiIC8+CiAgICA8ZyBvcGFjaXR5PSIuNSI+CiAgICAgICAgPGcgb3BhY2l0eT0iLjUiPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjRkFGQUZBIgogICAgICAgICAgICAgICAgZD0iTTYwMC43MDkgNzM2LjVjLTc1LjQ1NCAwLTEzNi42MjEtNjEuMTY3LTEzNi42MjEtMTM2LjYyIDAtNzUuNDU0IDYxLjE2Ny0xMzYuNjIxIDEzNi42MjEtMTM2LjYyMSA3NS40NTMgMCAxMzYuNjIgNjEuMTY3IDEzNi42MiAxMzYuNjIxIDAgNzUuNDUzLTYxLjE2NyAxMzYuNjItMTM2LjYyIDEzNi42MloiIC8+CiAgICAgICAgICAgIDxwYXRoIHN0cm9rZT0iI0M5QzlDOSIgc3Ryb2tlLXdpZHRoPSIyLjQxOCIKICAgICAgICAgICAgICAgIGQ9Ik02MDAuNzA5IDczNi41Yy03NS40NTQgMC0xMzYuNjIxLTYxLjE2Ny0xMzYuNjIxLTEzNi42MiAwLTc1LjQ1NCA2MS4xNjctMTM2LjYyMSAxMzYuNjIxLTEzNi42MjEgNzUuNDUzIDAgMTM2LjYyIDYxLjE2NyAxMzYuNjIgMTM2LjYyMSAwIDc1LjQ1My02MS4xNjcgMTM2LjYyLTEzNi42MiAxMzYuNjJaIiAvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBzdHJva2U9InVybCgjYSkiIHN0cm9rZS13aWR0aD0iMi40MTgiIGQ9Ik0wLTEuMjA5aDU1My41ODEiCiAgICAgICAgICAgIHRyYW5zZm9ybT0ic2NhbGUoMSAtMSkgcm90YXRlKDQ1IDExNjMuMTEgOTEuMTY1KSIgLz4KICAgICAgICA8cGF0aCBzdHJva2U9InVybCgjYikiIHN0cm9rZS13aWR0aD0iMi40MTgiIGQ9Ik00MDQuODQ2IDU5OC42NzFoMzkxLjcyNiIgLz4KICAgICAgICA8cGF0aCBzdHJva2U9InVybCgjYykiIHN0cm9rZS13aWR0aD0iMi40MTgiIGQ9Ik01OTkuNSA3OTUuNzQyVjQwNC4wMTciIC8+CiAgICAgICAgPHBhdGggc3Ryb2tlPSJ1cmwoI2QpIiBzdHJva2Utd2lkdGg9IjIuNDE4IiBkPSJtNzk1LjcxNyA3OTYuNTk3LTM5MS40NDEtMzkxLjQ0IiAvPgogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiCiAgICAgICAgICAgIGQ9Ik02MDAuNzA5IDY1Ni43MDRjLTMxLjM4NCAwLTU2LjgyNS0yNS40NDEtNTYuODI1LTU2LjgyNCAwLTMxLjM4NCAyNS40NDEtNTYuODI1IDU2LjgyNS01Ni44MjUgMzEuMzgzIDAgNTYuODI0IDI1LjQ0MSA1Ni44MjQgNTYuODI1IDAgMzEuMzgzLTI1LjQ0MSA1Ni44MjQtNTYuODI0IDU2LjgyNFoiIC8+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2UpIj4KICAgICAgICAgICAgPHBhdGggZmlsbD0iIzY2NiIgZmlsbC1ydWxlPSJldmVub2RkIgogICAgICAgICAgICAgICAgZD0iTTYxNi40MjYgNTg2LjU4aC0zMS40MzR2MTYuMTc2bDMuNTUzLTMuNTU0LjUzMS0uNTMxaDkuMDY4bC4wNzQtLjA3NCA4LjQ2My04LjQ2M2gyLjU2NWw3LjE4IDcuMTgxVjU4Ni41OFptLTE1LjcxNSAxNC42NTQgMy42OTggMy42OTkgMS4yODMgMS4yODItMi41NjUgMi41NjUtMS4yODItMS4yODMtNS4yLTUuMTk5aC02LjA2NmwtNS41MTQgNS41MTQtLjA3My4wNzN2Mi44NzZhMi40MTggMi40MTggMCAwIDAgMi40MTggMi40MThoMjYuNTk4YTIuNDE4IDIuNDE4IDAgMCAwIDIuNDE4LTIuNDE4di04LjMxN2wtOC40NjMtOC40NjMtNy4xODEgNy4xODEtLjA3MS4wNzJabS0xOS4zNDcgNS40NDJ2NC4wODVhNi4wNDUgNi4wNDUgMCAwIDAgNi4wNDYgNi4wNDVoMjYuNTk4YTYuMDQ0IDYuMDQ0IDAgMCAwIDYuMDQ1LTYuMDQ1di03LjEwOGwxLjM1Ni0xLjM1NS0xLjI4Mi0xLjI4My0uMDc0LS4wNzN2LTE3Ljk4OWgtMzguNjg5djIzLjQzbC0uMTQ2LjE0Ni4xNDYuMTQ3WiIKICAgICAgICAgICAgICAgIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICAgICAgICA8L2c+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjQzlDOUM5IiBzdHJva2Utd2lkdGg9IjIuNDE4IgogICAgICAgICAgICBkPSJNNjAwLjcwOSA2NTYuNzA0Yy0zMS4zODQgMC01Ni44MjUtMjUuNDQxLTU2LjgyNS01Ni44MjQgMC0zMS4zODQgMjUuNDQxLTU2LjgyNSA1Ni44MjUtNTYuODI1IDMxLjM4MyAwIDU2LjgyNCAyNS40NDEgNTYuODI0IDU2LjgyNSAwIDMxLjM4My0yNS40NDEgNTYuODI0LTU2LjgyNCA1Ni44MjRaIiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iNTU0LjA2MSIgeDI9Ii0uNDgiIHkxPSIuMDgzIiB5Mj0iLjA4NyIKICAgICAgICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQzlDOUM5IiBzdG9wLW9wYWNpdHk9IjAiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjIwOCIgc3RvcC1jb2xvcj0iI0M5QzlDOSIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIuNzkyIiBzdG9wLWNvbG9yPSIjQzlDOUM5IiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDOUM5QzkiIHN0b3Atb3BhY2l0eT0iMCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ijc5Ni45MTIiIHgyPSI0MDQuNTA3IiB5MT0iNTk5Ljk2MyIgeTI9IjU5OS45NjUiCiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0M5QzlDOSIgc3RvcC1vcGFjaXR5PSIwIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ii4yMDgiIHN0b3AtY29sb3I9IiNDOUM5QzkiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjc5MiIgc3RvcC1jb2xvcj0iI0M5QzlDOSIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzlDOUM5IiBzdG9wLW9wYWNpdHk9IjAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSI2MDAuNzkyIiB4Mj0iNjAwLjc5NCIgeTE9IjQwMy42NzciIHkyPSI3OTYuMDgyIgogICAgICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNDOUM5QzkiIHN0b3Atb3BhY2l0eT0iMCIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIuMjA4IiBzdG9wLWNvbG9yPSIjQzlDOUM5IiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ii43OTIiIHN0b3AtY29sb3I9IiNDOUM5QzkiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0M5QzlDOSIgc3RvcC1vcGFjaXR5PSIwIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iNDA0Ljg1IiB4Mj0iNzk2Ljk3MiIgeTE9IjQwMy45MDMiIHkyPSI3OTYuMDIiCiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0M5QzlDOSIgc3RvcC1vcGFjaXR5PSIwIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ii4yMDgiIHN0b3AtY29sb3I9IiNDOUM5QzkiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjc5MiIgc3RvcC1jb2xvcj0iI0M5QzlDOSIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzlDOUM5IiBzdG9wLW9wYWNpdHk9IjAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8Y2xpcFBhdGggaWQ9ImUiPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNTgxLjM2NCA1ODAuNTM1aDM4LjY4OXYzOC42ODloLTM4LjY4OXoiIC8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgIDwvZGVmcz4KPC9zdmc+";

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
        name: "shankai",
      },
    ],
    creator: "shankai",
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
      creator: "@shankaix",
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
