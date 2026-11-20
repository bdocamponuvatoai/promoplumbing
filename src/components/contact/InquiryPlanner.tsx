"use client";

import {
  Building2,
  Check,
  ChevronDown,
  Copy,
  Download,
  House,
  Mail,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { site } from "@/config/site";
import {
  NOT_SURE,
  plannerSteps,
  propertyTypes,
  timingOptions,
  type PropertyType,
} from "@/content/inquiry";
import { services } from "@/content/services";
import {
  buildMailtoHref,
  buildSummary,
  defaultPreset,
  emptyContact,
  emptyJob,
  field,
  parsePreset,
  presetKey,
  serviceLabel,
  type Inquiry,
  type InquiryContact,
  type InquiryJob,
  type InquiryPreset,
} from "@/lib/inquiry";

/**
 * Three-step inquiry planner. Nothing is sent anywhere: the visitor reviews
 * the inquiry, then opens it as an email draft, copies it or downloads it.
 * Both form steps stay mounted (hidden) so entered values survive "Back".
 */
export function InquiryPlanner({
  preset = defaultPreset,
}: {
  preset?: InquiryPreset;
}) {
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState<PropertyType>(preset.property);
  const [job, setJob] = useState<InquiryJob>({
    ...emptyJob,
    service: preset.service,
    city: preset.city,
  });
  const [contact, setContact] = useState<InquiryContact>(emptyContact);
  const [feedback, setFeedback] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const inquiry: Inquiry = { property, ...job, ...contact };

  function goTo(next: number) {
    flushSync(() => {
      setStep(next);
      setFeedback("");
    });
    headingRef.current?.focus();
  }

  function readValidForm(event: FormEvent<HTMLFormElement>): FormData | null {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return null;
    }
    return new FormData(form);
  }

  function submitJob(event: FormEvent<HTMLFormElement>) {
    const data = readValidForm(event);
    if (!data) return;
    setJob({
      service: field(data, "service"),
      city: field(data, "city"),
      timing: field(data, "timing"),
      details: field(data, "details"),
    });
    goTo(1);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    const data = readValidForm(event);
    if (!data) return;
    setContact({
      name: field(data, "name"),
      email: field(data, "email"),
      phone: field(data, "phone"),
    });
    goTo(2);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildSummary(inquiry));
      setFeedback("Copied. You can paste this into a message to the team.");
    } catch {
      setFeedback(
        "Copy is unavailable here. Use Download details to save your inquiry.",
      );
    }
  }

  function download() {
    const blob = new Blob([buildSummary(inquiry)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "promo-plumbing-inquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(
      "Your inquiry file is ready. It has not been sent to the team.",
    );
  }

  return (
    <div className="planner">
      <ol className="planner-progress" aria-label="Inquiry progress">
        {plannerSteps.map((s, i) => (
          <li
            key={s.label}
            aria-current={step === i ? "step" : undefined}
            className={i <= step ? "active" : ""}
          >
            <span>{i < step ? <Check size={14} /> : i + 1}</span>
            {s.label}
          </li>
        ))}
      </ol>
      <h2 ref={headingRef} tabIndex={-1}>
        {plannerSteps[step].title}
      </h2>
      <p className="planner-intro">{plannerSteps[step].intro}</p>

      <form hidden={step !== 0} onSubmit={submitJob}>
        <fieldset>
          <legend>This is for my</legend>
          <div className="choice-grid">
            {propertyTypes.map((v) => (
              <label
                className={property === v ? "choice selected" : "choice"}
                key={v}
              >
                <input
                  type="radio"
                  name="property"
                  checked={property === v}
                  value={v}
                  onChange={() => setProperty(v)}
                />
                {v === "Home" ? <House /> : <Building2 />}
                <span>{v}</span>
                <span className="radio-mark" />
              </label>
            ))}
          </div>
        </fieldset>
        <label htmlFor="service">What can we help with?</label>
        <div className="select-wrap">
          <select id="service" name="service" defaultValue={preset.service}>
            <option value={NOT_SURE}>Help me work it out</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
        <label htmlFor="city">
          Property city <span>(required)</span>
        </label>
        <input
          id="city"
          name="city"
          defaultValue={preset.city}
          required
          maxLength={100}
          autoComplete="address-level2"
          placeholder="e.g. San Mateo"
        />
        <label htmlFor="timing">When are you looking for help?</label>
        <div className="select-wrap">
          <select id="timing" name="timing" defaultValue={timingOptions[0]}>
            {timingOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
        <label htmlFor="details">
          Tell us a little about it <span>(optional)</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          maxLength={1200}
          placeholder="What have you noticed? Is this a repair or a planned project?"
        />
        <p className="small">
          Timing is a preference. The team will confirm availability directly.
        </p>
        <button className="btn" type="submit">
          Continue to your details
        </button>
      </form>

      <form hidden={step !== 1} onSubmit={submitContact}>
        <label htmlFor="name">
          Your name <span>(required)</span>
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
        />
        <label htmlFor="reply">
          Email address <span>(required)</span>
        </label>
        <input
          id="reply"
          name="email"
          type="email"
          required
          maxLength={180}
          autoComplete="email"
        />
        <label htmlFor="contact-phone">
          Phone number <span>(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          maxLength={40}
          autoComplete="tel"
        />
        <div className="privacy-note">
          <Mail size={20} />
          <p>
            These details stay in this page until you choose to share them. The
            next step opens a draft in your own email app.
          </p>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => goTo(0)}
          >
            Back
          </button>
          <button className="btn" type="submit">
            Review my inquiry
          </button>
        </div>
      </form>

      {step === 2 && (
        <div>
          <dl className="review-details">
            <div>
              <dt>Property</dt>
              <dd>
                {inquiry.property} in {inquiry.city}
              </dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{serviceLabel(inquiry.service)}</dd>
            </div>
            <div>
              <dt>Preferred timing</dt>
              <dd>{inquiry.timing}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                {inquiry.name}
                <br />
                {inquiry.email}
                {inquiry.phone && (
                  <>
                    <br />
                    {inquiry.phone}
                  </>
                )}
              </dd>
            </div>
            {inquiry.details && (
              <div>
                <dt>Your notes</dt>
                <dd>{inquiry.details}</dd>
              </div>
            )}
          </dl>
          <a className="btn email-draft" href={buildMailtoHref(inquiry)}>
            <Mail size={18} /> Open email draft
          </a>
          <p className="small">
            Your email app will open a draft to {site.email}. You still need to
            send it. No email app? Copy or download your details, then contact
            the team directly.
          </p>
          <div className="summary-tools">
            <button type="button" onClick={copy}>
              <Copy size={16} /> Copy details
            </button>
            <button type="button" onClick={download}>
              <Download size={16} /> Download details
            </button>
          </div>
          <p className="feedback" role="status">
            {feedback}
          </p>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => goTo(1)}
            >
              Edit contact details
            </button>
            <button
              type="button"
              className="text-button"
              onClick={() => goTo(0)}
            >
              Edit your job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Applies `?service=`, `?property=` and `?city=` presets. Reading search
 * params opts this subtree into client rendering, so the page wraps it in
 * <Suspense fallback={<InquiryPlanner />}> to keep the form in the static HTML.
 */
export function InquiryPlannerFromQuery() {
  const preset = parsePreset(useSearchParams());
  return <InquiryPlanner key={presetKey(preset)} preset={preset} />;
}
