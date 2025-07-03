'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FlagComponents, localeNames } from '@/config/i18n';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  const CurrentFlag = FlagComponents[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 transition-none">
          <CurrentFlag className="w-5 h-4 rounded-sm" />
          <span>{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(localeNames).map(([code, name]) => {
          const Flag = FlagComponents[code];
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={cn(
                'cursor-pointer flex items-center gap-2',
                locale === code && 'bg-accent text-accent-foreground'
              )}
            >
              <Flag className="w-5 h-4 rounded-sm" />
              <span>{name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 