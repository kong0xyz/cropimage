'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { localeNames } from '@/config/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Locale } from '@/config/i18n';
import { 
  US, DE, FR, ES, CN, IN, JP, KR, RU 
} from 'country-flag-icons/react/3x2';

// 国旗组件映射
const FlagComponents: Record<Locale, React.ComponentType<{ className?: string }>> = {
  en: US,
  de: DE,
  fr: FR,
  es: ES,
  zh: CN,
  hi: IN,
  ja: JP,
  ko: KR,
  ru: RU,
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // 移除当前语言前缀
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // 构建新的路径
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    router.push(newPath);
  };

  const CurrentFlag = FlagComponents[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <CurrentFlag className="w-5 h-4 rounded-sm" />
          <span>{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(localeNames).map(([code, name]) => {
          const Flag = FlagComponents[code as Locale];
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