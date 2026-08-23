import { CONTACT, FAQ_SIDEBAR, FAQS, PAGE_HEADERS } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about our moving, junk removal, and donation pickup services — pricing, scheduling, what we haul, and what to expect on the day.",
  path: "/faq",
});

/** FAQ structured data — these questions are exactly what people search for. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader {...PAGE_HEADERS.faq} />
      <div className="pad mohsplit items-start">
        <FaqAccordion />
        <aside className="flex min-w-0 flex-col items-start gap-3.5 border-2 border-ink bg-navy p-[26px]">
          <Logo width={110} decorative />
          <h2 className="text-[23px] font-extrabold text-cream">
            {FAQ_SIDEBAR.heading}
          </h2>
          <p className="text-[15px] leading-[1.6] text-slate-text">
            {FAQ_SIDEBAR.body}
          </p>
          <Button href={CONTACT.phoneHref} variant="gold" size="md">
            Call {CONTACT.phone}
          </Button>
          <Button href="/estimate" variant="outlineNavy" size="md">
            Request Estimate
          </Button>
        </aside>
      </div>
    </main>
  );
}
