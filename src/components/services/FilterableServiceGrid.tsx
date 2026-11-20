"use client";

import { useState } from "react";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import {
  serviceCategories,
  services,
  type ServiceFilter,
} from "@/content/services";

export function FilterableServiceGrid() {
  const [filter, setFilter] = useState<ServiceFilter>("All services");
  const visible =
    filter === "All services"
      ? services
      : services.filter((s) => s.category === filter);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter services">
        {serviceCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </div>
      <ServiceGrid services={visible} />
    </>
  );
}
