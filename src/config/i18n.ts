import {
  enUS,
  zhCN,
  ruRU,
  esES,
  frFR,
  deDE,
  jaJP,
  koKR,
  itIT,
  ptPT,
} from "@clerk/localizations";
import type { I18nConfig } from "fumadocs-core/i18n";
import { routing } from "@/i18n/routing";
import {
  US,
  DE,
  FR,
  ES,
  CN,
  IN,
  JP,
  KR,
  RU,
  IT,
  PT,
} from "country-flag-icons/react/3x2";
import { Locale } from "next-intl";

export const defaultLocale = routing.defaultLocale;
export const locales: string[] = routing.locales;

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
  it: "Italiano",
  pt: "Português",
};

export const FlagComponents: Record<
  Locale,
  React.ComponentType<{ className?: string }>
> = {
  en: US,
  de: DE,
  fr: FR,
  es: ES,
  zh: CN,
  hi: IN,
  ja: JP,
  ko: KR,
  ru: RU,
  it: IT,
  pt: PT,
};

// clerk locales
export const clerkLocales: Record<string, any> = {
  en: enUS,
  de: deDE,
  fr: frFR,
  es: esES,
  zh: zhCN,
  hi: enUS,
  ja: jaJP,
  ko: koKR,
  ru: ruRU,
  it: itIT,
  pt: ptPT,
};

export type ClerkLocale = keyof typeof clerkLocales;

// fumadocs locales
// https://docs.orama.com/open-source/supported-languages#officially-supported-languages
export const fumadocsExcludeLocales = ["hi", "ko"];

export const fumadocsI18n: I18nConfig = {
  defaultLanguage: routing.defaultLocale,
  languages: locales.filter(
    (locale) => !fumadocsExcludeLocales.includes(locale)
  ),
};
