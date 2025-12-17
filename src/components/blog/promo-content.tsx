/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";
import { SiteLogo } from "../blocks/site-logo";
import { siteConfig } from "@/config/site";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("border-t border-border bg-muted/20 py-3", className)}>
        <div className="flex items-center gap-3">
          <SiteLogo />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              {siteConfig.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {siteConfig.description}
            </p>
          </div>
          <a
            href="/"
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("border border-border rounded-lg p-4 bg-card", className)}
    >
      <div className="flex flex-col gap-4">
        <SiteLogo />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tighter">
            {siteConfig.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
      </div>
    </div>
  );
}
