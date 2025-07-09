"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva(
  "container mx-auto p-6 border rounded-lg hover:shadow-md flex flex-col gap-2 lg:gap-4",
  {
    variants: {
      theme: {
        default: "bg-background",
        green: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800",
        purple: "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800",
        blue: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800",
      },
      size: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
);

const headingVariants = cva("font-semibold", {
  variants: {
    level: {
      h2: "text-4xl",
      h3: "text-2xl",
      h4: "text-xl",
    },
  },
  defaultVariants: {
    level: "h3",
  },
});

interface ContentSectionProps extends VariantProps<typeof sectionVariants> {
  title?: string;
  description?: string | null;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}

export function ContentSection({
  title,
  description,
  icon,
  children,
  className,
  theme,
  size,
  headingLevel = "h3",
}: Readonly<ContentSectionProps>) {
  const HeadingTag = headingLevel;

  return (
    <section className={cn(sectionVariants({ theme, size }), className)}>
      {(title || icon) && (
        <div className="flex flex-col gap-4">
          {icon && (
            <div className="text-2xl mb-2">
              {icon}
            </div>
          )}
          {title && (
            <HeadingTag className={cn(
              headingVariants({ level: headingLevel }),
              theme === "green" && "text-green-900 dark:text-green-100",
              theme === "purple" && "text-purple-900 dark:text-purple-100",
              theme === "blue" && "text-blue-900 dark:text-blue-100"
            )}>
              {title}
            </HeadingTag>
          )}
        </div>
      )}
      {description && (
        <p className={cn(
          "font-medium",
          theme === "default" && "text-muted-foreground",
          theme === "green" && "text-green-800 dark:text-green-200",
          theme === "purple" && "text-purple-800 dark:text-purple-200",
          theme === "blue" && "text-blue-800 dark:text-blue-200"
        )}>
          {description}
        </p>
      )}
      <div className={cn(
        theme === "default" && "text-foreground",
        theme === "green" && "text-green-800 dark:text-green-200",
        theme === "purple" && "text-purple-800 dark:text-purple-200",
        theme === "blue" && "text-blue-800 dark:text-blue-200"
      )}>
        {children}
      </div>
    </section>
  );
} 