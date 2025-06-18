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
        <h4 className="scroll-m-20 py-2 text-xl font-semibold tracking-tight first:mt-0">
          {title}
        </h4>
      )}
      {description && <p className="py-2 leading-7">{description}</p>}
      {children}
    </section>
  );
};
