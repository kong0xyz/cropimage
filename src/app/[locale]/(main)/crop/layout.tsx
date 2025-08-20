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
  IconCrop,
  IconDownload,
  IconPhoto,
  IconResize,
  IconRotate,
  IconUpload,
} from "@tabler/icons-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  return constructMetadata({
    title: "Free Online Image Cropper - Crop Photos & Images Instantly",
    description:
      "Professional free image cropping tool with real-time preview. Crop photos to any size, rotate, flip, and download in multiple formats. No watermarks, no registration required.",
    keywords: [
      "image cropper",
      "photo crop",
      "crop image online",
      "free image editor",
      "photo resizer",
      "image crop tool",
      "online photo editor",
      "crop photos",
      "image editing",
      "photo cropping",
      "free cropper",
      "image resize",
      "photo tool",
    ],
    pathname: "/",
  });
};

export default function CropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* json-ld script for SEO */}
      <PageJSONLDScript
        title="Free Online Image Cropper"
        description="Professional image cropping tool with advanced features including multiple aspect ratios, real-time preview, and high-quality downloads"
        pathname="/"
      />

      <div className="flex flex-col items-center justify-center gap-8 mx-auto pb-8">
        {/* Page Header with Value Proposition */}
        <div className="order-3 w-full">
          <PageHeader
            header="Free Online Image Cropper"
            title="Professional Image Cropping Tool with Real-Time Preview"
            description="Crop, resize, and edit your images with precision. Multiple aspect ratios, advanced controls, and instant downloads. No registration required, completely free to use."
          />
        </div>

        {/* Main Tool/Feature Interface */}
        <div className="order-2 w-full">
          <Suspense fallback={<div>Loading image cropper...</div>}>
            {children}
          </Suspense>
        </div>

        {/* Key Features Section */}
        <PageSectionH2
          className="order-4"
          title="Key Features"
          description="Professional image cropping capabilities at your fingertips"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title="Multiple Aspect Ratios"
              icon={<IconCrop className="size-12 text-primary" />}
            >
              <p>
                Choose from preset ratios like square (1:1), portrait (3:4),
                landscape (4:3), wide (16:9), or crop freely without
                constraints.
              </p>
            </ContentSection>
            <ContentSection
              title="Real-Time Preview"
              icon={<IconPhoto className="size-12 text-primary" />}
            >
              <p>
                See your cropped image instantly as you adjust. Live preview
                updates with every change for perfect results.
              </p>
            </ContentSection>
            <ContentSection
              title="Advanced Controls"
              icon={<IconRotate className="size-12 text-primary" />}
            >
              <p>
                Rotate, flip, zoom, and move your images with precision. 45° and
                90° rotation options with fine-grained control.
              </p>
            </ContentSection>
            <ContentSection
              title="Multiple Export Formats"
              icon={<IconDownload className="size-12 text-primary" />}
            >
              <p>
                Download in PNG, JPEG, or WebP formats with customizable quality
                settings for optimal file size.
              </p>
            </ContentSection>
            <ContentSection
              title="High Resolution Support"
              icon={<IconResize className="size-12 text-primary" />}
            >
              <p>
                Process high-resolution images up to 10MB. Export in full
                resolution or optimized sizes for web use.
              </p>
            </ContentSection>
            <ContentSection
              title="No Watermarks"
              icon={<IconUpload className="size-12 text-primary" />}
            >
              <p>
                Completely free with no watermarks, registration, or hidden
                costs. Your images remain private and secure.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* How to Use Guide */}
        <PageSectionH2
          className="order-5"
          title="How to Crop Images"
          description="Simple step-by-step guide to crop your images perfectly"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection
              title="Upload & Select Mode"
              icon={
                <IconCircleNumber1Filled className="size-12 text-primary" />
              }
            >
              <p>
                Click &ldquo;Upload Image&rdquo; and select your photo. Choose
                from crop modes: Free Crop, Square (1:1), Portrait (3:4),
                Landscape (4:3), or Wide (16:9). Your image info will be
                displayed automatically.
              </p>
            </ContentSection>
            <ContentSection
              title="Adjust & Fine-tune"
              icon={
                <IconCircleNumber2Filled className="size-12 text-primary" />
              }
            >
              <p>
                Drag the crop area or use Tools & Controls for precise
                adjustments. Rotate (45°/90°), flip, zoom, move the image.
                Switch between Crop and Move modes. See real-time preview as you
                adjust.
              </p>
            </ContentSection>
            <ContentSection
              title="Export & Download"
              icon={
                <IconCircleNumber3Filled className="size-12 text-primary" />
              }
            >
              <p>
                Choose export format (PNG/JPEG/WebP) and quality settings. Use
                Quick Download for fast results, Best Quality for full
                resolution, or Copy to Clipboard. All options preserve your
                settings.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Use Cases & Applications */}
        <PageSectionH2
          className="order-6"
          title="Common Use Cases"
          description="Perfect for various image editing needs"
        >
          <div className="space-y-4">
            <ContentSection title="Social Media Content">
              <p>
                Create perfectly sized images for Instagram posts (1:1), Stories
                (9:16), Facebook covers (16:9), and other social platforms.
              </p>
            </ContentSection>
            <ContentSection title="Profile Pictures & Avatars">
              <p>
                Crop headshots and photos into perfect square or circular
                formats for profile pictures across all platforms.
              </p>
            </ContentSection>
            <ContentSection title="Website & Blog Images">
              <p>
                Optimize images for websites, blogs, and online content with
                specific dimensions and aspect ratios.
              </p>
            </ContentSection>
            <ContentSection title="Print & Digital Media">
              <p>
                Prepare images for printing, presentations, and digital media
                with precise cropping and high-quality output.
              </p>
            </ContentSection>
            <ContentSection title="Photo Editing & Enhancement">
              <p>
                Remove unwanted areas, focus on subjects, and improve
                composition by cropping to the perfect frame.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Why You Need This */}
        <PageSectionH2
          className="order-7"
          title="Why Crop Images Online?"
          description="Benefits of using our professional image cropping tool"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title="No Software Installation">
              <p>
                Works directly in your browser without downloading or installing
                any software. Compatible with all devices and operating systems.
              </p>
            </ContentSection>
            <ContentSection title="Professional Quality">
              <p>
                Advanced cropping engine with high-quality output, smart
                resizing algorithms, and multiple export options for
                professional results.
              </p>
            </ContentSection>
            <ContentSection title="Time Saving">
              <p>
                Quick and efficient cropping with real-time preview. No learning
                curve - get perfect results in seconds, not minutes.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* Competitive Advantages */}
        <PageSectionH2
          className="order-8"
          title="Why Choose Our Image Cropper"
          description="What sets our tool apart from other image editors"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentSection title="Advanced Features">
              <p>
                Professional-grade controls including precise rotation, flip
                options, zoom controls, and multiple export qualities - all
                free.
              </p>
            </ContentSection>
            <ContentSection title="Privacy & Security">
              <p>
                Images are processed locally in your browser. No uploads to
                servers, no data collection, and complete privacy protection.
              </p>
            </ContentSection>
            <ContentSection title="Mobile Optimized">
              <p>
                Fully responsive design that works perfectly on phones, tablets,
                and desktops. Touch-friendly controls for mobile editing.
              </p>
            </ContentSection>
          </div>
        </PageSectionH2>

        {/* FAQs Section */}
        <PageFAQs
          className="order-9"
          heading="Frequently Asked Questions"
          description="Common questions about our image cropping tool"
          faqs={[
            {
              question: "Is this image cropper completely free?",
              answer:
                "Yes, our image cropping tool is 100% free with no hidden costs, watermarks, or registration requirements. You can crop unlimited images without any restrictions.",
            },
            {
              question: "What image formats are supported?",
              answer:
                "We support all common image formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can export your cropped images in PNG, JPEG, or WebP formats.",
            },
            {
              question: "What's the maximum file size I can upload?",
              answer:
                "You can upload images up to 10MB in size. This supports high-resolution photos and most professional image files while ensuring fast processing.",
            },
            {
              question: "Are my images stored on your servers?",
              answer:
                "No, all image processing happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security.",
            },
            {
              question: "Can I crop images on mobile devices?",
              answer:
                "Absolutely! Our tool is fully optimized for mobile devices with touch-friendly controls. You can crop images on phones and tablets just as easily as on desktop.",
            },
            {
              question: "How do I maintain image quality when cropping?",
              answer:
                "Use the 'Best Quality' download option for maximum resolution. You can also adjust the quality setting (70-100%) to balance file size and image quality based on your needs.",
            },
            {
              question: "Can I undo changes while cropping?",
              answer:
                "Yes, you can reset individual adjustments or use the 'Reset All' button to start over. The tool also provides real-time preview so you can see changes before applying them.",
            },
            {
              question: "What aspect ratios are available?",
              answer:
                "We offer common ratios like Square (1:1), Portrait (3:4), Landscape (4:3), Wide (16:9), and Free Crop mode for custom dimensions.",
            },
          ]}
        />
      </div>
    </>
  );
}
