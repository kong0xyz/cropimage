import { hero } from "@/config/landing-page";
import { TextEffect } from "../ui/text-effect";
import BasicAnnouncement from "./basic-announcement";

export default function BasicHero({ animate = true }: { animate?: boolean }) {
  return (
    <section>
      <div className="relative flex flex-col gap-4 items-center justify-center text-center container mx-auto max-w-7xl px-4">
        <BasicAnnouncement />

        {hero?.title &&
          (animate ? (
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] text-primary"
            >
              {hero.title}
            </TextEffect>
          ) : (
            <h1 className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] text-primary">
              {hero.title}
            </h1>
          ))}

        {hero?.subtitle &&
          (animate ? (
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="h2"
              className="mt-2 text-balance text-4xl md:text-5xl lg:mt-8 xl:text-[4.25rem]"
            >
              {hero.subtitle}
            </TextEffect>
          ) : (
            <h2 className="mt-2 text-balance text-4xl md:text-5xl lg:mt-8 xl:text-[4.25rem]">
              {hero.subtitle}
            </h2>
          ))}

        {hero?.description &&
          (animate ? (
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto my-8 text-balance text-lg"
            >
              {hero.description}
            </TextEffect>
          ) : (
            <p className="mx-auto my-8 text-balance text-lg">
              {hero.description}
            </p>
          ))}

        <div className="flex gap-3">
          {hero?.actions?.map((action: React.ReactNode) => {
            return action;
          })}
        </div>

        <div className="mt-8">{hero?.snippet}</div>
      </div>
    </section>
  );
}
