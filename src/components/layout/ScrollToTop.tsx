"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The prototype jumps to the top on every page change, instantly. Next preserves
 * scroll on some navigations, so restore that behaviour explicitly.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
