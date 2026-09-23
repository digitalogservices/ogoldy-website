import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
export const metadata: Metadata = {
  title: "Privacy Notice | Ogoldy",
  description:
    "How Ogoldy uses information submitted through its enterprise enquiry forms.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Privacy notice"
          title="Information submitted with an enterprise enquiry"
          intro="This notice covers the information and files submitted through the Ogoldy website enquiry form."
        />
        <section className="section-shell privacy-copy">
          <h2>What we collect</h2>
          <p>
            Company and contact details, site location, requirement details, and
            files you choose to upload such as BOQs, asset lists and site
            photographs.
          </p>
          <h2>Why we use it</h2>
          <p>
            To assess the requirement, verify scope, prepare a commercial
            response, arrange a survey where required, and communicate about the
            enquiry.
          </p>
          <h2>Website measurement</h2>
          <p>
            We record landing page, referral and campaign parameters, and
            interactions such as enquiry submissions, phone clicks, email clicks
            and calls to action. This helps us understand which services and
            sources generate genuine business enquiries. Google Analytics may
            also be used when enabled.
          </p>
          <h2>What not to upload</h2>
          <p>
            Do not upload personal identity documents, financial credentials,
            employee records, access passwords, or photographs containing
            information unrelated to the requirement.
          </p>
          <h2>Access and retention</h2>
          <p>
            Enquiry information should be accessible only to authorised Ogoldy
            personnel and service providers supporting the enquiry workflow. It
            should be retained only for the business requirement, compliance
            obligations and reasonable follow-up.
          </p>
          <h2>Contact</h2>
          <p>
            For a privacy or deletion request, email{" "}
            <a href="mailto:growth@ogoldy.com">growth@ogoldy.com</a> with enough
            information to identify the enquiry.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
