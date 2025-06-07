'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TocProps {
    items: TocItem[];
    activeId?: string;
    onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export default function Toc({ items, activeId, onLinkClick, className }: TocProps) {
    const t = useTranslations('blog');

    if (!items?.length) {
        return null;
    }

    return (
        <nav className={cn('not-prose relative', className)}>
            <ul className="m-0 list-none space-y-1">
                {items.map((item) => {
                    const active = item.id === activeId;
                    return (
                        <li key={item.id} className="relative">
                            {active && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full text-xs" />
                            )}
                            <a
                                href={`#${item.id}`}
                                className={cn(
                                    'block no-underline transition-all duration-200 hover:text-foreground py-1.5 px-3 rounded-md',
                                    active
                                        ? 'font-medium text-foreground bg-primary/5'
                                        : 'text-muted-foreground hover:bg-muted/50',
                                    item.level === 2 ? '' : 'ml-4'
                                )}
                                onClick={onLinkClick}
                            >
                                {item.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
} 