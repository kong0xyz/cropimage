import { AnimatedGradientText } from "@/components/common/animated-gradient-text";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { announcement } from "@/config/landing-page";
import { Link } from "@/i18n/routing";

export default function BasicAnnouncement() {
  return (
    announcement?.title &&
    announcement?.href && (
      <Link href={announcement?.href} target={announcement?.target}>
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-linear-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            {announcement?.title}
          </span>
          <IconChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </Link>
    )
  );
}
