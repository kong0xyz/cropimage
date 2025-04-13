import { CollectionListFlat } from "@/components/biz/collection-list-flat";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `All Collections - ${siteConfig.title}`,
    description: `Browse content by collection`,
  });
}

export default async function CollectionPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  return (
    <div className="container">
      {/* PageHeader */}
      <PageHeader
        header="Collection"
        title="All Collections"
        description={"Browse content by collection"}
      />
      {/*  */}
      <CollectionListFlat />
    </div>
  );
}
