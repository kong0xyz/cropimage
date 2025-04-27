"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconQuoteFilled, IconStar } from "@tabler/icons-react";
import * as React from "react";

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  rating?: number;
  image?: string;
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      name,
      role,
      company,
      testimonial,
      rating = 5,
      image,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border p-6",
          "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          "dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] md:p-8",
          className
        )}
        {...props}
      >
        <div className="absolute right-6 top-6 text-6xl font-serif text-muted-foreground/70">
          <IconQuoteFilled />
        </div>

        <div className="flex flex-col gap-4 justify-between h-full">
          {rating > 0 && (
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <IconStar
                  key={index}
                  size={16}
                  className={cn(
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
          )}

          <p className="text-pretty text-base text-muted-foreground">
            {testimonial}
          </p>

          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-4">
              {image && (
                <Avatar>
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  {role}
                  {company && ` @ ${company}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Testimonial.displayName = "Testimonial";

export { Testimonial };
