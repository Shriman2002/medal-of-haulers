import Link from "next/link";
import {
  BADGES,
  CONTACT,
  HERO,
  HOME_CARDS,
  PRICE_STRIP,
  SERVICE_AREAS,
  SERVICE_AREA_NOTE,
} from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Veteran-Owned Moving, Junk Removal & Donation Pickup",
  description:
    "Medal of Haulers provides veteran-owned moving, junk removal, and donation pickup across the DMV, Northern Virginia, and Richmond. Free estimates, upfront pricing.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <div className="bg-navy">
        {/* Hero: gap 0 so the two halves meet on a shared edge. */}
        <div className="mohsplit gap-0 border-b-2 border-gold">
          <div className="pad flex flex-col items-start gap-5">
            <span className="border-2 border-gold px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-gold">
              {HERO.tag}
            </span>
            <h1 className="text-hero font-extrabold leading-[1.02] tracking-[-.02em] text-cream">
              {HERO.title}
            </h1>
            <div className="h-0.5 w-[180px] bg-gold" />
            <p className="text-tagline font-extrabold uppercase tracking-[.09em] text-gold">
              {HERO.services}
            </p>
            <p className="max-w-[46ch] text-[17px] leading-[1.6] text-slate-text">
              {HERO.subline}
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Button href="/estimate" variant="gold" size="lg">
                {HERO.primaryCta}
              </Button>
              {/* Outlined on navy, but cream label rather than gold — hero only. */}
              <a
                href={CONTACT.phoneHref}
                className="inline-block border-2 border-navy-border-muted px-7 py-[19px] text-left text-[15px] font-extrabold uppercase tracking-[.06em] text-cream no-underline hover:border-gold hover:text-gold"
              >
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
          <div
            className="flex items-center justify-center p-10"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, #12203a 0%, #05101f 70%)",
            }}
          >
            <Logo width={400} className="w-full" />
          </div>
        </div>

        {/* Badge strip: the bottom border sits on the container, not the cells,
            so the rule stays unbroken when the grid wraps to two columns. */}
        <div className="mohbadges border-b-2 border-navy bg-gold">
          {BADGES.map((badge, i) => (
            <span
              key={badge}
              className={`px-5 py-[18px] text-[12px] font-extrabold uppercase tracking-[.1em] text-navy ${
                i < BADGES.length - 1 ? "border-r-2 border-navy" : ""
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <section className="pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-[18px]">
          <h2 className="text-section-h2 font-extrabold tracking-[-.015em]">
            WHAT WE DO
          </h2>
          <Link
            href="/services"
            className="text-[13px] font-extrabold uppercase tracking-[.1em] text-gold-deep no-underline hover:text-gold"
          >
            All services →
          </Link>
        </div>
        <div className="mohgrid border-2 border-ink">
          {HOME_CARDS.map((card, i) => (
            <div
              key={card.num}
              className={`flex flex-col gap-3 border-b-2 border-ink p-7 ${
                i < HOME_CARDS.length - 1 ? "border-r-2" : ""
              }`}
            >
              <PhotoPlaceholder slot={card.photo} className="h-[150px] p-2.5" />
              <span className="text-[11px] font-extrabold tracking-[.18em] text-gold-deep">
                {card.num}
              </span>
              <h3 className="text-[24px] font-extrabold">{card.title}</h3>
              <p className="text-[15px] leading-[1.6] text-ink-70">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mohgrid border-y-2 border-gold bg-navy">
        {PRICE_STRIP.map((item, i) => (
          <div
            key={item.label}
            className={`px-[clamp(20px,3vw,32px)] py-[34px] ${
              i < PRICE_STRIP.length - 1 ? "border-r-2 border-navy-rule" : ""
            }`}
          >
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-slate-muted">
              {item.label}
            </div>
            <div className="text-price font-extrabold tracking-[-.02em] text-gold">
              {item.figure}
            </div>
          </div>
        ))}
      </div>

      <section className="pad mohsplit items-start">
        <div>
          <h2 className="mb-4 text-section-h2-sm font-extrabold tracking-[-.015em]">
            WHERE WE WORK
          </h2>
          <div className="mb-5 h-0.5 bg-ink" />
          <ul className="list-none">
            {SERVICE_AREAS.map((area, i) => (
              <li
                key={area}
                className={`py-3.5 text-[16px] font-semibold ${
                  i < SERVICE_AREAS.length - 1
                    ? "border-b-2 border-hatch-a"
                    : ""
                }`}
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] leading-[1.6] text-ink-70">
            {SERVICE_AREA_NOTE}
          </p>
        </div>
        <PhotoPlaceholder slot="homeMap" className="min-h-[300px] p-3.5" />
      </section>
    </main>
  );
}
