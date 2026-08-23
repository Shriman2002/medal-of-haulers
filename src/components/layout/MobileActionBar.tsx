import Link from "next/link";
import { CONTACT } from "@/content/site";

/** Fixed bottom bar below 1140px. `body` reserves 64px for it in globals.css. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t-2 border-navy bg-gold nav:hidden">
      <a
        href={CONTACT.phoneHref}
        className="flex-1 border-r-2 border-navy px-2 py-5 text-center text-[14px] font-extrabold uppercase tracking-[.06em] text-navy no-underline"
      >
        Call Now
      </a>
      <Link
        href="/estimate"
        className="flex-1 bg-navy px-2 py-5 text-center text-[14px] font-extrabold uppercase tracking-[.06em] text-gold no-underline"
      >
        Get Estimate
      </Link>
    </div>
  );
}
