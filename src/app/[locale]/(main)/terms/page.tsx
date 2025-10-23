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
  const t = await getTranslations("meta.terms");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    pathname: "/terms",
  });
}

export default function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("meta.terms");
  return (
    <div className="container mx-auto flex flex-col gap-8 pb-8 max-w-4xl">
      <PageHeader header={""} title={t("title")} />

      <MDXFumadocs slugs={["terms"]} locale={locale} />
    </div>
  );
}
