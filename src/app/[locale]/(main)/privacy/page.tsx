import { MDXFumadocs } from "@/components/content/mdx-fumadocs";
import { PageHeader } from "@/components/page-header";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { use } from "react";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata | undefined> {
  const { locale } = await params;
  const meta = await getMessages({ locale });

  return constructMetadata({
    title: meta.meta.privacy.title,
    description: meta.meta.privacy.description,
    pathname: "/privacy",
  });
}

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="flex flex-col gap-8 mx-auto pb-8 lg:w-2/3">
      <PageHeader header={""} title="Privacy Policy" />

      <MDXFumadocs slugs={["privacy"]} locale={locale} />

    </div>
  );
}
