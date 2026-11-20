import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience/AudiencePage";
import { audiences } from "@/content/audiences";
import { pageMetadata } from "@/lib/metadata";

const audience = audiences.commercial;

export const metadata: Metadata = pageMetadata({
  title: audience.metaTitle,
  path: audience.path,
});

export default function CommercialPage() {
  return <AudiencePage audience={audience} />;
}
