'use client';

import { useTranslations } from 'next-intl';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MobileTocDrawer from './mobile-toc-drawer';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface ScrollToTopProps {
    toc?: TocItem[];
    activeId?: string;
    showBackToBlog?: boolean;
}

export default function ScrollToTop({ toc, activeId, showBackToBlog }: ScrollToTopProps) {
    const t = useTranslations('common');
    const blogT = useTranslations('blog');
    const params = useParams();
    const [isVisible, setIsVisible] = useState(false);

    // 监听滚动事件
    useEffect(() => {
        const toggleVisibility = () => {
            // 当页面滚动超过 300px 时显示按钮
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-8 right-4 z-[50] flex flex-col gap-3">
            {/* 移动端目录按钮 - 只在非 xl 屏幕显示，与滚动无关 */}
            {toc && toc.length > 0 && (
                <div className="block xl:hidden">
                    <MobileTocDrawer
                        items={toc}
                        activeId={activeId}
                        className="bg-background shadow-lg border"
                    />
                </div>
            )}
            
            {/* 返回博客按钮和回到顶部按钮 - 只在滚动时显示 */}
            {isVisible && (
                <>
                    {showBackToBlog && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background shadow-lg border"
                            asChild
                        >
                            <Link 
                                href={`/blog`}
                                title={blogT('backToBlog')}
                                aria-label={blogT('backToBlog')}
                            >
                                <ArrowLeft className="w-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background shadow-lg border"
                        onClick={scrollToTop}
                        title={t('scrollToTop')}
                        aria-label={t('scrollToTop')}
                    >
                        <ArrowUp className="w-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    );
} 