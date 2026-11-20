import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactCopy } from "@/components/contact/ContactCopy";
import {
  InquiryPlanner,
  InquiryPlannerFromQuery,
} from "@/components/contact/InquiryPlanner";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Start a service inquiry",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <section className="contact-page section">
      <ContactCopy />
      {/* The fallback is the default form, so the static HTML always has it. */}
      <Suspense fallback={<InquiryPlanner />}>
        <InquiryPlannerFromQuery />
      </Suspense>
    </section>
  );
}
