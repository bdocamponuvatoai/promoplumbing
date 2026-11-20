"use client";

import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { towns } from "@/content/towns";

/** Searchable list of listed communities; each links to a prefilled inquiry. */
export function AreaFinder() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const list = towns.filter((t) => t.toLowerCase().includes(needle));
  return (
    <div className="area-finder">
      <label htmlFor="town-search">Find your community</label>
      <div className="search-box">
        <Search size={20} />
        <input
          type="search"
          id="town-search"
          placeholder="Search a city, e.g. San Mateo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p className="small" aria-live="polite">
        {list.length
          ? `${list.length} listed communities. Confirm availability for your address with the team.`
          : "No listed city matches. Call the team to check your address."}
      </p>
      <div className="town-grid">
        {list.map((t) => (
          <Link key={t} href={"/contact/?city=" + encodeURIComponent(t)}>
            <MapPin size={15} />
            {t}
          </Link>
        ))}
      </div>
      {!list.length && (
        <a className="btn" href={site.phone.href}>
          Call {site.phone.display}
        </a>
      )}
    </div>
  );
}
