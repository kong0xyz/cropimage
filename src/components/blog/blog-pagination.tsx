"use client";

import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  locale: string;
  className?: string;
}

type PageType = number | '...';

export function BlogPagination({
  currentPage,
  totalPages,
  baseUrl,
  locale,
  className
}: BlogPaginationProps) {
  const t = useTranslations('blog.pagination');

  if (totalPages <= 1) return null;

  const generatePageNumbers = (): PageType[] => {
    const pages: PageType[] = [];
    const showPages = 5;
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return baseUrl;
    }
    return `${baseUrl}?page=${page}`;
  };

  const pages = generatePageNumbers();

  return (
    <nav
      className={cn("flex items-center justify-center", className)}
      aria-label={t('navigation')}
    >
      <div className="flex items-center gap-1">
        {/* 上一页按钮 */}
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            rel="prev"
            aria-label={t('previous')}
            title={t('previous')}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('previous')}
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3"
            disabled
            aria-label={t('previous')}
            title={t('previous')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('previous')}
          </Button>
        )}

        {/* 页码 */}
        <ul className="flex items-center gap-1 mx-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <li key={`ellipsis-${index}`} aria-hidden="true">
                  <div className="flex items-center justify-center w-9 h-9 text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                </li>
              );
            }
            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;
            const pageLabel = t('pageX', { page: pageNumber });
            return (
              <li key={pageNumber}>
                {isActive ? (
                  <span
                    className="w-9 h-9 p-0 flex items-center justify-center pointer-events-none bg-primary text-primary-foreground rounded"
                    aria-current="page"
                    title={pageLabel}
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    href={getPageUrl(pageNumber)}
                    title={pageLabel}
                    aria-label={pageLabel}
                  >
                    <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                      {pageNumber}
                    </Button>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* 下一页按钮 */}
        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            rel="next"
            aria-label={t('next')}
            title={t('next')}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3"
            >
              {t('next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3"
            disabled
            aria-label={t('next')}
            title={t('next')}
          >
            {t('next')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* 页面信息 */}
      <div className="ml-6 text-sm text-muted-foreground">
        {t('pageInfo', { current: currentPage, total: totalPages })}
      </div>
    </nav>
  );
} 