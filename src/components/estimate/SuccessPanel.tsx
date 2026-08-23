import { Check } from "lucide-react";
import { CONTACT, SUCCESS } from "@/content/site";
import { Button } from "@/components/ui/Button";

/** Replaces the entire form and sidebar once a request is accepted. */
export function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="pad flex flex-col items-start gap-[18px]">
      <div className="flex h-16 w-16 items-center justify-center border-2 border-navy bg-gold">
        <Check size={34} strokeWidth={3} className="stroke-navy" />
      </div>
      <h2 className="text-block-h2 font-extrabold tracking-[-.015em]">
        {SUCCESS.heading}
      </h2>
      <p className="max-w-[70ch] text-[17px] leading-[1.65] text-ink-70">
        {SUCCESS.body}
      </p>
      <div className="mt-1 flex flex-wrap gap-3.5">
        <Button href={CONTACT.phoneHref} variant="navy" size="lg">
          Call {CONTACT.phone}
        </Button>
        <Button variant="outlineLight" size="lg" onClick={onReset}>
          Send another request
        </Button>
      </div>
    </div>
  );
}
