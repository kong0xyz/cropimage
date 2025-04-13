import { PageHeader } from "@/components/page-header";

import { ProductList } from "@/components/biz/product-list";
import { TagFlat } from "@/components/biz/tag-flat";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `All Tags - ${siteConfig.title}`,
    description: `Browse content by tag`,
  });
}

export default async function TagPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  return (
    <div className="container mx-auto px-5">
      {/* PageHeader */}
      <PageHeader
        header="TAG"
        title="All Tags"
        description={"Browse content by tag"}
      />
      {/*  */}
      <div className="flex flex-col w-full gap-8">
        {/* Tag */}
        <TagFlat />
        {/* Product */}
        <ProductList
          params={params}
          searchParams={searchParams}
          routePath={`/tag`}
        ></ProductList>
      </div>
    </div>
  );
}
