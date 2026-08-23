import { PAGE_HEADERS, PRICING_DISCLAIMER, PRICING_PANELS } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Moving from a $100 base plus hourly, junk removal from $100 base plus per item, donation pickup from $50 base. Upfront pricing, free estimates.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <PageHeader {...PAGE_HEADERS.pricing} />
      <div className="pad">
        {PRICING_PANELS.map((panel, i) => (
          <div
            key={panel.label}
            // Panels share one continuous border: drop the top rule after the
            // first so adjacent edges don't double to 4px.
            className={`mohsplit gap-0 border-2 border-ink ${i > 0 ? "border-t-0" : ""}`}
          >
            <div
              className={`p-[30px] ${panel.tone === "gold" ? "bg-gold" : "bg-navy"}`}
            >
              <span
                className={`text-[11px] font-extrabold uppercase tracking-[.18em] ${
                  panel.tone === "gold" ? "text-gold-shadow" : "text-slate-muted"
                }`}
              >
                {panel.label}
              </span>
              <div
                className={`mt-2.5 text-figure font-extrabold leading-[1.05] tracking-[-.02em] ${
                  panel.tone === "gold" ? "text-navy" : "text-gold"
                }`}
              >
                {panel.figure}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 p-[30px]">
              <p className="text-[16px] leading-[1.65] text-ink-70">
                {panel.paragraphs[0]}
              </p>
              {panel.factors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {panel.factors.map((factor) => (
                    <span
                      key={factor}
                      className="border-2 border-ink px-[11px] py-2 text-[12px] font-extrabold uppercase tracking-[.08em]"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="text-[16px] leading-[1.65] text-ink-70">
                {panel.paragraphs[1]}
              </p>
              <Button href="/estimate" variant="navy">
                {panel.cta}
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-6 border-l-2 border-gold-deep bg-gold-tint px-5 py-4">
          <p className="text-[13.5px] leading-[1.6] text-ink-70">
            {PRICING_DISCLAIMER}
          </p>
        </div>
      </div>
    </main>
  );
}
