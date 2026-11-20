import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AreaTeaser() {
  return (
    <section className="area-teaser section">
      <div className="local-word" aria-hidden="true">
        Your
        <br />
        local.
      </div>
      <div>
        <p className="eyebrow">BASED IN SAN MATEO</p>
        <h2>
          A familiar name.
          <br />
          Right here in the Bay.
        </h2>
        <p>
          San Mateo. Burlingame. Foster City. Belmont. And communities across
          the Bay Area.
        </p>
        <ButtonLink variant="outline" href="/service-area/">
          Find your community
        </ButtonLink>
      </div>
      <div className="local-stamp">
        <MapPin size={28} />
        <span>
          SAN MATEO
          <br />
          CALIFORNIA
        </span>
      </div>
    </section>
  );
}
