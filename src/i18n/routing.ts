import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const defaultLocale = "en";
export const locales = [
  "en",
  // "de",
  // "fr",
  // "es",
  // "zh",
  // "hi",
  // "ja",
  // "ko",
  // "ru",
  // "it",
  // "pt",
];

export const routing = defineRouting({
  defaultLocale,
  locales,
  localePrefix: "as-needed",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
