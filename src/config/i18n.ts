import {
  enUS,
  zhCN,
  ruRU,
  esES,
  frFR,
  deDE,
  jaJP,
  koKR,
} from "@clerk/localizations";
import type { I18nConfig } from "fumadocs-core/i18n";
import { routing } from "@/i18n/routing";
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "fr", "es", "zh", "hi", "ja", "ko", "ru"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
  hi: "हिन्दी",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
};
// clerk locales
export const clerkLocales = {
  en: enUS,
  de: deDE,
  fr: frFR,
  es: esES,
  zh: zhCN,
  hi: enUS,
  ja: jaJP,
  ko: koKR,
  ru: ruRU,
};

// fumadocs locales
export const fumadocsExcludeLocales = ["hi", "ko"];

export const fumadocsI18n: I18nConfig = {
  defaultLanguage: routing.defaultLocale,
  languages: routing.locales
    .filter((locale) => !fumadocsExcludeLocales.includes(locale))
    .map((locale) => locale as string),
};
