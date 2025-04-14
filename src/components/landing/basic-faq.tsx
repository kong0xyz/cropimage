"use client";
import { FaqSection } from "@/components/common/faq";

import { faqTitle, faqDescription, faqs } from "@/config/landing-page";

export function BasicFAQs() {
  return (
    <FaqSection
      title={faqTitle}
      description={faqDescription}
      items={faqs}
      contactInfo={{
        title: "Still have questions?",
        description: "We're here to help you",
        buttonText: "Contact Support",
      }}
    />
  );
}
