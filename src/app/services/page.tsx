import { PAGE_HEADERS, SERVICE_BLOCKS } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Moving, junk removal, and donation pickup for homes, apartments, offices, and businesses across the DMV, Northern Virginia, and Richmond.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <PageHeader {...PAGE_HEADERS.services} />
      {SERVICE_BLOCKS.map((block) => (
        <div key={block.slug} className="mohsplit gap-0 border-b-2 border-ink">
          {/* Full-bleed photo: no border of its own, the row rule carries it. */}
          <PhotoPlaceholder
            slot={block.photo}
            className="min-h-[300px] border-0 p-4"
          />
          <div className="pad flex flex-col items-start gap-3.5">
            <span className="text-[11px] font-extrabold tracking-[.18em] text-gold-deep">
              {block.kicker}
            </span>
            <h2 className="text-block-h2 font-extrabold tracking-[-.015em]">
              {block.title}
            </h2>
            <p className="max-w-[56ch] text-[16px] leading-[1.65] text-ink-70">
              {block.p1}
            </p>
            <p className="max-w-[56ch] text-[16px] leading-[1.65] text-ink-70">
              {block.p2}
            </p>
            {/* Carries the service through to the form, preselected. */}
            <Button
              href={`/estimate?service=${block.slug}`}
              variant="gold"
              className="mt-1.5"
            >
              {block.cta}
            </Button>
          </div>
        </div>
      ))}
    </main>
  );
}
