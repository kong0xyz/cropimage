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
  return constructMetadata({
    title:
      "Free Online Image Compressor - Reduce File Size Without Quality Loss",
    description:
      "Professional image compression tool that reduces file size up to 90% while maintaining quality. Supports JPEG, PNG, WebP. No watermarks, fast processing, completely free.",
    keywords: [
      "image compressor",
      "compress images",
      "reduce file size",
      "optimize images",
      "image optimization",
      "photo compressor",
      "online image compressor",
      "compress photos",
      "image size reducer",
      "web optimization",
      "free compressor",
      "image compression",
      "photo optimization",
    ],
    pathname: "/compress",
  });
};

export default function CompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-6xl">
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title="Free Online Image Compressor"
        description="Professional image compression tool that reduces file size while maintaining quality. Multiple compression presets and advanced settings for optimal results"
        pathname="/compress"
      />

      <div className="flex flex-col items-center justify-center gap-8 mx-auto pb-8">
        {/* Page Header with Value Proposition */}
        <div className="order-3 w-full">
          <PageHeader
            header="Free Online Image Compressor"
            title="Reduce Image File Size Without Losing Quality"
            description="Compress JPEG, PNG, and WebP images up to 90% smaller. Smart compression algorithms preserve visual quality while dramatically reducing file sizes. Perfect for web optimization and faster loading times."
          />
        </div>

        {/* Main Tool/Feature Interface */}
        <div className="order-2 w-full">
          <Suspense fallback={<div>Loading image compressor...</div>}>
            {children}
          </Suspense>
        </div>

        {/* Key Features Section */}
        <PageSectionH2
          className="order-4"
          title="Key Features"
          description="Advanced image compression technology for optimal results"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title="Smart Compression"
              icon={<IconFileZip className="size-12 text-primary" />}
            >
              <p>
                Advanced algorithms reduce file size by up to 90% while
                maintaining visual quality. Choose from High Quality, Balanced,
                Small Size, or Web Optimized presets.
              </p>
            </ContentSection>
            <ContentSection
              title="Real-Time Comparison"
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>
                Side-by-side preview shows original vs compressed images with
                detailed statistics including size reduction and compression
                ratio.
              </p>
            </ContentSection>
            <ContentSection
              title="Multiple Formats"
              icon={<IconFile className="size-12 text-primary" />}
            >
              <p>
                Support for JPEG, PNG, and WebP formats. Convert between formats
                for optimal compression and web compatibility.
              </p>
            </ContentSection>
            <ContentSection
              title="Custom Settings"
              icon={<IconGauge className="size-12 text-primary" />}
            >
              <p>
                Fine-tune compression with custom quality settings, maximum file
                size limits, and dimension controls for perfect optimization.
              </p>
            </ContentSection>
            <ContentSection
              title="Fast Processing"
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>
                Lightning-fast compression powered by browser technology.
                Process images instantly without server uploads.
              </p>
            </ContentSection>
            <ContentSection
              title="Privacy Focused"
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>
                Images are processed locally in your browser. No uploads to
                servers, complete privacy protection, and no watermarks.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* How to Use Guide */}
        <PageSectionH2
          className="order-5"
          title="How to Compress Images"
          description="Simple step-by-step guide to optimize your images"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title="Upload & Choose Preset"
              icon={
                <IconCircleNumber1Filled className="size-12 text-primary" />
              }
            >
              <p>
                Upload your image by clicking &ldquo;Upload&rdquo; or drag &
                drop. Select a compression preset: High Quality (minimal
                compression), Balanced (good ratio), Small Size (maximum
                compression), or Web Optimized.
              </p>
            </ContentSection>
            <ContentSection
              title="Customize & Preview"
              icon={
                <IconCircleNumber2Filled className="size-12 text-primary" />
              }
            >
              <p>
                For custom settings, adjust quality, file size limits,
                dimensions, and output format. See real-time preview with
                before/after comparison and compression statistics.
              </p>
            </ContentSection>
            <ContentSection
              title="Compress & Download"
              icon={
                <IconCircleNumber3Filled className="size-12 text-primary" />
              }
            >
              <p>
                Click &ldquo;Compress Image&rdquo; to process. View detailed
                statistics showing size reduction percentage and space saved.
                Download your optimized image instantly.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Use Cases & Applications */}
        <PageSectionH2
          className="order-6"
          title="Common Use Cases"
          description="Perfect for various optimization needs"
        >
          <div className="space-y-4">
            <ContentSection title="Website Optimization">
              <p>
                Reduce image file sizes for faster website loading times.
                Improve SEO rankings and user experience with optimized images
                that load quickly.
              </p>
            </ContentSection>
            <ContentSection title="Social Media Sharing">
              <p>
                Compress images for faster uploads to social platforms. Maintain
                quality while meeting size restrictions for Instagram, Facebook,
                Twitter.
              </p>
            </ContentSection>
            <ContentSection title="Email & Messaging">
              <p>
                Reduce image sizes for email attachments and messaging apps.
                Share photos quickly without exceeding attachment limits.
              </p>
            </ContentSection>
            <ContentSection title="Storage Optimization">
              <p>
                Save storage space on devices and cloud services. Compress photo
                libraries and archives while preserving visual quality.
              </p>
            </ContentSection>
            <ContentSection title="Mobile App Development">
              <p>
                Optimize images for mobile apps to reduce app size and improve
                performance. Essential for app store submissions and user
                experience.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Why You Need This */}
        <PageSectionH2
          className="order-7"
          title="Why Compress Images Online?"
          description="Benefits of using our professional image compression tool"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title="Improve Website Speed">
              <p>
                Smaller images load faster, improving user experience and SEO
                rankings. Essential for modern web performance and mobile
                optimization.
              </p>
            </ContentSection>
            <ContentSection title="Save Storage Space">
              <p>
                Reduce storage costs and free up space on devices, servers, and
                cloud services. Perfect for managing large photo collections.
              </p>
            </ContentSection>
            <ContentSection title="Better User Experience">
              <p>
                Faster loading images improve engagement and reduce bounce
                rates. Critical for e-commerce, portfolios, and content-heavy
                websites.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Competitive Advantages */}
        <PageSectionH2
          className="order-8"
          title="Why Choose Our Image Compressor"
          description="What sets our tool apart from other compression services"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title="Advanced Technology">
              <p>
                State-of-the-art compression algorithms that preserve quality
                while achieving maximum size reduction. Professional results
                every time.
              </p>
            </ContentSection>
            <ContentSection title="Complete Privacy">
              <p>
                Images are processed locally in your browser. No server uploads,
                no data collection, and complete privacy protection for
                sensitive images.
              </p>
            </ContentSection>
            <ContentSection title="No Limitations">
              <p>
                Completely free with no watermarks, file limits, or registration
                requirements. Compress unlimited images with full access to all
                features.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* FAQs Section */}
        <PageFAQs
          className="order-9"
          heading="Frequently Asked Questions"
          description="Common questions about our image compression tool"
          faqs={[
            {
              question: "Is this image compressor completely free?",
              answer:
                "Yes, our image compression tool is 100% free with no hidden costs, watermarks, or registration requirements. You can compress unlimited images without any restrictions.",
            },
            {
              question: "How much can I reduce my image file size?",
              answer:
                "Depending on the image and settings, you can typically reduce file sizes by 50-90% while maintaining good visual quality. Our smart compression algorithms optimize each image for the best results.",
            },
            {
              question: "What image formats are supported?",
              answer:
                "We support JPEG, PNG, WebP, and other common formats for input. You can export compressed images in JPEG, PNG, or WebP formats for optimal web compatibility.",
            },
            {
              question: "Will compressing affect image quality?",
              answer:
                "Our advanced algorithms are designed to minimize quality loss. The High Quality preset maintains near-original quality, while other presets offer good visual quality with smaller file sizes.",
            },
            {
              question: "What's the maximum file size I can compress?",
              answer:
                "You can upload images up to 50MB in size. This supports high-resolution photos and professional image files while ensuring fast processing speeds.",
            },
            {
              question: "Are my images stored on your servers?",
              answer:
                "No, all compression happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security for your photos.",
            },
            {
              question: "Can I compress images on mobile devices?",
              answer:
                "Absolutely! Our tool is fully optimized for mobile devices with touch-friendly controls. You can compress images on phones and tablets just as easily as on desktop.",
            },
            {
              question: "What's the difference between compression presets?",
              answer:
                "High Quality (minimal compression), Balanced (good size/quality ratio), Small Size (maximum compression), Web Optimized (perfect for websites), and Custom (full control over settings).",
            },
          ]}
        />
      </div>
    </div>
  );
}
