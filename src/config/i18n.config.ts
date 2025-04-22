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
