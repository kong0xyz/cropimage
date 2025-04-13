import PortableText from "@/components/content/portable-text";
import { urlForImage } from "@/sanity/lib/utils";
import { Chip } from "@heroui/chip";
import { getImageDimensions } from "@sanity/asset-utils";
import {
  IconArrowUpRight,
  IconCategory,
  IconLicense,
  IconSquareLetterW,
  IconTags,
} from "@tabler/icons-react";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import CategoryItem from "./category-item";
import TagItem from "./tag-item";
import { imgPlaceholder, useExternalURL } from "@/lib/utils";
import { Button } from "@heroui/button";
import { ProductDetailRelated } from "./product-detail-related";
import { PageSection } from "../page-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProductDetail({ product }: Readonly<{ product: any }>) {
  const displayCover = process.env.SITE_DISPLAY_PRODUCT_DETAIL_COVER === "true";
  const coverImageUrl = urlForImage(product?.coverImage)?.url() as string;
  const coverImageDim = getImageDimensions(product?.coverImage);
  const coverImageAlt = product?.coverImage?.alt ?? product.title;

  const avatarImageUrl = urlForImage(product?.avatarImage)?.url() as string;
  const avatarImageAlt = product?.avatarImage?.alt ?? product.title;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* main */}
      <div className="flex-1 space-y-8">
        <div>
          {/* Cover */}
          {displayCover && coverImageUrl && (
            <Image
              className="rounded-2xl shadow-md"
              width={coverImageDim.width}
              height={coverImageDim.height}
              src={coverImageUrl}
              alt={coverImageAlt}
              placeholder={imgPlaceholder}
              priority
            />
          )}
          {/* Content */}
          <article className="flex flex-row items-start justify-between gap-4 my-8">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tighter md:text-4xl md:leading-none lg:text-5xl">
              {product.title}
            </h1>
            <div className="self-start  justify-self-start ">
              {avatarImageUrl && (
                <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-800">
                  <AvatarImage src={avatarImageUrl} alt={avatarImageAlt} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}
            </div>
          </article>
          <p>{product.excerpt}</p>
        </div>

        {/* Content */}
        <PageSection title="Introduction">
          <div className="rounded-lg my-4">
            {product?.content ? (
              <PortableText value={product.content as PortableTextBlock[]} />
            ) : (
              "Nothing"
            )}
          </div>
        </PageSection>

        {/* Relate Products */}
        <PageSection title="More Items">
          <ProductDetailRelated
            limit={2}
            skipSlug={product.slug}
            categories={product?.categories?.map(
              (category: any) => category.slug
            )}
            tags={product?.tags?.map((tag: any) => tag.slug)}
          />
        </PageSection>
      </div>
      {/* side */}
      <div className="order-first lg:order-last lg:w-1/3 w-full min-w-64 flex flex-col flex-wrap gap-4 ">
        <div className="sticky top-24 space-y-4">
          {/* Detail */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-1 grid-flow-row border p-4 rounded-2xl drop-shadow-2xl">
            {/* Categories */}
            {product?.categories && (
              <div className="flex flex-col gap-2 pb-6">
                <div className="uppercase font-bold flex flex-row gap-1 items-center">
                  <IconCategory /> <span>Categories</span>
                </div>
                <div className="gap-2 flex flex-wrap flex-row">
                  {product?.categories?.map((category: any) => {
                    return (
                      <div key={`category_${category._id}`}>
                        <CategoryItem
                          slug={category.slug}
                          title={category.title}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags */}
            {product?.tags && (
              <div className="flex flex-col gap-2 pb-6">
                <div className="uppercase font-bold flex flex-row gap-1 items-center">
                  <IconTags /> <span>Tags</span>
                </div>

                <div className="gap-2 flex flex-wrap flex-row">
                  {product?.tags?.map((tag: any) => {
                    return (
                      <div key={`tag_${tag._id}`}>
                        <TagItem title={tag.title} slug={tag.slug} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Keywords */}
            {product?.keywords && (
              <div className="flex flex-col gap-2 pb-6">
                <div className="uppercase font-bold flex flex-row gap-1 items-center">
                  <IconSquareLetterW /> <span>Keywords</span>
                </div>
                <div className="gap-2 flex flex-wrap flex-row">
                  {product?.keywords?.map((keyword: any) => {
                    return (
                      <Chip variant="dot" radius="sm" key={`kw_${keyword}`}>
                        {keyword}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Licenses */}
            {product?.licenses && (
              <div className="flex flex-col gap-2 pb-6">
                <div className="uppercase font-bold flex flex-row gap-1 items-center">
                  <IconLicense /> <span>Licenses</span>
                </div>
                <div className="gap-2 flex flex-wrap flex-row">
                  {product?.licenses?.map((lic: any) => {
                    return (
                      <Chip variant="bordered" radius="sm" key={`lic_${lic}`}>
                        {lic}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Button as={Link} href={useExternalURL(product.targetLink)} target="_blank" variant="ghost" color="primary" className="w-full">
            Visit the Product <IconArrowUpRight />
          </Button>

          {/* Related */}
          {/* Ads */}
        </div>
      </div>
    </div>
  );
}
