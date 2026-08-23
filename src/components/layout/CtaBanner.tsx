import { CONTACT, CTA_BANNER } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-7 border-t-2 border-navy bg-gold px-[clamp(20px,4vw,52px)] py-11">
      <div>
        <h2 className="mb-1.5 text-banner font-extrabold tracking-[-.02em] text-navy">
          {CTA_BANNER.heading}
        </h2>
        <p className="text-[16px] font-semibold text-gold-shadow">
          {CTA_BANNER.body}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="/estimate" variant="navy" size="lg">
          {CTA_BANNER.primary}
        </Button>
        {/* Outlined navy-on-gold: only place the outline sits on a gold surface. */}
        <a
          href={CONTACT.phoneHref}
          className="inline-block border-2 border-navy px-[26px] py-[19px] text-left text-[15px] font-extrabold uppercase tracking-[.06em] text-navy no-underline hover:bg-gold-light"
        >
          {CTA_BANNER.secondary}
        </a>
      </div>
    </section>
  );
}
