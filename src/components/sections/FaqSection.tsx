import { Plus } from "lucide-react";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";

export function FaqSection() {
  return (
    <section className="faq section">
      <div>
        <p className="eyebrow">BEFORE YOU REACH OUT</p>
        <h2>
          A little clarity
          <br />
          goes a long way.
        </h2>
        <p>Good questions are always welcome.</p>
        <TextLink href={site.phone.href}>Talk with the team</TextLink>
      </div>
      <div className="faq-list">
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
