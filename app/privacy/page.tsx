import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PageHero } from "../components/page-hero";
import { CookieSettings } from "../components/cookie-settings";
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
            photographs. When you ask Ogoldy to validate a decision-tool assessment,
            we also receive the asset context, condition, reuse readiness and horizon,
            financial estimates, unknown flags, preliminary recommendation, reasoning
            and assumptions submitted with that enquiry. The tool keeps this assessment
            in your browser session to preserve the enquiry handoff through refresh or back.
            Raw assessment inputs are not sent to Google Analytics.
          </p>
          <h2>Why we use it</h2>
          <p>
            To assess the requirement, verify scope, prepare a commercial
            response, arrange a survey where required, and communicate about the
            enquiry.
          </p>
          <h2>Site storage and analytics</h2>
          <p>Ogoldy uses strictly necessary storage to support essential site functions and remember your privacy choice. This storage is always active.</p>
          <p>We also offer optional analytics to help us understand how visitors use the website, which pages and tools are useful, and where we can improve the experience. Analytics is off unless you choose to allow it.</p>
          <h2>Your choice</h2>
          <p>On your first visit, you can reject optional analytics, manage your preferences or accept analytics. You can change your choice later at any time using <CookieSettings />.</p>
          <p>Rejecting analytics does not prevent you from using the website, submitting an enquiry, requesting an asset value estimate or using the Asset Decision Tool.</p>
          <h2>Enquiries and files</h2>
          <p>When you send us an enquiry, business details, files or an Asset Decision Tool assessment, Ogoldy may use that information to assess your requirement, respond to you and manage the related business conversation.</p>
          <p>Please only share information and files that you are authorised to provide.</p>
          <h2>Optional marketing</h2>
          <p>Marketing emails are separate from your enquiry and are optional. If you choose to receive them, Ogoldy may send occasional updates, project insights and service information.</p>
          <p>You can unsubscribe from marketing emails at any time using the unsubscribe option in the message.</p>
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
          <h2>Privacy questions and deletion requests</h2>
          <p>For privacy questions or requests relating to information you have shared with Ogoldy, including deletion requests, contact <a href="mailto:growth@ogoldy.com">growth@ogoldy.com</a>.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
