import { MDXFumadocs } from "@/components/content/mdx-fumadocs";
import { PageHeader } from "@/components/page-header";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { use } from "react";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `About Us`,
    pathname: "/about",
  });
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  const { locale } = use(params);

  return (
    <div className="flex flex-col gap-8 mx-auto pb-8 lg:w-2/3">
      <PageHeader header={""} title="About" />

      <MDXFumadocs slugs={["about"]} locale={locale} />
    </div>
  );
}
