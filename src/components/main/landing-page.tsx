import { AnimatedGridPattern } from "@/components/common/animated-grid-pattern";
import BasicAnnouncement from "@/components/landing/basic-announcement";
import BasicCategories from "@/components/landing/basic-categories";
import { BasicFAQs } from "@/components/landing/basic-faq";
import BasicFeatures from "@/components/landing/basic-features";
import BasicHero from "@/components/landing/basic-hero";
import BasicTestimonial from "@/components/landing/basic-testimonial";
import { cn } from "@/lib/utils";

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
        {/* Testimonial */}
        <BasicTestimonial />
        {/* Faq */}
        <BasicFAQs />
      </div>
      {/* Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
    </section>
  );
}
