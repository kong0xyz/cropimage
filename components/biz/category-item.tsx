import { IconSlash } from "@tabler/icons-react";
import Link from "next/link";

export default function CategoryItem({
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
    <div className="cursor-pointer relative before:absolute before:bg-primary/70 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.12] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500">
      <Link
        target={target}
        aria-label={`View details about ${title}`}
        href={slug ? `/category/${slug}` : "/category"}
      >
        <div
          className={`relative text-nowrap flex flex-row items-center ${checked && "text-2xl font-bold"} `}
        >
          <IconSlash size={16} /> {title} {count > 0 && `(${count})`}
        </div>
      </Link>
    </div>
  );
}
