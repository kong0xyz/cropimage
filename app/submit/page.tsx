import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/page-header";
import ProductForm from "@/components/forms/product-form";
import { getAllCategories } from "@/services/categories";
import { getAllTags } from "@/services/tags";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return {
    title: `提交 - ${siteConfig.title}`,
    description: `提交您的产品到我们的目录`,
  };
}

export default async function SubmitPage({
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
        header="Product"
        title="Submit"
        description="Submit your product to the directory"
      ></PageHeader>
      <div className="flex flex-col w-full gap-8">
        {/* Submit Form */}
        <div className="flex flex-col w-full gap-8 pb-16">
          <ProductForm categories={categories} tags={tags} />
        </div>
      </div>
    </div>
  );
}
