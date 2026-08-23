import { CONTACT } from "@/content/site";
import { assetPath } from "@/lib/asset-path";

/**
 * The client's seal, pre-sized by scripts/prepare-logo.mjs.
 *
 * `mix-blend-mode: screen` drops the logo's dark ground out against navy, per
 * the handoff. If a transparent-background version is ever supplied, drop both
 * the blend mode and this note.
 */
export function Logo({
  width,
  className = "",
  decorative = false,
}: {
  width: 54 | 60 | 110 | 170 | 400;
  className?: string;
  decorative?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized by srcset; see scripts/prepare-logo.mjs
    <img
      src={assetPath(
        `/logo-${width === 60 ? 120 : width === 110 ? 220 : width}.png`,
      )}
      srcSet={
        width === 54
          ? `${assetPath("/logo-54.png")} 1x, ${assetPath("/logo-108.png")} 2x`
          : width === 60
            ? `${assetPath("/logo-120.png")} 1x, ${assetPath("/logo-240.png")} 2x`
            : width === 110
              ? `${assetPath("/logo-120.png")} 1x, ${assetPath("/logo-220.png")} 2x`
              : width === 170
                ? `${assetPath("/logo-170.png")} 1x, ${assetPath("/logo-340.png")} 2x`
                : `${assetPath("/logo-400.png")} 1x, ${assetPath("/logo-800.png")} 2x`
      }
      alt={decorative ? "" : `${CONTACT.business} seal`}
      aria-hidden={decorative || undefined}
      width={width}
      height={width}
      style={{ width, height: "auto", mixBlendMode: "screen" }}
      className={className}
    />
  );
}
