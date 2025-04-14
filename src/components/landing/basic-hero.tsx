import { hero } from "@/config/landing-page";

export default function BasicHero() {
  return (
    <div className="relative flex flex-col gap-4 items-center justify-center px-4">
      {hero.title}
      {hero.subtitle}

      <div className="flex gap-3">
        {hero?.actions?.map((action: React.ReactNode) => {
          return action;
        })}
      </div>

      <div className="mt-8">{hero?.snippet}</div>
    </div>
  );
}
