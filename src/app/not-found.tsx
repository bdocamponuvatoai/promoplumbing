import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="section page-intro">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>
        This page could not be found. Explore our plumbing services or start a
        conversation with the team.
      </p>
      <div className="hero-actions">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink variant="outline" href="/contact/">
          Contact Promo
        </ButtonLink>
      </div>
    </section>
  );
}
