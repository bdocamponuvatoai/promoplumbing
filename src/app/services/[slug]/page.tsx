import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  MoreServices,
  ServiceDetailContent,
  ServiceDetailHero,
} from "@/components/services/ServiceDetail";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} />
      <MoreServices current={service} />
      <CtaSection />
    </>
  );
}
