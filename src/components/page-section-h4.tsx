import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageSectionH4 = ({
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
        <h4 className="mt-4 text-xl font-semibold text-center">
          {title}
        </h4>
      )}
      {description && <p className="mt-2 font-medium text-muted-foreground text-center">{description}</p>}
      {children}
    </section>
  );
};
