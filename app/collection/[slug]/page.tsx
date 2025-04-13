import { CollectionListFlat } from "@/components/biz/collection-list-flat";
import { ProductList } from "@/components/biz/product-list";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";

import { getCollectionBySlug } from "@/services/collections";
import { IconArrowRight } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const [collection] = await Promise.all([getCollectionBySlug(params)]);

  if (!collection) {
    return;
  }

  return constructMetadata({
    title: `Category / ${collection.title} - ${siteConfig.title}`,
    description: `${collection.description}`,
  });
}

export default async function CollectionSlugPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { slug } = await params;

  const productParams = { collectionSlug: slug };

  const [collection] = await Promise.all([getCollectionBySlug(params)]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* PageHeader */}
      <PageHeader
        header="Collection"
        title={collection?.title || ""}
        description={collection?.description}
      />
      <div className="flex flex-col gap-4 w-full">
        {/* Product */}
        <ProductList
          searchParams={searchParams}
          params={params}
          extendParams={productParams}
          routePath={`/collection/${slug}`}
        ></ProductList>
        {/* Other Collection */}
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl font-bold">More Collections</div>
          <div>
            <Link
              href="/collection"
              replace
              className="font-bold flex flex-row"
            >
              All Collections <IconArrowRight />
            </Link>
          </div>
        </div>
        <CollectionListFlat skip={collection?._id} limit={4} />
      </div>
    </div>
  );
}
