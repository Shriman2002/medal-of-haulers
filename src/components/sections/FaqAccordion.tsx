"use client";

import { useId, useState } from "react";
import { FAQS } from "@/content/site";

/**
 * Single-open accordion. Item 01 starts open; clicking the open item closes it,
 * matching the prototype. Uses real buttons with aria-expanded/aria-controls —
 * the prototype had no ARIA at all.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="min-w-0 border-t-2 border-ink">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={faq.q} className="border-b-2 border-ink">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full cursor-pointer items-center gap-4 bg-transparent px-1 py-5 text-left hover:bg-hatch-b"
              >
                <span className="w-6 flex-none text-[11px] font-extrabold tracking-[.14em] text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[17px] font-extrabold tracking-[-.01em]">
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-none text-[24px] font-extrabold leading-none text-gold-deep"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {/* Always in the DOM, hidden when closed: crawlers index all 13
                answers, and `hidden` still keeps them out of the a11y tree. */}
            <p
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="max-w-[74ch] pb-6 pl-11 pr-1 text-[16px] leading-[1.7] text-ink-70"
            >
              {faq.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
