"use client";
import { Button } from "@heroui/button";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDatabase,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const ProductListEmpty = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-6 md:py-16">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex flex-col items-start gap-2">
          <IconDatabase size={48} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-heading-3 font-heading-3">No data yet</span>
          <span className="text-body font-body text-subtext-color"></span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Link href="/" replace>
          <Button startContent={<IconArrowLeft />} variant="light">
            Go Home
          </Button>
        </Link>

        <Link href="/search" replace>
          <Button
            endContent={<IconArrowRight />}
            color="primary"
            variant="solid"
          >
            Search All
          </Button>
        </Link>
      </div>
    </div>
  );
};
