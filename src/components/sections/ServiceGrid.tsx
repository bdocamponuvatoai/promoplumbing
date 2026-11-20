import { Plus } from "lucide-react";
import Link from "next/link";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/content/services";

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}/`} className="service-card">
      <div className="service-card-top">
        <span className="icon-box">
          <ServiceIcon name={service.icon} />
        </span>
        <span className="round-plus">
          <Plus size={21} />
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <span className="service-link">Explore service</span>
    </Link>
  );
}

/** Grid of service cards. Shared by the home page and the filterable directory. */
export function ServiceGrid({ services }: { services: readonly Service[] }) {
  return (
    <div className="service-grid" aria-live="polite">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
