import { Check, MapPin, Phone, Wrench } from "lucide-react";
import Image from "next/image";
import { photos } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/config/site";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <Eyebrow>PLUMBING, WITH PEOPLE IN MIND</Eyebrow>
        <h1>
          Good plumbing.
          <br />
          <em>Better days.</em>
        </h1>
        <p className="hero-description">
          For the place you call home.
          <br />
          For the business you’re building.
          <br />
          Your local plumbing team in San Mateo.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/contact/">
            Let’s talk about your plumbing
          </ButtonLink>
          <a href={site.phone.href} className="phone-link">
            <Phone size={18} />
            {site.phone.display}
          </a>
        </div>
        <div className="hero-footnote">
          <span>
            <Check size={16} /> Residential & commercial
          </span>
          <span>
            <MapPin size={16} /> San Mateo & the Bay Area
          </span>
        </div>
      </div>
      <div className="hero-photo">
        <Image
          src={photos.hero}
          alt="Illustrative scene of a plumbing professional checking a kitchen faucet"
          loading="eager"
          fetchPriority="high"
        />
        <div className="photo-label">
          <span className="label-icon">
            <Wrench size={22} />
          </span>
          <div>
            <strong>
              The right care.
              <br />
              Right where you need it.
            </strong>
            <span>Repairs · Installation · Maintenance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
