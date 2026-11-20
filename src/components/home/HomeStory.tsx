import { House, Wrench } from "lucide-react";
import Image from "next/image";
import { photos } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomeStory() {
  return (
    <section className="home-story section">
      <div className="story-image">
        <Image
          src={photos.home}
          alt="Illustrative light-filled bathroom with oak vanity and brushed nickel fixtures"
        />
        <span className="image-caption">
          Spaces that work beautifully. Illustrative imagery.
        </span>
      </div>
      <div className="story-copy">
        <p className="eyebrow">YOUR HOME. YOUR EVERYDAY.</p>
        <h2>
          We’re here for
          <br />
          the way you live.
        </h2>
        <p>
          The shower before work. The kitchen after dinner. The plumbing you
          count on without a second thought.
        </p>
        <p>
          When something needs attention, Promo Plumbing helps you take the next
          step—from a repair today to an upgrade you’ve been planning.
        </p>
        <ButtonLink variant="dark" href="/residential/">
          Plumbing for your home
        </ButtonLink>
        <div className="story-chips">
          <span>
            <House size={18} /> Thoughtful repairs
          </span>
          <span>
            <Wrench size={18} /> Practical upgrades
          </span>
        </div>
      </div>
    </section>
  );
}
