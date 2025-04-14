import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Edit Image - ${siteConfig.title}`,
  });
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader header={""} title="Edit Image" />

    </div>
  );
}
