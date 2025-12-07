import { Testimonial } from "@/components/common/testimonial-card";
import {
  testimonialDescription,
  testimonials,
  testimonialTitle,
} from "@/config/landing-page";
import { cn } from "@/lib/utils";

interface BasicTestimonialProps {
  className?: string;
}

export default function BasicTestimonial({
  className,
}: Readonly<BasicTestimonialProps>) {
  return (
    <section>
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          "container mx-auto px-4 lg:px-6",
          className
        )}
      >
        <div className="mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-4 px-4 pb-6">
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              {testimonialTitle}
            </h2>
            <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
              {testimonialDescription}
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
