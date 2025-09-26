import { FeatureSimple } from "@/components/blocks/feature-simple";
import { FeatureTabs } from "@/components/blocks/feature-tabs";
import BasicAnnouncement from "@/components/landing/basic-announcement";
import BasicCategories from "@/components/landing/basic-categories";
import { BasicFAQs } from "@/components/landing/basic-faq";
import BasicFeatures from "@/components/landing/basic-features";
import BasicHero from "@/components/landing/basic-hero";
import BasicTestimonial from "@/components/landing/basic-testimonial";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 md:pt-16">
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
          <FeatureSimple
            badge="Image"
            title="Decoration Design"
            description="Features description"
            imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80"
            imageAlt="Features"
            actions={
              <>
                <Button size="lg">Try Now</Button>
                <Button variant="outline" size="lg">Try Now</Button>
              </>
            }
          />
          <FeatureSimple
            badge="Image"
            title="Dress Up"
            description="Features description"
            imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80"
            imageAlt="Features"
            actions={
              <>
                <Button size="lg">Try Now</Button>
                <Button variant="outline" size="lg">Try Now</Button>
              </>
            }
            reverse
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
