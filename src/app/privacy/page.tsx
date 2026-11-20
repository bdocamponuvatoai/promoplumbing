import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { mailtoHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy & this preview",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE TRANSPARENCY"
        title="Your details stay yours."
        text="How this design preview handles information."
      />
      <article className="prose section">
        <h2>The service inquiry</h2>
        <p>
          The inquiry planner keeps your entries in the current page’s memory.
          It does not send them to a server or save them after you leave or
          reload the page.
        </p>
        <p>
          “Open email draft” passes your inquiry to your own email application.
          You choose whether to send it to Promo Plumbing. “Copy details” uses
          your clipboard, and “Download details” saves a text file to your
          device.
        </p>
        <h2>Calls and external links</h2>
        <p>
          Telephone and email links open the appropriate application on your
          device. Third-party websites and applications handle data under their
          own policies.
        </p>
        <h2>About this preview</h2>
        <p>
          This is a proposed website design, with illustrative AI-generated
          photography and proposed branding. The imagery is not an actual
          project portfolio or a depiction of the company’s staff. The preview
          does not confirm appointments or provide live estimates.
        </p>
        <p>
          Business contact information and service descriptions were checked
          against the company’s published website and an Alameda County
          contractor listing on November 20, 2026. Confirm availability and the
          details of any work directly with the company.
        </p>
        <h2>Questions?</h2>
        <p>
          Contact Promo Plumbing at <a href={mailtoHref}>{site.email}</a> or{" "}
          <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
      </article>
    </>
  );
}
