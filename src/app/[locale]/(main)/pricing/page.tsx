import { PricingSection } from "@/components/pricing/pricing-section";
import { featureConfig } from "@/config/feature";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getMessages({ locale });

  return constructMetadata({
    title: t.meta.pricing.title,
    description: t.meta.pricing.description,
    pathname: "/pricing",
  });
}

export default function PricingPage() {

  if (!featureConfig.stripeEnabled) {
    notFound();
  }

  return <PricingSection />;
}
