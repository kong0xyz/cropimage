import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FeatureBlockProps {
  badge?: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  actions?: React.ReactNode;
  reverse?: boolean;
  bgmuted?: boolean;
}

export const FeatureBlock = ({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  actions,
  reverse = false,
  bgmuted = false
}: FeatureBlockProps) => {
  return (
    <section>
      <div className={cn("mx-auto mt-8 rounded-2xl", bgmuted && "bg-muted/70", "p-6 lg:p-16 border-border")}>
        <div
          className={cn("flex flex-col items-center justify-between lg:flex-row gap-20 lg:gap-10", reverse && "lg:flex-row-reverse")}
        >
          <div className="flex flex-col gap-5 lg:w-1/2">
            <Badge variant="outline" className="w-fit bg-background">
              {badge}
            </Badge>
            <h3 className="text-3xl font-semibold lg:text-5xl">
              {title}
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              {description}
            </p>
            <div className="flex w-full gap-2 justify-start items-start">
              {actions}
            </div>
          </div>
          <div className="lg:w-1/2 rounded-2xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
