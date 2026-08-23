import { Suspense } from "react";
import { PAGE_HEADERS } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateForm } from "@/components/estimate/EstimateForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Request Estimate",
  description:
    "Send your item list and photos for a free, no-obligation estimate on moving, junk removal, or donation pickup across the DMV and Virginia.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <main>
      <PageHeader {...PAGE_HEADERS.estimate} />
      {/* useSearchParams needs a Suspense boundary on a prerendered page. */}
      <Suspense fallback={<div className="pad min-h-[600px]" />}>
        <EstimateForm />
      </Suspense>
    </main>
  );
}
