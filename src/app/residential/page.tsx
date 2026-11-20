import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience/AudiencePage";
import { audiences } from "@/content/audiences";
import { pageMetadata } from "@/lib/metadata";

const audience = audiences.residential;

export const metadata: Metadata = pageMetadata({
  title: audience.metaTitle,
  path: audience.path,
});

export default function ResidentialPage() {
  return <AudiencePage audience={audience} />;
}
