import { MDXFumadocs } from "@/components/content/mdx-fumadocs";
import { PageHeader } from "@/components/page-header";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { use } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations("meta.about");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    pathname: "/about",
  });
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  const { locale } = use(params);
  const t = useTranslations("meta.about");

  return (
    <div className="flex flex-col gap-8 mx-auto pb-8 lg:w-2/3">
      <PageHeader header={""} title={t("title")} />

      <MDXFumadocs slugs={["about"]} locale={locale} />
    </div>
  );
}
