import { Mail, MapPin, Phone } from "lucide-react";
import { mailtoHref, site } from "@/config/site";

export function ContactCopy() {
  return (
    <div className="contact-copy">
      <p className="eyebrow">LET’S GET STARTED</p>
      <h1>
        What can we
        <br />
        <em>help you with?</em>
      </h1>
      <p>
        A repair, an upgrade, or a question about your plumbing. Tell us a
        little about it.
      </p>
      <div className="contact-options">
        <a href={site.phone.href}>
          <Phone />
          <span>
            <small>Prefer a conversation?</small>
            <strong>{site.phone.display}</strong>
          </span>
        </a>
        <a href={mailtoHref}>
          <Mail />
          <span>
            <small>Email the team</small>
            <strong>{site.email}</strong>
          </span>
        </a>
        <div>
          <MapPin />
          <span>
            <small>Based in</small>
            <strong>San Mateo, California</strong>
          </span>
        </div>
      </div>
      <div className="contact-note">
        <h3>Need to discuss something now?</h3>
        <p>
          Call the team directly to check availability. Online inquiries are not
          monitored as an emergency service.
        </p>
      </div>
    </div>
  );
}
