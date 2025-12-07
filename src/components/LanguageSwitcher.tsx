"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { availableLocales, getLocaleItem, isI18nEnabled } from "@/config/i18n";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // 如果未启用 i18n，不显示语言切换器
  if (!isI18nEnabled) {
    return null;
  }

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 transition-none"
        >
          {getLocaleItem(locale)?.icon}
          <span>{getLocaleItem(locale)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(availableLocales).map(([key, { name, icon }]) => {
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => handleLanguageChange(key)}
              className={cn(
                "cursor-pointer flex items-center gap-2",
                locale === key && "bg-accent text-accent-foreground"
              )}
            >
              {icon}
              <span>{name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
