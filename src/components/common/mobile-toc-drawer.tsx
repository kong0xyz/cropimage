'use client';

import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';
import Toc from '@/components/blog/toc';
import { useState, useCallback } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface MobileTocDrawerProps {
    items: TocItem[];
    activeId?: string;
    onLinkClick?: () => void;
    className?: string;
}

export default function MobileTocDrawer({ items, activeId, onLinkClick, className }: MobileTocDrawerProps) {
    const t = useTranslations('blog');
    const [open, setOpen] = useState(false);

    const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setOpen(false);
        const id = e.currentTarget.getAttribute('href')?.slice(1);
        if (id) {
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                onLinkClick?.();
            }, 0);
        }
    }, [onLinkClick]);

    if (!items?.length) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        'rounded-full w-10 h-10 bg-background shadow-lg border',
                        className
                    )}
                    title={t('tableOfContents')}
                    aria-label={t('tableOfContents')}
                >
                    <List className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[540px] flex flex-col">
                <SheetHeader className="pb-3 border-b">
                    <SheetTitle>{t('tableOfContents')}</SheetTitle>
                </SheetHeader>
                <div className="mt-0 px-4 flex-1 overflow-y-auto">
                    <Toc
                        items={items}
                        activeId={activeId}
                        onLinkClick={handleLinkClick}
                        className="px-2 pb-4"
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
} 