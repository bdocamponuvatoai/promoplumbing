import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { HeaderBar } from "./HeaderBar";

export function SiteHeader() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topline">
        <span>
          <MapPin size={14} /> San Mateo roots. Bay Area service.
        </span>
        <a href={site.phone.href}>
          Let’s talk plumbing <span>{site.phone.display}</span>
        </a>
      </div>
      <HeaderBar />
    </>
  );
}
