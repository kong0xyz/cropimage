import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginatedPosts } from '@/lib/blog';

interface PaginationProps {
  data: PaginatedPosts;
  baseUrl: string;
  locale: string;
}

export function Pagination({ data, baseUrl, locale }: PaginationProps) {
  const { page, totalPages, hasPrev, hasNext } = data;

  // 生成页码数组
  const getPageNumbers = () => {
    const delta = 2; // 当前页面左右显示的页码数量
    const pages: (number | string)[] = [];
    const rangeStart = Math.max(2, page - delta);
    const rangeEnd = Math.min(totalPages - 1, page + delta);

    if (totalPages <= 1) return pages;

    // 始终显示第一页
    pages.push(1);

    // 如果范围开始不是第2页，添加省略号
    if (rangeStart > 2) {
      pages.push('...');
    }

    // 添加范围内的页码
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // 如果范围结束不是倒数第二页，添加省略号
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }

    // 始终显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const createUrl = (pageNum: number) => {
    return pageNum === 1 ? `/${locale}${baseUrl}` : `/${locale}${baseUrl}?page=${pageNum}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex items-center gap-1">
        {/* 上一页 */}
        {hasPrev ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={createUrl(page - 1)} className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">上一页</span>
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">上一页</span>
          </Button>
        )}

        {/* 页码 */}
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <div key={index} className="px-2 py-1 text-muted-foreground text-sm">
                  ...
                </div>
              );
            }

            const isCurrentPage = pageNum === page;
            
            return (
              <Button
                key={pageNum}
                variant={isCurrentPage ? 'default' : 'outline'}
                size="sm"
                asChild={!isCurrentPage}
                disabled={isCurrentPage}
                className="w-9 h-9 p-0"
              >
                {isCurrentPage ? (
                  <span>{pageNum}</span>
                ) : (
                  <Link href={createUrl(pageNum as number)} className="flex items-center justify-center w-full h-full">
                    {pageNum}
                  </Link>
                )}
              </Button>
            );
          })}
        </div>

        {/* 下一页 */}
        {hasNext ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={createUrl(page + 1)} className="flex items-center gap-1">
              <span className="hidden sm:inline">下一页</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <span className="hidden sm:inline">下一页</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
} 