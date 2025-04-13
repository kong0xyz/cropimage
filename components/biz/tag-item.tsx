import { IconHash } from "@tabler/icons-react";
import Link from "next/link";

export default function TagItem({
  slug,
  title,
  count = 0,
  target = "_blank",
  checked = false,
}: Readonly<{
  slug: string;
  title: string;
  count?: number;
  target?: string;
  checked?: boolean;
}>) {
  return (
    <div className="relative cursor-pointer ease-in-out before:transition-[width] before:ease-in-out 
     before:duration-700 before:absolute 
     before:bg-primary/70 before:origin-center before:h-[3px] before:w-0 hover:before:w-[50%] 
      before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out 
       after:duration-700 after:absolute after:bg-primary/70 after:origin-center 
        after:h-[3px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
      <Link
        target={target}
        aria-label={`View details about ${title}`}
        href={slug ? `/tag/${slug}` : `/tag`}
      >
        <div
          className={` text-nowrap flex flex-row items-center ${checked && "text-2xl font-bold"} `}
        >
          <IconHash className="text-primary/70" size={16} /> {title} {count > 0 && `(${count})`}
        </div>
      </Link>
    </div>
  );
}
