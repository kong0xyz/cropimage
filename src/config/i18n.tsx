import type { I18nConfig } from "fumadocs-core/i18n";
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
import { JSX } from "react";

// 控制是否启用多语言功能（影响语言切换器显示和非默认语言的访问）
export const isI18nEnabled = true;

// Locale 配置 - 集中管理所有语言配置
export const defaultLocale = "en";
export const availableLocales: Record<
  string,
  { id: string; name: string; icon: JSX.Element }
> = {
  en: {
    id: "en",
    name: "English",
    icon: <US className="w-5 h-4 rounded-sm" />,
  },
  de: {
    id: "de",
    name: "Deutsch",
    icon: <DE className="w-5 h-4 rounded-sm" />,
  },
  fr: {
    id: "fr",
    name: "Français",
    icon: <FR className="w-5 h-4 rounded-sm" />,
  },
  es: {
    id: "es",
    name: "Español",
    icon: <ES className="w-5 h-4 rounded-sm" />,
  },
  zh: {
    id: "zh",
    name: "中文",
    icon: <CN className="w-5 h-4 rounded-sm" />,
  },
  hi: {
    id: "hi",
    name: "हिन्दी",
    icon: <IN className="w-5 h-4 rounded-sm" />,
  },
  ja: {
    id: "ja",
    name: "日本語",
    icon: <JP className="w-5 h-4 rounded-sm" />,
  },
  ko: {
    id: "ko",
    name: "한국어",
    icon: <KR className="w-5 h-4 rounded-sm" />,
  },
  ru: {
    id: "ru",
    name: "Русский",
    icon: <RU className="w-5 h-4 rounded-sm" />,
  },
  it: {
    id: "it",
    name: "Italiano",
    icon: <IT className="w-5 h-4 rounded-sm" />,
  },
  pt: {
    id: "pt",
    name: "Português",
    icon: <PT className="w-5 h-4 rounded-sm" />,
  },
};

export const getLocaleItem = (locale: string) => {
  return availableLocales[locale];
};
// 始终支持所有语言，只是在非 i18n 模式下限制访问
export const locales: string[] = Object.keys(availableLocales);

// fumadocs locales
// https://docs.orama.com/open-source/supported-languages#officially-supported-languages
export const fumadocsExcludeLocales: string[] = [];

export const fumadocsI18n: I18nConfig = {
  defaultLanguage: defaultLocale,
  languages: locales.filter(
    (locale) => !fumadocsExcludeLocales.includes(locale)
  ),
};

// 辅助函数：获取有效的 locale
export function getValidLocale(requestedLocale?: string): string {
  if (!requestedLocale || !locales.includes(requestedLocale)) {
    return defaultLocale;
  }
  return requestedLocale;
}

// 辅助函数：检查 locale 是否有效且在当前模式下被允许
export function isValidLocale(locale: string): boolean {
  return locales.includes(locale);
}

// 辅助函数：检查 locale 在当前模式下是否被允许访问
export function isLocaleAllowed(locale: string): boolean {
  // 默认语言始终允许
  if (locale === defaultLocale) {
    return true;
  }
  // 其他语言只在启用 i18n 时允许
  return isI18nEnabled && locales.includes(locale);
}
