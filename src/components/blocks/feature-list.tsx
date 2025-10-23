import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeatureBlock, FeatureBlockProps } from "./feature-block";

interface FeatureListProps {
  badge?: string;
  heading?: string;
  description?: string;
}

export const FeatureList = ({
  badge,
  heading,
  description,
}: FeatureListProps) => {
  const features: FeatureBlockProps[] = [
    {
      badge: "Image",
      title: "Make your site a true standout.",
      description:
        "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      imageSrc:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80",
      imageAlt: "Features",
      bgmuted: true,
      actions: (
        <>
          <Button size="lg">Try Now</Button>
          <Button variant="outline" size="lg">
            Try Now
          </Button>
        </>
      ),
    },
    {
      badge: "Image",
      title: "Make your site a true standout.",
      description:
        "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      imageSrc:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80",
      imageAlt: "Features",
      reverse: true,
      actions: (
        <>
          <Button size="lg">Try Now</Button>
          <Button variant="outline" size="lg">
            Try Now
          </Button>
        </>
      ),
    },
    {
      badge: "Image",
      title: "Make your site a true standout.",
      description:
        "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      imageSrc:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80",
      imageAlt: "Features",
      bgmuted: true,
      actions: (
        <>
          <Button size="lg">Try Now</Button>
          <Button variant="outline" size="lg">
            Try Now
          </Button>
        </>
      ),
    },
    {
      badge: "Image",
      title: "Make your site a true standout.",
      description:
        "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      imageSrc:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80",
      imageAlt: "Features",
      reverse: true,
      actions: (
        <>
          <Button size="lg">Try Now</Button>
          <Button variant="outline" size="lg">
            Try Now
          </Button>
        </>
      ),
    },
  ];

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col gap-8">
          {features.map((feature, index) => {
            return <FeatureBlock key={index} {...feature} />;
          })}
        </div>
      </div>
    </section>
  );
};
