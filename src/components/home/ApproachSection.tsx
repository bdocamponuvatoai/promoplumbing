import { Check, Phone, Wrench } from "lucide-react";
import { TextLink } from "@/components/ui/TextLink";

export function ApproachSection() {
  return (
    <section className="approach section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LOCAL PEOPLE. STRAIGHTFORWARD SERVICE.</p>
          <h2>
            Less guesswork.
            <br />A clearer next step.
          </h2>
        </div>
        <div>
          <p>
            Led by Moe Veimau, Promo Plumbing serves homeowners and businesses
            from its San Mateo base.
          </p>
          <TextLink href="/about/">Get to know Promo</TextLink>
        </div>
      </div>
      <div className="approach-grid">
        <div>
          <span className="approach-icon">
            <Phone />
          </span>
          <h3>Start with a conversation.</h3>
          <p>
            Tell us what’s happening, where you are and what you need help with.
          </p>
        </div>
        <div>
          <span className="approach-icon">
            <Wrench />
          </span>
          <h3>Get clear on the work.</h3>
          <p>Discuss the scope, access, timing and estimate with the team.</p>
        </div>
        <div>
          <span className="approach-icon">
            <Check />
          </span>
          <h3>Plan your next step.</h3>
          <p>
            Agree on the details directly before any appointment is confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
