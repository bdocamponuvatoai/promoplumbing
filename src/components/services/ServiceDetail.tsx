import { Check, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { services, type Service } from "@/content/services";

export function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section className="detail-hero section">
      <div>
        <Link className="breadcrumb" href="/services/">
          All plumbing services
        </Link>
        <span className="detail-icon">
          <ServiceIcon name={service.icon} />
        </span>
        <p className="eyebrow">PROMO PLUMBING · SAN MATEO</p>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <ButtonLink href={`/contact/?service=${service.slug}`}>
          Ask about this service
        </ButtonLink>
        <a className="phone-link" href={site.phone.href}>
          <Phone size={17} />
          {site.phone.display}
        </a>
      </div>
      <figure>
        <Image
          src={photos[service.image]}
          alt={
            "Illustrative plumbing environment for " +
            service.title.toLowerCase()
          }
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Illustrative service imagery</figcaption>
      </figure>
    </section>
  );
}

export function ServiceDetailContent({ service }: { service: Service }) {
  return (
    <section className="detail-content section">
      <div>
        <p className="eyebrow">LET’S TALK ABOUT THE JOB</p>
        <h2>
          A useful place
          <br />
          to start.
        </h2>
        <p>{service.note}</p>
      </div>
      <div className="included">
        <h3>Services to discuss</h3>
        {service.items.map((item) => (
          <p key={item}>
            <Check size={20} />
            {item}
          </p>
        ))}
        <div className="soft-note">
          The team will confirm the scope, pricing and scheduling for your
          property before you proceed.
        </div>
      </div>
    </section>
  );
}

export function MoreServices({ current }: { current: Service }) {
  const others = services.filter((s) => s.slug !== current.slug).slice(0, 3);
  return (
    <section className="section more-services">
      <div className="section-heading">
        <h2>
          Something else
          <br />
          on your list?
        </h2>
        <TextLink href="/services/">View every service</TextLink>
      </div>
      <div className="related-links">
        {others.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}/`}>
            <ServiceIcon name={s.icon} />
            <span>{s.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
