import PageBreadcrumb from "@/components/page-breadcrumb";
import { PageFAQs } from "@/components/page-faqs";
import { PageHeader } from "@/components/page-header";
import PageJSONLDScript from "@/components/page-jsonld-script";
import { PageNotes } from "@/components/page-notes";
import { PageSectionH2 } from "@/components/page-section-h2";
import { PageSectionH3 } from "@/components/page-section-h3";
import { PageSectionH4 } from "@/components/page-section-h4";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { Suspense } from "react";

// generateMetadata is used to generate the metadata for the feature page
// it is used to set the title, description, keywords, and pathname for the feature page
// it is used to set the title, description, keywords, and pathname for the feature page
export const generateMetadata = async (): Promise<Metadata> => {
    // const t = await getTranslations("meta.feature"); // feature meta i18n
    return constructMetadata({
        title: "Feature title (meta.title)",
        description: "Feature description (meta.description)",
        keywords: ["feature", "meta", "keywords"],
        pathname: "/feature",
    });
}

export default function FeatureLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const t = await getTranslations("feature"); // feature i18n
    return (
        <>
            {/* json-ld script */}
            <PageJSONLDScript title="Feature" description="Feature" pathname="/feature" />
            <div className="flex flex-col items-center justify-center gap-8 mx-auto pb-8">
                {/* page route */}
                <PageBreadcrumb items={[{ key: "home", label: "Home", href: "/" }, { key: "feature", label: "Feature", href: "/feature" }]} />
                {/* page header: h1 */}
                <PageHeader header={""} title="Feature Title(page.title)" description="Feature Description(page.description)" />
                {/* page main content */}
                <Suspense fallback={<div>Loading or Skeleton UI</div>}>
                    {children}
                </Suspense>
                {/* page content: h2 section */}
                <PageSectionH2 title="Feature Lv2 Section Title" description="Feature Lv2 Section Description">
                    Page Content Section of h2
                    {`<div>content</div> or <p>content</p> or element tags`}
                </PageSectionH2>
                {/* page content: h3 section */}
                <PageSectionH3 title="Feature Lv3 Section Title" description="Feature Lv3 Section Description">
                    Page Content Section of h3
                    {`<div>content</div> or <p>content</p> or element tags`}
                </PageSectionH3>
                {/* page content: h4 section */}
                <PageSectionH4 title="Feature Lv4 Section Title" description="Feature Lv4 Section Description">
                    Page Content Section of h4
                    {`<div>content</div> or <p>content</p> or element tags`}
                </PageSectionH4>

                {/* Feature FAQs Section */}
                <PageFAQs heading="FAQs (optional)" description="Feature FAQs description (optional)" faqs={[]} />

                {/* Feature Notes */}
                <PageNotes heading="Notes (optional)" description="Feature Notes description (optional)" notes={[]} />
            </div>
        </>
    );
}