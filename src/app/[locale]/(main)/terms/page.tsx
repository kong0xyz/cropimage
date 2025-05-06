import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Terms of Service`,
  });
}

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-8 mx-auto">
      <PageHeader
        header={""}
        title="Terms of Service"
        description={"Last Updated: 2025-01-10"}
      />

      <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
        <article className="mx-auto max-w-[60rem] prose dark:prose-invert">
          {/* Introduction */}
          <h2>Introduction</h2>
          <p>
            By using {siteConfig?.legal?.name} Services you confirm your
            acceptance of, and agree to be bound by, these terms and conditions.
          </p>

          {/* Agreement to Terms and Conditions */}
          <h2>Agreement to Terms and Conditions</h2>
          <p>
            This Agreement takes effect on the date on which you first use the{" "}
            {siteConfig?.legal?.name} Services.
          </p>

          {/* Service License */}
          {/* <h2>Service License</h2>
          <p>
            This license operates on one-time payments, no subscriptions needed.{" "}
            {siteConfig?.legal?.name}
            reserves the right to adjust or terminate this license at its
            discretion, providing flexibility in managing service offerings and
            adapting to changing conditions.
          </p>
          <p>
            By choosing the {siteConfig?.legal?.name} Pro Service License, users
            agree to the terms outlined and acknowledge the provider&apos;s
            right to make adjustments to optimize service delivery and user
            experience.
          </p> */}

          {/* Refunds */}
          {/* <h2>Refunds</h2>
          <p>
            Due to the nature of digital products, the {siteConfig?.legal?.name}{" "}
            Services cannot be refunded or exchanged once access is granted.
          </p> */}

          {/* Disclaimer */}
          <h2>Disclaimer</h2>
          <p>
            It is not warranted that {siteConfig?.legal?.name} will meet your
            requirements or that its operation will be uninterrupted or
            error-free. All express and implied warranties or conditions not
            stated in this Agreement (including without limitation, loss of
            profits, loss or corruption of data, business interruption, or loss
            of contracts), so far as such exclusion or disclaimer is permitted
            under the applicable law, are excluded and expressly disclaimed.
            This Agreement does not affect your statutory rights.
          </p>

          {/* Warranties and Limitation of Liability */}
          <h2>Warranties and Limitation of Liability</h2>
          <p>
            {siteConfig?.legal?.name} does not give any warranty, guarantee, or
            other term as to the quality, fitness for purpose, or otherwise of
            the software. {siteConfig?.legal?.name} shall not be liable to you
            by reason of any representation (unless fraudulent), or any implied
            warranty, condition, or other term, or any duty at common law, for
            any loss of profit or any indirect, special, or consequential loss,
            damage, costs, expenses, or other claims (whether caused by{" "}
            {siteConfig?.legal?.name} negligence or the negligence of its
            servants or agents or otherwise) which arise out of or in connection
            with the provision of any goods or services by{" "}
            {siteConfig?.legal?.name}. {siteConfig?.legal?.name} shall not be
            liable or deemed to be in breach of contract by reason of any delay
            in performing, or failure to perform, any of its obligations if the
            delay or failure was due to any cause beyond its reasonable control.
            Notwithstanding contrary clauses in this Agreement, in the event
            that {siteConfig?.legal?.name} are deemed liable to you for breach
            of this Agreement, you agree that {siteConfig?.legal?.name}&apos;s
            liability is limited to the amount actually paid by you for your
            services or software, which amount calculated in reliance upon this
            clause. You hereby release {siteConfig?.legal?.name}
            from any and all obligations, liabilities, and claims in excess of
            this limitation.
          </p>

          {/* Responsibilities */}
          <h2>Responsibilities</h2>
          <p>
            {siteConfig?.legal?.name} is not responsible for what the user does
            with the user-generated content.
          </p>

          {/* Price Adjustments */}
          <h2>Price Adjustments</h2>
          <p>
            As we continue to improve {siteConfig?.legal?.name} and expand our
            offerings, the price may increase. The discount is provided to help
            customers secure the current price without being surprised by future
            increases.
          </p>

          {/*  */}
          <h2>General Terms and Law</h2>
          <p>
            You acknowledge that no joint venture, partnership, employment, or
            agency relationship exists between you and {siteConfig?.legal?.name}{" "}
            as a result of your use of these services. You agree not to hold
            yourself out as a representative, agent, or employee of{" "}
            {siteConfig?.legal?.name}. You agree that {siteConfig?.legal?.name}{" "}
            will not be liable by reason of any representation, act, or omission
            to act by you.
          </p>
        </article>
      </div>
    </div>
  );
}
