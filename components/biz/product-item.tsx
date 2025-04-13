import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagItem from "./tag-item";
import CategoryItem from "./category-item";
import { IconArrowUpRight } from "@tabler/icons-react";
import CommonCardOffset from "@/components/common/common-card-offset";
import { urlForImage } from "@/sanity/lib/utils";
import { imgPlaceholder } from "@/lib/utils";
import { Button } from "@heroui/button";

export const ProductItem = ({
  slug,
  title,
  excerpt,
  tags,
  categories,
  coverImage,
  avatarImage,
  time,
}: {
  slug: string;
  title: string;
  excerpt: string;
  tags: { title: string; slug: string }[];
  categories: { title: string; slug: string }[];
  coverImage: any;
  avatarImage: any;
  time: string;
}) => {
  const linkAriaLabel = `View details about ${title}`;

  const displayCover = process.env.SITE_DISPLAY_PRODUCT_ITEM_COVER === "true",
    displayLogo = process.env.SITE_DISPLAY_PRODUCT_ITEM_LOGO === "true";

  const coverImageUrl = displayCover
    ? (urlForImage(coverImage)?.height(320).width(640).url() as string)
    : "";
  const avatarImageUrl = displayLogo
    ? (urlForImage(avatarImage)?.height(64).width(64).url() as string)
    : "";

  return (
    <CommonCardOffset>
      {/* Cover */}
      {displayCover && coverImage && (
        <div className="relative overflow-hidden">
          <Link aria-label={linkAriaLabel} href={`/item/${slug}`}>
            <Image
              width={320}
              height={160}
              src={coverImageUrl}
              alt={coverImage?.alt ?? title}
              className="w-full h-48 object-cover rounded-md border-small border-foreground-200"
              placeholder="blur"
              blurDataURL={imgPlaceholder}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between gap-1">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div className="flex items-start justify-between gap-1">
            <div className="text-left text-xl font-semibold line-clamp-2 hover:underline">
              <Link aria-label={linkAriaLabel} href={`/item/${slug}`}>
                {title}
              </Link>
            </div>
            {/* Detail Link */}
            <div className="">
              <Button
                radius="full"
                variant="light"
                target="_blank"
                aria-label={linkAriaLabel}
                href={`/item/${slug}`}
                as={Link}
                isIconOnly
              >
                <IconArrowUpRight className="hover:scale-110" size="24" />
              </Button>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-1">
            {categories?.map((category: any, index: number) => (
              <CategoryItem
                key={category.slug}
                title={category.title}
                slug={category.slug}
              />
            ))}
          </div>

          {/* Excerpt */}
          <div className="text-justify text-md line-clamp-3">{excerpt}</div>
        </div>

        <div className="flex items-end justify-between pt-2">
          {/* logo */}
          <div className="w-12 flex justify-start">
            {displayLogo && avatarImage && (
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={avatarImageUrl}
                alt={avatarImage?.alt ?? title}
                loading="lazy"
                placeholder="blur"
                blurDataURL={imgPlaceholder}
              />
            )}
          </div>

          {/* tags */}
          <div className="flex flex-wrap justify-end gap-2">
            {tags?.map((tag: any) => (
              <TagItem key={tag.slug} title={tag.title} slug={tag.slug} />
            ))}
          </div>
        </div>
      </div>
    </CommonCardOffset>
  );
};
