import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Privacy Policy`,
  });
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-8 mx-auto pb-8">
      <PageHeader
        header={""}
        title="Privacy Policy"
        description={"Last Updated: 2025-01-10"}
      />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[60rem] prose dark:prose-invert">
          {/* Privacy Statement */}
          <h2>Privacy Statement</h2>
          <p>
            Your privacy is important to us. It is {siteConfig?.legal?.name}{" "}
            policy to respect your privacy regarding any information we may
            collect from you across our website, and other sites we own and
            operate.
          </p>
          {/* Purpose of Collecting Personal Information */}
          <h2>Purpose of Collecting Personal Information</h2>
          <p>
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we&apos;re
            collecting it and how it will be used.
          </p>
          {/* Registration Methods */}
          <h2>Registration Methods</h2>
          <p>
            You can sign up with your Google or Github account so your{" "}
            {siteConfig?.legal?.name} account username will be prefilled with
            your name and your public profile picture.
          </p>
          {/* Information Retention and Protection */}
          <h2>Information Retention and Protection</h2>
          <p>
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store,
            we&apos;ll protect within commercially acceptable means to prevent
            loss and theft, as well as unauthorised access, disclosure, copying,
            use or modification.
          </p>
          {/* Third Party Disclosure */}
          <h2>Third Party Disclosure</h2>
          <p>
            We have to share specific information provided by customers, in
            order to ensure business operates normally.
          </p>
          <ul className="list-disc px-4">
            <li>
              <span className="font-bold">Payment Processors</span> our
              cooperates with the following payment gateways/processors to
              safely process payments, store payment credentials, and prevent
              fraud.
            </li>
          </ul>
          <ul className="list-disc py-2 px-8">
            <li>
              <Link href="https://stripe.com/" target="_blank">
                Stripe
              </Link>
            </li>
          </ul>
          <p>
            You may find detailed Privacy Policies at our partners&apos;
            websites.
          </p>

          {/* Data Controller and Processor Roles */}
          <h2>Data Controller and Processor Roles</h2>
          <p>
            We act in the capacity of a data controller and a data processor
            with regard to the personal data processed through{" "}
            {siteConfig?.legal?.name} and the services in terms of the
            applicable data protection laws, including the EU General Data
            Protection Regulation (GDPR).
          </p>

          {/* External Site Links */}
          <h2>External Site Links</h2>
          <p>
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </p>

          {/* Refusal of Personal Information Request */}
          <h2>Refusal of Personal Information Request</h2>
          <p>
            You are free to refuse our request for your personal information,
            with the understanding that we may be unable to provide you with
            some of your desired services.
          </p>

          {/* Refusal of Personal Information Request */}
          <h2>Acceptance of Privacy Practices</h2>
          <p>
            Your continued use of our website will be regarded as acceptance of
            our practices around privacy and personal information. If you have
            any questions about how we handle user data and personal
            information, feel free to contact us.
          </p>
          {/* Contact Information */}
          <h2>Contact Information for Privacy Inquiries</h2>
          <p>
            If you have any questions or requests, please send an email to{" "}
            <Link
              title={siteConfig?.legal?.email}
              href={"mailto:" + siteConfig?.legal?.email}
            >
              {siteConfig?.legal?.email}
            </Link>
            .
          </p>
        </article>
      </div>
    </div>
  );
}
