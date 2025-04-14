import { ReactNode } from "react";

export const PageSection = ({
  title,
  description,
  children,
  moreAction,
}: {
  title?: string;
  description?: string | null | undefined;
  children: ReactNode;
  moreAction?: ReactNode;
}) => {
  return (
    <section className="flex flex-col mb-2 lg:mb-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          {title && (
            <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
              {title}
            </h2>
          )}
          {description && <p className="py-2 leading-7">{description}</p>}
        </div>
        {moreAction && <div>{moreAction}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};
