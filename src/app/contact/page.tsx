import {
  CONTACT,
  PAGE_HEADERS,
  SERVICE_AREA_SUMMARY,
} from "@/content/site";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Call ${CONTACT.phone} or email ${CONTACT.email}. Serving Washington D.C., Northern Virginia, Maryland, and Virginia south through Richmond.`,
  path: "/contact",
});

const SOCIALS = [
  { href: CONTACT.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: CONTACT.facebook, label: "Facebook", Icon: FacebookIcon },
];

/** Label column is a fixed 110px so the four rows align. */
function DetailRow({
  label,
  children,
  last = false,
  labelPad = "pt-[3px]",
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
  labelPad?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-3.5 py-4 ${
        last ? "" : "border-b-2 border-hatch-a"
      }`}
    >
      <span
        className={`w-[110px] flex-none text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-55 ${labelPad}`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <main>
      <PageHeader {...PAGE_HEADERS.contact} />
      <div className="pad mohsplit items-start">
        <div className="min-w-0">
          <h2 className="mb-4 text-[clamp(26px,3.2vw,32px)] font-extrabold tracking-[-.015em]">
            {CONTACT.business}
          </h2>
          <div className="border-t-2 border-ink">
            <DetailRow label="Contact">
              <span className="text-[17px] font-extrabold">
                {CONTACT.person}
              </span>
            </DetailRow>
            <DetailRow label="Phone" labelPad="pt-1.5">
              <a
                href={CONTACT.phoneHref}
                className="text-[26px] font-extrabold text-ink no-underline hover:text-gold-deep"
              >
                {CONTACT.phone}
              </a>
            </DetailRow>
            <DetailRow label="Email" labelPad="pt-1">
              <a
                href={CONTACT.emailHref}
                className="break-all text-[17px] font-bold no-underline"
              >
                {CONTACT.email}
              </a>
            </DetailRow>
            <DetailRow label="Service area" last>
              <span className="max-w-[44ch] text-[15.5px] leading-[1.6] text-ink-70">
                {SERVICE_AREA_SUMMARY}
              </span>
            </DetailRow>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={CONTACT.phoneHref} variant="gold" className="px-6 py-[18px]">
              Call Us
            </Button>
            <Button href={CONTACT.emailHref} variant="outlineLight" className="px-6 py-[18px]">
              Email Us
            </Button>
            <Button href="/estimate" variant="navy" className="px-6 py-[18px]">
              Request an Estimate
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[18px]">
          <PhotoPlaceholder slot="contactMap" className="min-h-[240px] p-3.5" />
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                className="flex min-w-[150px] flex-1 items-center gap-2.5 border-2 border-ink p-4 text-[13px] font-extrabold uppercase tracking-[.06em] text-ink no-underline hover:bg-hatch-a"
              >
                <Icon size={18} className="text-gold-deep" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
