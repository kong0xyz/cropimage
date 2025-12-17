import { MDXFumadocs } from "@/components/content/mdx-fumadocs";
import { PageHeader } from "@/components/page-header";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { use } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations("meta.privacy");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    pathname: "/privacy",
  });
}

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("meta.privacy");

  return (
    <div className="container mx-auto max-w-prose flex flex-col gap-8 px-6 py-10">
      <PageHeader header={""} title={t("title")} />

      <MDXFumadocs slugs={["privacy"]} locale={locale} />
    </div>
  );
}
