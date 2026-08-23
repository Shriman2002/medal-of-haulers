import { ABOUT, CONTACT, PAGE_HEADERS } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Medal of Haulers is a veteran-owned moving, junk removal, and donation pickup company built on hard work, integrity, and respect for your belongings.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageHeader {...PAGE_HEADERS.about} />
      <div className="pad mohsplit items-start">
        <div className="flex min-w-0 flex-col gap-[18px]">
          <p className="text-lead font-extrabold leading-[1.55] tracking-[-.01em]">
            {ABOUT.lead}
          </p>
          <div className="h-0.5 bg-ink" />
          {ABOUT.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[70ch] text-[16.5px] leading-[1.7] text-ink-70"
            >
              {paragraph}
            </p>
          ))}
          <div className="border-2 border-navy bg-gold p-6">
            <p className="text-quote font-extrabold tracking-[-.01em] text-navy">
              {ABOUT.quote}
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            <PhotoPlaceholder slot="aboutTeam" className="h-[190px] p-3" />
            <PhotoPlaceholder slot="aboutCrew" className="h-[190px] p-3" />
          </div>
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col items-start gap-3.5 border-2 border-navy bg-navy p-7">
            <Logo width={170} />
            <div className="h-0.5 w-full bg-gold" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-gold">
              {ABOUT.cardLabel}
            </span>
            <p className="text-[14.5px] leading-[1.6] text-slate-text">
              {ABOUT.cardBody}
            </p>
          </div>
          <div className="flex flex-col gap-3 border-2 border-ink p-6">
            <span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-gold-deep">
              Contact
            </span>
            <span className="text-[16px] font-extrabold">{CONTACT.person}</span>
            <a
              href={CONTACT.phoneHref}
              className="text-[20px] font-extrabold text-ink no-underline hover:text-gold-deep"
            >
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.emailHref}
              className="break-all text-[14.5px] font-semibold no-underline"
            >
              {CONTACT.email}
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
