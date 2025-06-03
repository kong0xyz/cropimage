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

export function BlogPagination({
  currentPage,
  totalPages,
  baseUrl,
  locale,
  className
}: BlogPaginationProps) {
  const t = useTranslations('blog.pagination');
  
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // 显示的页码数量

    if (totalPages <= showPages) {
      // 如果总页数不超过显示数量，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 复杂的分页逻辑
      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
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
        <Button
          variant="outline"
          size="sm"
          asChild={currentPage > 1}
          disabled={currentPage <= 1}
          className="h-9 px-3"
        >
          {currentPage > 1 ? (
            <Link href={getPageUrl(currentPage - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('previous')}
            </Link>
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('previous')}
            </>
          )}
        </Button>

        {/* 页码 */}
        <div className="flex items-center gap-1 mx-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? "default" : "outline"}
                size="sm"
                asChild={!isActive}
                className={cn(
                  "w-9 h-9 p-0",
                  isActive && "pointer-events-none"
                )}
              >
                {isActive ? (
                  <span>{pageNumber}</span>
                ) : (
                  <Link href={getPageUrl(pageNumber)}>
                    {pageNumber}
                  </Link>
                )}
              </Button>
            );
          })}
        </div>

        {/* 下一页按钮 */}
        <Button
          variant="outline"
          size="sm"
          asChild={currentPage < totalPages}
          disabled={currentPage >= totalPages}
          className="h-9 px-3"
        >
          {currentPage < totalPages ? (
            <Link href={getPageUrl(currentPage + 1)}>
              {t('next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          ) : (
            <>
              {t('next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* 页面信息 */}
      <div className="ml-6 text-sm text-muted-foreground">
        {t('pageInfo', { current: currentPage, total: totalPages })}
      </div>
    </nav>
  );
} 