import { Phone } from "lucide-react";
import Image from "next/image";
import { mark } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/config/site";

export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-mark" aria-hidden="true">
        <Image src={mark} alt="" />
      </div>
      <div>
        <p className="eyebrow">A BETTER DAY STARTS HERE</p>
        <h2>
          Let’s get things
          <br />
          flowing again.
        </h2>
      </div>
      <div className="cta-actions">
        <ButtonLink variant="white" href="/contact/">
          Tell us what you need
        </ButtonLink>
        <a href={site.phone.href}>
          <Phone size={18} />
          {site.phone.display}
        </a>
      </div>
    </section>
  );
}
