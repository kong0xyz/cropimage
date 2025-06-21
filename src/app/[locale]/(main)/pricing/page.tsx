import { PageHeader } from "@/components/page-header";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";
import { PricingSection } from "@/components/pricing/pricing-section";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getMessages({locale});
  
  return constructMetadata({
    title: t.meta.pricing.title,
    description: t.meta.pricing.description,
    pathname: "/pricing",
  });
}

export default async function PricingPage() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-8 mx-auto">
      <PageHeader
        header={t('pricing.header')}
        title={t('pricing.title')}
        description={t('pricing.description')}
      />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <PricingSection />
      </div>
    </div>
  );
}
