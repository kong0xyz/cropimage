import {
  features,
  featureTitle,
  featureDescription,
} from "@/config/landing-page";

import { FeaturesSectionWithHoverEffects } from "../common/feature-section-with-hover-effects";

export default function BasicFeatures() {
  return (
    <section>
      <div className="flex flex-col items-center gap-4 text-center container mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center gap-4 px-4 pb-6">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {featureTitle}
          </h2>
          <p className="max-w-[600px] text-md font-medium text-muted-foreground sm:text-xl">
            {featureDescription}
          </p>
        </div>
        <FeaturesSectionWithHoverEffects features={features} />
      </div>
    </section>
  );
}
