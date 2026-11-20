interface PageIntroProps {
  eyebrow: string;
  title: string;
  text: string;
}

/** Plain page header used by the services, about, service-area and privacy pages. */
export function PageIntro({ eyebrow, title, text }: PageIntroProps) {
  return (
    <section className="page-intro section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
