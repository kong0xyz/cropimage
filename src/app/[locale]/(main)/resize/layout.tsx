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

export const generateMetadata = async (): Promise<Metadata> => {
  return constructMetadata({
    title:
      "Free Online Image Resizer - Resize Images to Any Dimension",
    description:
      "Professional image resizing tool that changes image dimensions while maintaining quality. Supports JPEG, PNG, WebP. Resize by percentage, pixels, or preset sizes. Completely free.",
    keywords: [
      "image resizer",
      "resize images",
      "change image size",
      "image dimensions",
      "photo resizer",
      "online image resizer",
      "resize photos",
      "image scaling",
      "picture resizer",
      "thumbnail generator",
      "free resizer",
      "image resize",
      "photo scaling",
      "dimension changer",
    ],
    pathname: "/resize",
  });
};

export default function ResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title="Free Online Image Resizer"
        description="Professional image resizing tool that changes image dimensions while maintaining quality. Supports JPEG, PNG, WebP formats."
        pathname="/resize"
      />

      <div className="flex flex-col items-center justify-center gap-8 mx-auto pb-8">
        {/* Page Header with Value Proposition */}
        <div className="order-3 w-full">
          <PageHeader
            header="Free Online Image Resizer"
            title="Professional Image Resizing Tool with Multiple Options"
            description="Resize your images to any dimension with precision. Choose from percentage, pixel-perfect sizing, or preset dimensions. No registration required, completely free to use."
          />
        </div>

        {/* Main Tool/Feature Interface */}
        <div className="order-2 w-full">
          <Suspense fallback={<div>Loading image resizer...</div>}>
            {children}
          </Suspense>
        </div>

        {/* Key Features Section */}
        <PageSectionH2
          className="order-4"
          title="Key Features"
          description="Professional image resizing capabilities at your fingertips"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title="Flexible Resizing Options"
              icon={<IconResize className="size-12 text-primary" />}
            >
              <p>
                Resize by percentage, exact pixels, or choose from preset
                dimensions for common use cases like social media and web.
              </p>
            </ContentSection>
            <ContentSection
              title="Aspect Ratio Control"
              icon={<IconRulerMeasure className="size-12 text-primary" />}
            >
              <p>
                Maintain original proportions or stretch to exact dimensions as
                needed with our intelligent aspect ratio controls.
              </p>
            </ContentSection>
            <ContentSection
              title="Quality Preservation"
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>
                Advanced algorithms ensure your resized images maintain optimal
                quality and sharpness at any size.
              </p>
            </ContentSection>
            <ContentSection
              title="Multiple Output Formats"
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>
                Export in JPEG, PNG, or WebP formats with customizable quality
                settings for optimal file size and compatibility.
              </p>
            </ContentSection>
            <ContentSection
              title="Fast Processing"
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>
                Client-side processing ensures fast resizing without uploading
                to servers, keeping your images private and secure.
              </p>
            </ContentSection>
            <ContentSection
              title="Preview & Download"
              icon={<IconFile className="size-12 text-primary" />}
            >
              <p>
                Preview your resized images before downloading. Get detailed
                statistics about dimensions and file size changes.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* How It Works Section */}
        <PageSectionH2
          className="order-5"
          title="How to Resize Images Online"
          description="Simple three-step process to resize your images professionally"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContentSection
              title="1. Upload Your Image"
              icon={<IconCircleNumber1Filled className="size-12 text-primary" />}
            >
              <p>
                Choose your image file from your device. Supports JPEG, PNG, WebP
                formats up to 50MB. Drag and drop or click to browse.
              </p>
            </ContentSection>
            <ContentSection
              title="2. Set Dimensions"
              icon={<IconCircleNumber2Filled className="size-12 text-primary" />}
            >
              <p>
                Choose resize method: percentage, exact pixels, or preset sizes.
                Control aspect ratio and quality settings for perfect results.
              </p>
            </ContentSection>
            <ContentSection
              title="3. Download Result"
              icon={<IconCircleNumber3Filled className="size-12 text-primary" />}
            >
              <p>
                Preview and download your resized image instantly. Choose from multiple
                output formats with no watermarks or limitations.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Use Cases Section */}
        <PageSectionH2
          className="order-6"
          title="Common Use Cases"
          description="Perfect for various image resizing needs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentSection title="Web Optimization">
              <p>
                Resize images for faster website loading. Create thumbnails,
                banner images, and responsive image sets for different screen
                sizes and devices.
              </p>
            </ContentSection>
            <ContentSection title="Social Media">
              <p>
                Resize images to fit social media platform requirements.
                Instagram posts, Facebook covers, Twitter headers, and more
                with preset dimensions.
              </p>
            </ContentSection>
            <ContentSection title="Print Preparation">
              <p>
                Adjust image dimensions for printing. Create high-resolution
                images for posters or reduce size for standard photo prints
                and documents.
              </p>
            </ContentSection>
            <ContentSection title="Email & Sharing">
              <p>
                Reduce image size for email attachments or faster sharing while
                maintaining visual quality. Perfect for quick file size reduction.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* FAQ Section */}
        <PageSectionH2
          className="order-7"
          title="Frequently Asked Questions"
          description="Common questions about image resizing"
        >
          <PageFAQs
            faqs={[
              {
                question: "What image formats are supported for resizing?",
                answer:
                  "Our image resizer supports JPEG, PNG, and WebP formats. You can upload files up to 50MB in size and convert between different formats during the resize process.",
              },
              {
                question: "Will resizing affect image quality?",
                answer:
                  "When enlarging images, some quality loss is inevitable due to interpolation. When reducing size, quality is generally well-preserved. We use advanced algorithms to minimize quality degradation during resizing.",
              },
              {
                question: "Can I maintain the aspect ratio while resizing?",
                answer:
                  "Yes! You can choose to maintain the original aspect ratio (proportional resize) or stretch the image to exact dimensions. The aspect ratio lock helps prevent distortion.",
              },
              {
                question: "What resize methods are available?",
                answer:
                  "You can resize by percentage (e.g., 50% of original), exact pixel dimensions, or choose from preset sizes for common use cases like thumbnails, social media, or print formats.",
              },
              {
                question: "Is there a limit on image size?",
                answer:
                  "You can upload images up to 50MB. The maximum output dimensions depend on your browser's capabilities, but typically support very large images up to 10,000x10,000 pixels.",
              },
              {
                question: "Can I batch resize multiple images?",
                answer:
                  "Currently, the tool processes one image at a time. For multiple images, you'll need to resize them individually. We're considering batch processing for future updates.",
              },
              {
                question: "Are my images uploaded to a server?",
                answer:
                  "No, all image processing happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and faster processing.",
              },
              {
                question: "Can I undo a resize operation?",
                answer:
                  "You can use the reset function to clear the current session and start over with the original image. However, once you download a resized image, you'll need the original to make further changes.",
              },
            ]}
          />
        </PageSectionH2>
      </div>
    </>
  );
}
