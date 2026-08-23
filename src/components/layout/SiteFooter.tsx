import Link from "next/link";
import { CONTACT, FOOTER, PAGES } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const SOCIALS = [
  { href: CONTACT.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: CONTACT.facebook, label: "Facebook", Icon: FacebookIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-gold bg-navy px-[clamp(20px,4vw,32px)] pb-[22px] pt-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-10">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <Logo width={60} decorative />
            <div className="flex flex-col gap-[3px]">
              <span className="text-[18px] font-extrabold leading-none tracking-[.02em] text-cream">
                {FOOTER.wordmark}
              </span>
              <span className="text-[10.5px] font-semibold leading-[1.3] tracking-[.13em] text-gold">
                {FOOTER.kicker}
              </span>
            </div>
          </div>
          <p className="max-w-[44ch] text-[14px] leading-[1.6] text-footer-text">
            {FOOTER.description[0]}
            <br />
            {FOOTER.description[1]}
          </p>
          <div className="flex flex-wrap gap-4 text-[15px] font-extrabold">
            <a
              href={CONTACT.phoneHref}
              className="text-gold no-underline hover:text-gold-light"
            >
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.emailHref}
              className="break-all text-gold no-underline hover:text-gold-light"
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-0.5 flex gap-2.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center border-2 border-navy-rule-alt hover:border-gold"
              >
                <Icon size={20} className="text-gold" />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col items-start gap-2.5">
          <h2 className="mb-1 text-[11px] font-extrabold uppercase tracking-[.16em] text-gold">
            Site
          </h2>
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="text-left text-[14px] font-medium text-footer-link no-underline hover:text-gold"
            >
              {page.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-2.5">
          <h2 className="mb-1 text-[11px] font-extrabold uppercase tracking-[.16em] text-gold">
            Follow
          </h2>
          {SOCIALS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              className="text-[14px] font-medium text-footer-link no-underline hover:text-gold"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-8 h-0.5 bg-navy-rule-alt" />
      <div className="flex flex-wrap justify-between gap-5 text-[12px] text-footer-dim">
        <span>{FOOTER.copyright}</span>
        <span>{FOOTER.legal}</span>
      </div>
    </footer>
  );
}
