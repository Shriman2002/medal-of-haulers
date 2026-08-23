"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT, PAGES } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

/** Request Estimate is the CTA button, so it stays out of the nav row. */
const NAV_ITEMS = PAGES.filter((p) => p.href !== "/estimate");

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b-2 border-gold bg-navy">
      <div className="flex h-20 items-center gap-6 px-[clamp(16px,3vw,32px)]">
        <Link
          href="/"
          className="flex flex-none items-center gap-3 no-underline"
        >
          <Logo width={54} />
          <span className="flex flex-col gap-[3px] whitespace-nowrap text-left">
            <span className="text-[16px] font-extrabold leading-[1.1] tracking-[.02em] text-cream">
              MEDAL OF HAULERS
            </span>
            <span className="text-[9.5px] font-semibold leading-none tracking-[.15em] text-gold">
              {CONTACT.tagline}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-[22px] nav:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1.5 text-[13.5px] font-semibold uppercase tracking-[.04em] no-underline ${
                  active
                    ? "border-gold text-gold"
                    : "border-transparent text-footer-link hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-none items-center gap-3.5 nav:flex">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 text-[15px] font-extrabold text-cream no-underline hover:text-gold"
          >
            <Phone size={16} strokeWidth={2} className="stroke-gold" />
            {CONTACT.phone}
          </a>
          <Link
            href="/estimate"
            className="border-2 border-gold bg-gold px-5 py-[15px] text-[13px] font-extrabold uppercase tracking-[.06em] text-navy no-underline hover:border-gold-light hover:bg-gold-light"
          >
            Request Estimate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="ml-auto flex h-[50px] w-[50px] flex-none cursor-pointer flex-col justify-center gap-[5px] border-2 border-navy-border-muted bg-transparent px-3 nav:hidden"
        >
          <span className="block h-0.5 bg-gold" />
          <span className="block h-0.5 bg-gold" />
          <span className="block h-0.5 bg-gold" />
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="flex flex-col border-t-2 border-navy-rule bg-navy-menu nav:hidden"
        >
          {PAGES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`border-b-2 border-navy-rule px-5 py-[18px] text-left text-[15px] font-extrabold uppercase tracking-[.08em] no-underline ${
                pathname === item.href ? "text-gold" : "text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={CONTACT.phoneHref}
            className="border-t-2 border-navy-rule px-5 py-[18px] text-[15px] font-extrabold uppercase tracking-[.08em] text-gold no-underline"
          >
            Call {CONTACT.phone}
          </a>
        </div>
      ) : null}
    </header>
  );
}
