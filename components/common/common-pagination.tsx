"use client";

import {
  isGreaterThanOrEqualToOneInteger,
  searchParamsPageUrl,
} from "@/lib/utils";
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@heroui/pagination";
import { cn } from "@heroui/theme";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommonPagination({
  total,
  pageSize = Number(process.env.SITE_PAGE_SIZE) || 9,
  routePath,
}: Readonly<{
  total: number;
  pageSize?: number;
  routePath: string;
}>) {
  // params
  const router = useRouter();
  const searchParams = useSearchParams();

  // function
  const pageCompute = () => {
    const pageParam = searchParams.get("page");
    const page: number = isGreaterThanOrEqualToOneInteger(pageParam)
      ? Number(pageParam)
      : 1;
    return page;
  };

  const pageTotalCompute = () => {
    return Math.ceil(total / pageSize);
  };

  const handlePageChange = (page: number) => {
    const url = searchParamsPageUrl(searchParams, `${page}`);
    console.log("page url", url);
    router.push(`${routePath}?${url}`, { scroll: true });
  };

  // state
  const [page, setPage] = useState<number>(pageCompute());
  const [pageTotal, setPageTotal] = useState<number>(pageTotalCompute());

  useEffect(() => {
    setPage(pageCompute());
    setPageTotal(pageTotalCompute());
  }, [searchParams, total, pageSize, routePath]);

  //
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <li key={key}>
          <button
            aria-label="Next page"
            className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
            onClick={onNext}
          >
            <IconChevronRight />
          </button>
        </li>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <li key={key}>
          <button
            aria-label="Previous page"
            className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
            onClick={onPrevious}
          >
            <IconChevronLeft />
          </button>
        </li>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <li key={key}>
          <button aria-label="More pages" className={className}>
            ...
          </button>
        </li>
      );
    }

    // cursor is the default item
    return (
      <li key={key}>
        <button
          aria-label="Current page"
          ref={ref}
          className={cn(
            className,
            isActive && "text-white bg-primary font-bold"
          )}
          onClick={() => setPage(value)}
        >
          {value}
        </button>
      </li>
    );
  };

  return (
    <Pagination
      loop
      disableAnimation
      showControls
      renderItem={renderItem}
      color="primary"
      size="lg"
      disableCursorAnimation
      total={pageTotal}
      initialPage={page}
      page={page}
      onChange={handlePageChange}
      classNames={{
        cursor: "outline-2 outline-offset-2 border-2 border-transparent",
        item: "text-foreground",
        next: "text-foreground",
        prev: "text-foreground",
      }}
    />
  );
}
