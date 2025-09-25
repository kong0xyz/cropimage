import { ContentSection } from "@/components/common/content-section";
import { PageFAQs } from "@/components/page-faqs";
import { PageHeader } from "@/components/page-header";
import PageJSONLDScript from "@/components/page-jsonld-script";
import { PageSectionH2 } from "@/components/page-section-h2";
import { constructMetadata } from "@/lib/seoutils";
import { getTranslations } from "next-intl/server";
import {
  IconCircleNumber1Filled,
  IconCircleNumber2Filled,
  IconCircleNumber3Filled,
  IconFileZip,
  IconDownload,
  IconPhoto,
  IconFile,
  IconGauge,
  IconUpload,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("meta.compress");
  return constructMetadata({
    title:
      t("title"),
    description:
      t("description"),
    keywords: t("keywords").split(",")?.map((keyword) => keyword.trim()),
    pathname: "/compress",
  });
};

export default async function CompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("compress");

  return (
    <div className="container mx-auto max-w-6xl">
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/compress"
      />

      <div className="flex flex-col items-center justify-center gap-8 md:gap-16 mx-auto pb-8">
        {/* Page Header with Value Proposition */}
        <div className="order-3 w-full">
          <PageHeader
            header={t("pageHeader.title")}
            title={t("pageHeader.subtitle")}
            description={t("pageHeader.description")}
          />
        </div>

        {/* Main Tool/Feature Interface */}
        <div className="order-2 w-full">
          <Suspense fallback={<div>{t("loading.compressor")}</div>}>
            {children}
          </Suspense>
        </div>

        {/* Key Features Section */}
        <PageSectionH2
          className="order-4"
          title={t("sections.keyFeatures.title")}
          description={t("sections.keyFeatures.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title={t("features.smartCompression.title")}
              icon={<IconFileZip className="size-12 text-primary" />}
            >
              <p>
                {t("features.smartCompression.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("features.realTimeComparison.title")}
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>
                {t("features.realTimeComparison.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("features.multipleFormats.title")}
              icon={<IconFile className="size-12 text-primary" />}
            >
              <p>
                {t("features.multipleFormats.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("features.customSettings.title")}
              icon={<IconGauge className="size-12 text-primary" />}
            >
              <p>
                {t("features.customSettings.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("features.fastProcessing.title")}
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>
                {t("features.fastProcessing.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("features.privacyFocused.title")}
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>
                {t("features.privacyFocused.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* How to Use Guide */}
        <PageSectionH2
          className="order-5"
          title={t("sections.howToUse.title")}
          description={t("sections.howToUse.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title={t("steps.upload.title")}
              icon={
                <IconCircleNumber1Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("steps.upload.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("steps.customize.title")}
              icon={
                <IconCircleNumber2Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("steps.customize.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("steps.compress.title")}
              icon={
                <IconCircleNumber3Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("steps.compress.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Use Cases & Applications */}
        <PageSectionH2
          className="order-6"
          title={t("sections.useCases.title")}
          description={t("sections.useCases.description")}
        >
          <div className="space-y-4">
            <ContentSection title={t("useCases.websiteOptimization.title")}>
              <p>
                {t("useCases.websiteOptimization.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("useCases.socialMedia.title")}>
              <p>
                {t("useCases.socialMedia.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("useCases.emailMessaging.title")}>
              <p>
                {t("useCases.emailMessaging.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("useCases.storageOptimization.title")}>
              <p>
                {t("useCases.storageOptimization.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("useCases.mobileApp.title")}>
              <p>
                {t("useCases.mobileApp.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Why You Need This */}
        <PageSectionH2
          className="order-7"
          title={t("sections.whyCompress.title")}
          description={t("sections.whyCompress.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title={t("benefits.websiteSpeed.title")}>
              <p>
                {t("benefits.websiteSpeed.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("benefits.saveStorage.title")}>
              <p>
                {t("benefits.saveStorage.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("benefits.betterUX.title")}>
              <p>
                {t("benefits.betterUX.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Competitive Advantages */}
        <PageSectionH2
          className="order-8"
          title={t("sections.whyChoose.title")}
          description={t("sections.whyChoose.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title={t("advantages.advancedTech.title")}>
              <p>
                {t("advantages.advancedTech.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("advantages.completePrivacy.title")}>
              <p>
                {t("advantages.completePrivacy.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("advantages.noLimitations.title")}>
              <p>
                {t("advantages.noLimitations.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* FAQs Section */}
        <PageFAQs
          className="order-9"
          heading={t("sections.faqs.title")}
          description={t("sections.faqs.description")}
          faqs={[
            {
              question: t("faqs.free.question"),
              answer: t("faqs.free.answer"),
            },
            {
              question: t("faqs.fileSizeReduction.question"),
              answer: t("faqs.fileSizeReduction.answer"),
            },
            {
              question: t("faqs.supportedFormats.question"),
              answer: t("faqs.supportedFormats.answer"),
            },
            {
              question: t("faqs.qualityImpact.question"),
              answer: t("faqs.qualityImpact.answer"),
            },
            {
              question: t("faqs.maxFileSize.question"),
              answer: t("faqs.maxFileSize.answer"),
            },
            {
              question: t("faqs.privacy.question"),
              answer: t("faqs.privacy.answer"),
            },
            {
              question: t("faqs.mobile.question"),
              answer: t("faqs.mobile.answer"),
            },
            {
              question: t("faqs.presets.question"),
              answer: t("faqs.presets.answer"),
            },
          ]}
        />
      </div>
    </div>
  );
}
