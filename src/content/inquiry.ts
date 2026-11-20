// Copy and options for the three-step inquiry planner.

export const plannerSteps = [
  {
    label: "Your job",
    title: "What needs attention?",
    intro: "A few details make for a better first conversation.",
  },
  {
    label: "Your details",
    title: "How can the team reach you?",
    intro: "Add your contact details, then review everything before sharing.",
  },
  {
    label: "Review & share",
    title: "Your inquiry is ready.",
    intro: "Review the details below. Nothing has been sent yet.",
  },
] as const;

export const propertyTypes = ["Home", "Business"] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const timingOptions = [
  "As soon as available",
  "Within the next week",
  "Planning a future project",
  "Just exploring options",
] as const;

/** Select value used when the visitor is not sure which service they need. */
export const NOT_SURE = "not-sure";

export const NOT_SURE_LABEL = "Help identifying the right service";
