import { CategoryFlat } from "@/components/biz/category-flat";
import { ProductList } from "@/components/biz/product-list";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";

import { sanityFetch } from "@/sanity/lib/fetch";
import { categorySlugQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const [category] = await Promise.all([
    sanityFetch({ query: categorySlugQuery, params }),
  ]);

  if (!category) {
    return;
  }

  return constructMetadata({
    title: `Category / ${category.title} - ${siteConfig.title}`,
    description: `${category.description}`,
  });
}

export default async function CategorySlugPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { slug } = await params;

  const productParams = { categorySlug: slug };

  const [category] = await Promise.all([
    sanityFetch({ query: categorySlugQuery, params }),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* PageHeader */}
      <PageHeader
        header="CATEGORY"
        title={category?.title || ""}
        description={category?.description}
      />
      <div className="flex flex-col gap-4 w-full">
        {/* Category */}
        <CategoryFlat selectedSlug={slug} />
        {/* Product */}
        <ProductList
          searchParams={searchParams}
          params={params}
          extendParams={productParams}
          routePath={`/category/${slug}`}
        ></ProductList>
      </div>
    </div>
  );
}
