import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageSectionH2 = ({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string | null | undefined;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("container mx-auto flex flex-col gap-2 lg:gap-4", className)}>
      {title && (
        <h2 className="mt-4 text-4xl font-semibold text-center">
          {title}
        </h2>
      )}
      {description && <p className="mt-4 font-medium text-muted-foreground text-center">{description}</p>}
      {children}
    </section>
  );
};
