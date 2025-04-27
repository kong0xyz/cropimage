import { Pricing } from "@/components/blocks/pricing";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/helper";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const t = await getTranslations('menu');
  return constructMetadata({
    title: `${t('pricing')} - ${siteConfig.title}`,
  });
}

const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

export default async function PricingPage() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        header={t('pricing.header')}
        title={t('pricing.title')}
        description={t('pricing.description')}
      />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg">
          <Pricing plans={demoPlans} />
        </div>
      </div>
    </div>
  );
}
