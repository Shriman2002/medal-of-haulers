import { PHOTO_SLOTS, type PhotoSlotKey } from "@/content/site";
import { assetPath } from "@/lib/asset-path";

/**
 * Stands in for photography the handoff never shipped: a diagonal-hatch fill
 * with a monospace caption naming the intended shot.
 *
 * Add `src`/`alt` to the slot in src/content/site.ts and this renders the real
 * image instead — no changes needed here or at the call site.
 */
export function PhotoPlaceholder({
  slot,
  className = "",
  style,
}: {
  slot: PhotoSlotKey;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { caption, src, alt } = PHOTO_SLOTS[slot] as {
    caption: string;
    src?: string;
    alt?: string;
  };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- keeps the build host-agnostic
      <img
        src={assetPath(src)}
        alt={alt ?? ""}
        className={`block h-full w-full border-2 border-ink object-cover ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className={`hatch flex items-end border-2 border-ink ${className}`}
      style={style}
    >
      <span className="font-mono text-[10.5px] font-medium text-caption">
        {caption}
      </span>
    </div>
  );
}
