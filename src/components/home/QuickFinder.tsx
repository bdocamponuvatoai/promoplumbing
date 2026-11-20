"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/content/services";

/** "What can we help with?" picker that preselects the inquiry service. */
export function QuickFinder() {
  const [selected, setSelected] = useState(services[0].slug);
  return (
    <div className="quick-finder">
      <div>
        <span className="eyebrow">LET’S START WITH YOUR PLUMBING</span>
        <h2>What can we help with?</h2>
      </div>
      <div className="finder-control">
        <label className="sr-only" htmlFor="service-quick">
          Choose a service
        </label>
        <div className="select-wrap">
          <select
            id="service-quick"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="not-sure">I’m not sure yet</option>
          </select>
          <ChevronDown size={18} />
        </div>
        <ButtonLink variant="dark" href={`/contact/?service=${selected}`}>
          Let’s get started
        </ButtonLink>
      </div>
    </div>
  );
}
