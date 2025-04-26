import type { I18nConfig } from "fumadocs-core/i18n";
import { routing } from "@/i18n/routing";

export const excludeLocales = ["hi", "ko"];

export const i18n: I18nConfig = {
  defaultLanguage: routing.defaultLocale,
  languages: routing.locales
    .filter((locale) => !excludeLocales.includes(locale))
    .map((locale) => locale as string),
};
