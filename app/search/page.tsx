import { ProductFilter } from "@/components/biz/product-filter";
import { getAllCategories } from "@/services/categories";
import { getAllTags } from "@/services/tags";
import { ProductList } from "@/components/biz/product-list";
import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Search - ${siteConfig.title}`,
    description: `Search for what you need by category, tag, title, etc.`,
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <div className="container mx-auto px-5">
      <PageHeader
        header="Search"
        title="Search for what you need by category, tag, title, etc."
      ></PageHeader>
      <div className="flex flex-col w-full gap-8">
        <Suspense>
          <ProductFilter categories={categories} tags={tags}></ProductFilter>
        </Suspense>
        <ProductList
          params={params}
          searchParams={searchParams}
          routePath={`/search`}
        ></ProductList>
      </div>
    </div>
  );
}
