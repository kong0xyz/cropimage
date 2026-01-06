import { ContentSection } from "@/components/common/content-section";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { PageFAQs } from "@/components/page-faqs";
import { PageHeader } from "@/components/page-header";
import PageJSONLDScript from "@/components/page-jsonld-script";
import { PageSectionH2 } from "@/components/page-section-h2";
import { constructMetadata } from "@/lib/seoutils";
import {
  IconCircleNumber1Filled,
  IconCircleNumber2Filled,
  IconCircleNumber3Filled,
  IconResize,
  IconDownload,
  IconPhoto,
  IconFile,
  IconRulerMeasure,
  IconUpload,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("meta.resize");
  return constructMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    pathname: "/resize",
  });
};

export default async function ResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("resize");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title={t("seo.title")}
        description={t("seo.description")}
        pathname="/resize"
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
          <Suspense fallback={<div>{t("loading.resizer")}</div>}>
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
              title={t("features.flexibleResizing.title")}
              icon={<IconResize className="size-12 text-primary" />}
            >
              <p>{t("features.flexibleResizing.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("features.aspectRatioControl.title")}
              icon={<IconRulerMeasure className="size-12 text-primary" />}
            >
              <p>{t("features.aspectRatioControl.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("features.qualityPreservation.title")}
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>{t("features.qualityPreservation.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("features.multipleOutputFormats.title")}
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>{t("features.multipleOutputFormats.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("features.fastProcessing.title")}
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>{t("features.fastProcessing.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("features.previewDownload.title")}
              icon={<IconFile className="size-12 text-primary" />}
            >
              <p>{t("features.previewDownload.description")}</p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* How It Works Section */}
        <PageSectionH2
          className="order-5"
          title={t("sections.howToUse.title")}
          description={t("sections.howToUse.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContentSection
              title={t("steps.upload.title")}
              icon={
                <IconCircleNumber1Filled className="size-12 text-primary" />
              }
            >
              <p>{t("steps.upload.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("steps.setDimensions.title")}
              icon={
                <IconCircleNumber2Filled className="size-12 text-primary" />
              }
            >
              <p>{t("steps.setDimensions.description")}</p>
            </ContentSection>
            <ContentSection
              title={t("steps.downloadResult.title")}
              icon={
                <IconCircleNumber3Filled className="size-12 text-primary" />
              }
            >
              <p>{t("steps.downloadResult.description")}</p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Use Cases Section */}
        <PageSectionH2
          className="order-6"
          title={t("sections.useCases.title")}
          description={t("sections.useCases.description")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentSection title={t("useCases.webOptimization.title")}>
              <p>{t("useCases.webOptimization.description")}</p>
            </ContentSection>
            <ContentSection title={t("useCases.socialMedia.title")}>
              <p>{t("useCases.socialMedia.description")}</p>
            </ContentSection>
            <ContentSection title={t("useCases.printPreparation.title")}>
              <p>{t("useCases.printPreparation.description")}</p>
            </ContentSection>
            <ContentSection title={t("useCases.emailSharing.title")}>
              <p>{t("useCases.emailSharing.description")}</p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* FAQ Section */}

        <PageFAQs
          className="order-7"
          heading={t("sections.faqs.title")}
          description={t("sections.faqs.description")}
          faqs={[
            {
              question: t("faqs.supportedFormats.question"),
              answer: t("faqs.supportedFormats.answer"),
            },
            {
              question: t("faqs.qualityImpact.question"),
              answer: t("faqs.qualityImpact.answer"),
            },
            {
              question: t("faqs.aspectRatio.question"),
              answer: t("faqs.aspectRatio.answer"),
            },
            {
              question: t("faqs.resizeMethods.question"),
              answer: t("faqs.resizeMethods.answer"),
            },
            {
              question: t("faqs.imageSizeLimit.question"),
              answer: t("faqs.imageSizeLimit.answer"),
            },
            {
              question: t("faqs.batchResize.question"),
              answer: t("faqs.batchResize.answer"),
            },
            {
              question: t("faqs.privacy.question"),
              answer: t("faqs.privacy.answer"),
            },
            {
              question: t("faqs.undoResize.question"),
              answer: t("faqs.undoResize.answer"),
            },
          ]}
        />
      </div>
    </div>
  );
}
