import { Suspense } from "react";
import { PAGE_HEADERS } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { EstimateForm } from "@/components/estimate/EstimateForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Free Moving Estimate in Northern Virginia & DC",
  description:
    "Get a free, no-obligation quote on moving, junk removal, or donation pickup in Northern Virginia, DC, and Maryland. Call 571-585-3536 or send your details.",
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
