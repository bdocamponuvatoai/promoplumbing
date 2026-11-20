// Framework-free helpers for the inquiry planner: preset parsing, the plain
// text summary and the mailto: link. Nothing here is sent anywhere.
import { site } from "@/config/site";
import {
  NOT_SURE,
  NOT_SURE_LABEL,
  timingOptions,
  type PropertyType,
} from "@/content/inquiry";
import { getService } from "@/content/services";

export interface InquiryPreset {
  service: string;
  property: PropertyType;
  city: string;
}

export const defaultPreset: InquiryPreset = {
  service: NOT_SURE,
  property: "Home",
  city: "",
};

interface SearchParamsLike {
  get(name: string): string | null;
}

/** Reads `?service=`, `?property=` and `?city=`, ignoring invalid values. */
export function parsePreset(params: SearchParamsLike): InquiryPreset {
  const service = params.get("service");
  const city = params.get("city");
  return {
    service: service && getService(service) ? service : NOT_SURE,
    property: params.get("property") === "Business" ? "Business" : "Home",
    city: city ? city.slice(0, 100) : "",
  };
}

export function presetKey(preset: InquiryPreset): string {
  return `${preset.service}|${preset.property}|${preset.city}`;
}

export interface InquiryJob {
  service: string;
  city: string;
  timing: string;
  details: string;
}

export interface InquiryContact {
  name: string;
  email: string;
  phone: string;
}

export interface Inquiry extends InquiryJob, InquiryContact {
  property: PropertyType;
}

export const emptyJob: InquiryJob = {
  service: NOT_SURE,
  city: "",
  timing: timingOptions[0],
  details: "",
};

export const emptyContact: InquiryContact = { name: "", email: "", phone: "" };

export function serviceLabel(slug: string): string {
  return getService(slug)?.title || NOT_SURE_LABEL;
}

export function buildSummary(inquiry: Inquiry): string {
  return `Service inquiry for Promo Plumbing\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || "Not provided"}\nProperty: ${inquiry.property}\nCity: ${inquiry.city}\nService: ${serviceLabel(inquiry.service)}\nTiming preference: ${inquiry.timing}\n\nAbout the job:\n${inquiry.details || "I would like to discuss this with the team."}\n\nPlease contact me to discuss the scope and availability. I understand this is an inquiry, not a confirmed booking.`;
}

export function buildMailtoHref(inquiry: Inquiry): string {
  return (
    "mailto:" +
    site.email +
    "?subject=" +
    encodeURIComponent("Plumbing inquiry — " + serviceLabel(inquiry.service)) +
    "&body=" +
    encodeURIComponent(buildSummary(inquiry))
  );
}

/** Reads a form field as a string ("" when missing). */
export function field(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}
