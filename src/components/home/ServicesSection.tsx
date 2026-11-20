import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TextLink } from "@/components/ui/TextLink";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="services-section section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FROM THE EVERYDAY TO THE UNEXPECTED</p>
          <h2>
            Small fixes.
            <br />
            Big difference.
          </h2>
        </div>
        <div>
          <p>
            From a dripping faucet to a plumbing upgrade, find the right place
            to start.
          </p>
          <TextLink href="/services/">Explore all our services</TextLink>
        </div>
      </div>
      <ServiceGrid services={services} />
    </section>
  );
}
