import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface FeatureSimpleProps {
  badge?: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  actions?: React.ReactNode;
  reverse?: boolean;
}

export const FeatureSimple = ({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  actions,
  reverse
}: FeatureSimpleProps) => {
  return (
    <section className="py-8 md:py-16 lg:py-32">
      <div className={cn("container flex flex-col items-center gap-8 lg:flex-row lg:items-center", reverse && "lg:flex-row-reverse")}>
        {/* Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">
          {badge && <Badge className="mb-4" variant="outline">{badge}</Badge>}
          <h1 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
            {title}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {actions}
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:flex-1">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={400}
            className="max-h-96 w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};
