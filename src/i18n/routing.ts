import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales, isI18nEnabled } from "@/config/i18n";

export { defaultLocale, locales };

export const routing = defineRouting({
  defaultLocale,
  locales: isI18nEnabled ? locales : [defaultLocale], // 非 i18n 模式下只支持默认语言
  localePrefix: "as-needed", // 英语不显示在路径中，其他语言显示
  localeDetection: isI18nEnabled, // 只在启用 i18n 时进行语言检测
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
