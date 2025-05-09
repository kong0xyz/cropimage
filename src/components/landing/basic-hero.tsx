import { hero } from "@/config/landing-page";
import { TextEffect } from "../ui/text-effect";

export default function BasicHero() {
  return (
    <div className="relative flex flex-col gap-4 items-center justify-center px-4 mx-auto text-center">

      {hero?.title && (
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
          {hero.title}
        </TextEffect>
      )}

      {hero?.subtitle && (
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.3}
          as="h2"
          className="mt-2 text-balance text-4xl md:text-5xl lg:mt-8 xl:text-[4.25rem]">
          {hero.subtitle}
        </TextEffect>
      )}

      {hero?.description && (
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-8 max-w-2xl text-balance text-lg">
          {hero.description}
        </TextEffect>
      )}

      <div className="flex gap-3">
        {hero?.actions?.map((action: React.ReactNode) => {
          return action;
        })}
      </div>

      <div className="mt-8">{hero?.snippet}</div>
    </div>
  );
}
