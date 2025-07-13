import { ContentSection } from "@/components/common/content-section";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { PageFAQs } from "@/components/page-faqs";
import { PageHeader } from "@/components/page-header";
import PageJSONLDScript from "@/components/page-jsonld-script";
import { PageSectionH2 } from "@/components/page-section-h2";
import { PageSectionH3 } from "@/components/page-section-h3";
import { constructMetadata } from "@/lib/seoutils";
import { IconCircleNumber1Filled, IconCircleNumber2Filled, IconCircleNumber3Filled } from "@tabler/icons-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
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
    return (
        <>
            {/* json-ld script for SEO */}
            <PageJSONLDScript title="Feature" description="Feature" pathname="/feature" />

            <div className="flex flex-col items-center justify-center gap-8 mx-auto pb-8">
                {/* Breadcrumb Navigation */}
                <PageBreadcrumb
                    className="order-1"
                    items={[
                        { key: "home", label: "Home", href: "/" },
                        { key: "feature", label: "Feature", href: "/feature" }
                    ]}
                />

                {/* Page Header with Value Proposition */}
                <div className="order-3 w-full">
                    <PageHeader
                        header="Online Tool Category"
                        title="Main Feature Title with Primary Keyword"
                        description="Clear value proposition and brief overview of what this tool does and its main benefit. (2-3 sentences max)"
                    />
                </div>

                {/* Main Tool/Feature Interface */}
                <div className="order-2">
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </div>

                {/* Key Features Section */}
                <PageSectionH2
                    className="order-4"
                    title="Key Features"
                    description="What makes this tool powerful and unique"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add feature cards/items here */}
                    </div>
                </PageSectionH2>

                {/* How to Use Guide */}
                <PageSectionH2
                    className="order-5"
                    title="How to Use"
                    description="Simple step-by-step guide to get started"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ContentSection title="First Step" icon={<IconCircleNumber1Filled className="size-12 text-primary" />}>
                            <p>Step content</p>
                        </ContentSection>
                        <ContentSection title="Second Step" icon={<IconCircleNumber2Filled className="size-12 text-primary" />}>
                            <p>Step content</p>
                        </ContentSection>
                        <ContentSection title="Third Step" icon={<IconCircleNumber3Filled className="size-12 text-primary" />}>
                            <p>Step content</p>
                        </ContentSection>
                    </div>
                </PageSectionH2>

                {/* Use Cases & Applications */}
                <PageSectionH2
                    className="order-6"
                    title="Common Use Cases"
                    description="Real-world applications and scenarios"
                >
                    <div className="space-y-4">
                        {/* Add use case examples */}
                    </div>
                </PageSectionH2>

                {/* Why You Need This */}
                <PageSectionH2
                    className="order-7"
                    title="Why You Need This Tool"
                    description="Problems solved and benefits gained"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ContentSection title="Problem 1">
                            <p>Problem details and solution if needed</p>
                        </ContentSection>
                        <ContentSection title="Problem 2">
                            <p>Problem details and solution if needed</p>
                        </ContentSection>
                        <ContentSection title="Problem 3">
                            <p>Problem details and solution if needed</p>
                        </ContentSection>
                    </div>
                </PageSectionH2>

                {/* Competitive Advantages */}
                <PageSectionH2
                    className="order-8"
                    title="Why Choose Our Tool"
                    description="What sets us apart from alternatives"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ContentSection title="Competitive Advantage 1">
                            <p>Competitive advantage details if needed</p>
                        </ContentSection>
                        <ContentSection title="Competitive Advantage 2">
                            <p>Competitive advantage details if needed</p>
                        </ContentSection>
                        <ContentSection title="Competitive Advantage 3">
                            <p>Competitive advantage details if needed</p>
                        </ContentSection>
                    </div>
                </PageSectionH2>

                {/* FAQs Section */}
                <PageFAQs
                    className="order-9"
                    heading="Frequently Asked Questions"
                    description="Common questions about using this tool"
                    faqs={[
                        {
                            question: "Question 1?",
                            answer: "Detailed answer 1"
                        },
                        {
                            question: "Question 2?",
                            answer: "Detailed answer 2"
                        },
                        {
                            question: "Question 3?",
                            answer: "Detailed answer 3"
                        },
                        {
                            question: "Question 4?",
                            answer: "Detailed answer 4"
                        },
                        {
                            question: "Question 5?",
                            answer: "Detailed answer 5"
                        },
                        {
                            question: "Question 6?",
                            answer: "Detailed answer 6"
                        }
                    ]}
                />

                {/* Technical Requirements */}
                <PageSectionH2
                    className="order-10"
                    title="Technical Requirements"
                    description="System and browser requirements"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ContentSection title="Browser Support">
                            <p>Supported browsers and versions</p>
                        </ContentSection>
                        <ContentSection title="Device Requirements">
                            <p>Minimum device specifications</p>
                        </ContentSection>
                        <ContentSection title="Technical Requirements">
                            <p>System and browser requirements</p>
                        </ContentSection>
                    </div>
                </PageSectionH2>

                {/* Related Resources */}
                <PageSectionH2
                    className="order-11"
                    title="Related Resources"
                    description="Additional tools and documentation"
                >
                    <div className="space-y-4">
                        {/* Add related resources, documentation links, etc. */}
                    </div>
                </PageSectionH2>
            </div>
        </>
    );
}