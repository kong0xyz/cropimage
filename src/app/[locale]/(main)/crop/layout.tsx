import { ContentSection } from "@/components/common/content-section";
import { PageFAQs } from "@/components/page-faqs";
import { PageHeader } from "@/components/page-header";
import PageJSONLDScript from "@/components/page-jsonld-script";
import { PageSectionH2 } from "@/components/page-section-h2";
import { constructMetadata } from "@/lib/seoutils";
import {
  IconCircleNumber1Filled,
  IconCircleNumber2Filled,
  IconCircleNumber3Filled,
  IconCrop,
  IconDownload,
  IconPhoto,
  IconResize,
  IconRotate,
  IconUpload,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations("meta.crop");

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    pathname: "/crop",
  });
};

export default async function CropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("crop");
  return (
    <>
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title={t("seo.jsonLdTitle")}
        description={t("seo.jsonLdDescription")}
        pathname="/crop"
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
          <Suspense fallback={<div>{t("loading")}</div>}>
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
              title={t("sections.keyFeatures.items.aspectRatios.title")}
              icon={<IconCrop className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.aspectRatios.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.keyFeatures.items.realTimePreview.title")}
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.realTimePreview.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.keyFeatures.items.advancedControls.title")}
              icon={<IconRotate className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.advancedControls.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.keyFeatures.items.exportFormats.title")}
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.exportFormats.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.keyFeatures.items.highResolution.title")}
              icon={<IconResize className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.highResolution.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.keyFeatures.items.noWatermarks.title")}
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>
                {t("sections.keyFeatures.items.noWatermarks.description")}
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
              title={t("sections.howToUse.steps.upload.title")}
              icon={
                <IconCircleNumber1Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("sections.howToUse.steps.upload.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.howToUse.steps.adjust.title")}
              icon={
                <IconCircleNumber2Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("sections.howToUse.steps.adjust.description")}
              </p>
            </ContentSection>
            <ContentSection
              title={t("sections.howToUse.steps.export.title")}
              icon={
                <IconCircleNumber3Filled className="size-12 text-primary" />
              }
            >
              <p>
                {t("sections.howToUse.steps.export.description")}
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
            <ContentSection title={t("sections.useCases.items.socialMedia.title")}>
              <p>
                {t("sections.useCases.items.socialMedia.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.useCases.items.profilePictures.title")}>
              <p>
                {t("sections.useCases.items.profilePictures.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.useCases.items.webImages.title")}>
              <p>
                {t("sections.useCases.items.webImages.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.useCases.items.printMedia.title")}>
              <p>
                {t("sections.useCases.items.printMedia.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.useCases.items.photoEditing.title")}>
              <p>
                {t("sections.useCases.items.photoEditing.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Why You Need This */}
        <PageSectionH2
          className="order-7"
          title={t("sections.whyCropOnline.title")}
          description={t("sections.whyCropOnline.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title={t("sections.whyCropOnline.items.noInstallation.title")}>
              <p>
                {t("sections.whyCropOnline.items.noInstallation.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.whyCropOnline.items.professionalQuality.title")}>
              <p>
                {t("sections.whyCropOnline.items.professionalQuality.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.whyCropOnline.items.timeSaving.title")}>
              <p>
                {t("sections.whyCropOnline.items.timeSaving.description")}
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Competitive Advantages */}
        <PageSectionH2
          className="order-8"
          title={t("sections.whyChooseUs.title")}
          description={t("sections.whyChooseUs.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title={t("sections.whyChooseUs.items.advancedFeatures.title")}>
              <p>
                {t("sections.whyChooseUs.items.advancedFeatures.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.whyChooseUs.items.privacySecurity.title")}>
              <p>
                {t("sections.whyChooseUs.items.privacySecurity.description")}
              </p>
            </ContentSection>
            <ContentSection title={t("sections.whyChooseUs.items.mobileOptimized.title")}>
              <p>
                {t("sections.whyChooseUs.items.mobileOptimized.description")}
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
              question: t("sections.faqs.items.free.question"),
              answer: t("sections.faqs.items.free.answer"),
            },
            {
              question: t("sections.faqs.items.formats.question"),
              answer: t("sections.faqs.items.formats.answer"),
            },
            {
              question: t("sections.faqs.items.fileSize.question"),
              answer: t("sections.faqs.items.fileSize.answer"),
            },
            {
              question: t("sections.faqs.items.privacy.question"),
              answer: t("sections.faqs.items.privacy.answer"),
            },
            {
              question: t("sections.faqs.items.mobile.question"),
              answer: t("sections.faqs.items.mobile.answer"),
            },
            {
              question: t("sections.faqs.items.quality.question"),
              answer: t("sections.faqs.items.quality.answer"),
            },
            {
              question: t("sections.faqs.items.undo.question"),
              answer: t("sections.faqs.items.undo.answer"),
            },
            {
              question: t("sections.faqs.items.aspectRatios.question"),
              answer: t("sections.faqs.items.aspectRatios.answer"),
            },
          ]}
        />
      </div>
    </>
  );
}
