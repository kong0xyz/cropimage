import { ProductList } from "@/components/biz/product-list";
import { TagFlat } from "@/components/biz/tag-flat";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";

import { sanityFetch } from "@/sanity/lib/fetch";
import { tagSlugQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const [tag] = await Promise.all([
    sanityFetch({ query: tagSlugQuery, params }),
  ]);

  if (!tag) {
    return;
  }

  return constructMetadata({
    title: `Tag / ${tag.title} - ${siteConfig.title}`,
    description: `${tag.description}`,
  });
}

export default async function TagSlugPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { slug } = await params;

  const productParams = { tagSlug: slug };

  const [tag] = await Promise.all([
    sanityFetch({ query: tagSlugQuery, params }),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* PageHeader */}
      <PageHeader
        header="TAG"
        title={tag?.title || ""}
        description={tag?.description}
      />
      <div className="flex flex-col gap-4 w-full">
        {/* Tag */}
        <TagFlat selectedSlug={slug} />
        {/* Product */}
        <ProductList
          searchParams={searchParams}
          params={params}
          extendParams={productParams}
          routePath={`/tag/${slug}`}
        ></ProductList>
      </div>
    </div>
  );
}
