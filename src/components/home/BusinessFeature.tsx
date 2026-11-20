import { Building2 } from "lucide-react";
import Image from "next/image";
import { photos } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BusinessFeature() {
  return (
    <section className="business-feature">
      <Image
        src={photos.business}
        alt="Illustrative California cafe interior with a clean preparation sink"
      />
      <div className="business-panel">
        <span className="icon-box">
          <Building2 />
        </span>
        <p className="eyebrow">FOR THE BUSINESS YOU’RE BUILDING</p>
        <h2>
          You keep things moving.
          <br />
          So should your plumbing.
        </h2>
        <p>
          Repairs, installations and ongoing maintenance for commercial spaces.
          Let’s talk about your property, your schedule and what the job needs.
        </p>
        <ButtonLink variant="white" href="/commercial/">
          Explore commercial plumbing
        </ButtonLink>
      </div>
    </section>
  );
}
