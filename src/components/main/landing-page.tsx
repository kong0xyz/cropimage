import { FeatureTabs } from "@/components/blocks/feature-tabs";
import { FeatureList } from "@/components/blocks/feature-list";
import BasicAnnouncement from "@/components/landing/basic-announcement";
import BasicCategories from "@/components/landing/basic-categories";
import { BasicFAQs } from "@/components/landing/basic-faq";
import BasicFeatures from "@/components/landing/basic-features";
import BasicHero from "@/components/landing/basic-hero";
import BasicTestimonial from "@/components/landing/basic-testimonial";
import { LightRays } from "../ui/light-rays";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 md:pt-16">
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none -z-10">
        <LightRays />
      </div>
      {/* Announcement */}
      <div className="flex flex-col justify-center gap-16">
        <BasicAnnouncement />
        {/* Hero  */}
        <BasicHero animate={false} />
        {/* Categories */}
        <BasicCategories />
        {/* Features */}
        <BasicFeatures />
        <>
          <FeatureTabs
            badge="Features"
            heading="Features"
            description="Join us to build flawless web solutions."
          />
          <FeatureList
            badge="Features"
            heading="Features"
            description="Join us to build flawless web solutions."
          />
        </>
        {/* Testimonial */}
        <BasicTestimonial />
        {/* Faq */}
        <BasicFAQs />
      </div>
    </section>
  );
}
