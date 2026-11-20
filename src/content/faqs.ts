interface Faq {
  question: string;
  answer: string;
}

export const faqs: readonly Faq[] = [
  {
    question: "What kind of plumbing work can I ask about?",
    answer:
      "Promo Plumbing handles residential and commercial plumbing, including repairs, drain cleaning, water heaters, fixtures, repiping and maintenance. Share the issue or project so the team can confirm the right service.",
  },
  {
    question: "Do you work with homes and businesses?",
    answer:
      "Yes. Promo Plumbing serves residential and commercial customers. Include the property type and any access or operating-hour requirements in your inquiry.",
  },
  {
    question: "Where do you work?",
    answer:
      "Promo Plumbing is based in San Mateo and lists service across San Mateo County and other Bay Area communities. Check the service-area page, then confirm availability for your address directly with the team.",
  },
  {
    question: "Can I book a confirmed appointment here?",
    answer:
      "You can prepare a service inquiry and open it in your email app, or call the team directly. An appointment is only confirmed once Promo Plumbing agrees on the details with you.",
  },
  {
    question: "How is the work priced?",
    answer:
      "Pricing depends on the issue, the property and the work involved. Ask the team to discuss the scope and estimate before deciding how to proceed. This website does not provide an instant price.",
  },
];
