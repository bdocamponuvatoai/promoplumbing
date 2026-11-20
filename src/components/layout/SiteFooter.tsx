import { Phone } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { TextLink } from "@/components/ui/TextLink";
import { footerNav, mailtoHref, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <Brand width={230} height={62} />
        <p>
          Local people.
          <br />
          Plumbing that keeps life moving.
        </p>
        <a className="footer-phone" href={site.phone.href}>
          {site.phone.display}
        </a>
      </div>
      <div className="footer-grid">
        <div>
          <h3>Let’s talk</h3>
          <a href={mailtoHref}>{site.email}</a>
          <p>San Mateo, California</p>
          <Link href="/service-area/">Find your service area</Link>
        </div>
        <div>
          <h3>What we do</h3>
          {footerNav.whatWeDo.map(({ label, href }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Who we help</h3>
          {footerNav.whoWeHelp.map(({ label, href }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-note">
          <h3>A good place to start.</h3>
          <p>
            Tell us what’s happening. We’ll take the next conversation from
            there.
          </p>
          <TextLink href={site.phone.href}>
            <Phone size={16} /> Call the team
          </TextLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Promo Plumbing Inc.</span>
        <Link href="/privacy/">Privacy</Link>
        <a href="#top">Back to top</a>
        <span>Design concept by Nuvato</span>
      </div>
    </footer>
  );
}
