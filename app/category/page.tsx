import { PageHeader } from "@/components/page-header";

import { ProductList } from "@/components/biz/product-list";
import { CategoryFlat } from "@/components/biz/category-flat";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `All Categories - ${siteConfig.title}`,
    description: `Browse content by category`,
  });
}

export default async function CategoryPage({
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
        header="CATEGORY"
        title="All Categories"
        description={"Browse content by category"}
      />
      {/*  */}
      <div className="flex flex-col w-full gap-8">
        {/* Category */}
        <CategoryFlat />
        {/* Product */}
        <ProductList
          params={params}
          searchParams={searchParams}
          routePath="/category"
        ></ProductList>
      </div>
    </div>
  );
}
